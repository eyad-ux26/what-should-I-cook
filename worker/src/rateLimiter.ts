/**
 * A minimal per-IP abuse-control primitive backed by a Durable Object.
 *
 * Cloudflare's experimental `ratelimit` binding (the "unsafe" one) is
 * best-effort only — live testing showed it does not reliably block bursts
 * of concurrent requests, which is exactly the abuse pattern this needs to
 * stop. A Durable Object gives each key (client IP) a single-threaded,
 * durable counter, so concurrent requests from the same IP are serialized
 * and counted correctly.
 *
 * One DO instance per IP tracks several independent things by name:
 *  - named fixed windows (burst / sustained / daily / failures), and
 *  - a concurrency counter (how many requests from this IP are in flight).
 */

interface WindowState {
  count: number;
  windowStart: number;
}

interface ConcurrencyState {
  count: number;
  lastAcquiredAt: number;
}

type RateLimiterRequest =
  | { action: "window"; bucket: string; limit: number; windowMs: number }
  | { action: "peek"; bucket: string; windowMs: number }
  | { action: "concurrency-acquire"; maxConcurrent: number }
  | { action: "concurrency-release" };

// If a concurrency slot hasn't been touched in this long, assume the request
// that held it died without releasing (e.g. hard CPU-time kill) and reset —
// bounds the damage from a leak without needing perfect bookkeeping.
const CONCURRENCY_STALE_MS = 45_000;

export class RateLimiterDO implements DurableObject {
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    const body = (await request.json()) as RateLimiterRequest;
    const now = Date.now();

    if (body.action === "window") {
      const key = `window:${body.bucket}`;
      const stored = await this.state.storage.get<WindowState>(key);
      let bucket = stored;
      if (!bucket || now - bucket.windowStart >= body.windowMs) {
        bucket = { count: 0, windowStart: now };
      }
      bucket.count += 1;
      await this.state.storage.put(key, bucket);
      return Response.json({ allowed: bucket.count <= body.limit, count: bucket.count });
    }

    if (body.action === "peek") {
      const key = `window:${body.bucket}`;
      const stored = await this.state.storage.get<WindowState>(key);
      if (!stored || now - stored.windowStart >= body.windowMs) {
        return Response.json({ count: 0 });
      }
      return Response.json({ count: stored.count });
    }

    if (body.action === "concurrency-acquire") {
      const stored = await this.state.storage.get<ConcurrencyState>("concurrency");
      let state = stored ?? { count: 0, lastAcquiredAt: now };
      if (now - state.lastAcquiredAt > CONCURRENCY_STALE_MS) {
        state = { count: 0, lastAcquiredAt: now };
      }
      if (state.count >= body.maxConcurrent) {
        return Response.json({ allowed: false });
      }
      state = { count: state.count + 1, lastAcquiredAt: now };
      await this.state.storage.put("concurrency", state);
      return Response.json({ allowed: true });
    }

    if (body.action === "concurrency-release") {
      const stored = await this.state.storage.get<ConcurrencyState>("concurrency");
      const count = Math.max(0, (stored?.count ?? 1) - 1);
      await this.state.storage.put("concurrency", { count, lastAcquiredAt: now });
      return Response.json({ ok: true });
    }

    return Response.json({ error: "unknown action" }, { status: 400 });
  }
}

function stub(namespace: DurableObjectNamespace, key: string) {
  return namespace.get(namespace.idFromName(key));
}

/** Increments the named window's counter and reports whether it's still under `limit`. */
export async function checkWindow(
  namespace: DurableObjectNamespace,
  key: string,
  bucket: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  const response = await stub(namespace, key).fetch("https://rate-limiter/window", {
    method: "POST",
    body: JSON.stringify({ action: "window", bucket, limit, windowMs }),
  });
  const { allowed } = (await response.json()) as { allowed: boolean };
  return allowed;
}

/** Reads the named window's current count without incrementing it. */
export async function peekWindow(
  namespace: DurableObjectNamespace,
  key: string,
  bucket: string,
  windowMs: number,
): Promise<number> {
  const response = await stub(namespace, key).fetch("https://rate-limiter/peek", {
    method: "POST",
    body: JSON.stringify({ action: "peek", bucket, windowMs }),
  });
  const { count } = (await response.json()) as { count: number };
  return count;
}

/** Tries to reserve one of `maxConcurrent` concurrent-request slots for this key. */
export async function acquireConcurrency(
  namespace: DurableObjectNamespace,
  key: string,
  maxConcurrent: number,
): Promise<boolean> {
  const response = await stub(namespace, key).fetch("https://rate-limiter/concurrency-acquire", {
    method: "POST",
    body: JSON.stringify({ action: "concurrency-acquire", maxConcurrent }),
  });
  const { allowed } = (await response.json()) as { allowed: boolean };
  return allowed;
}

/** Releases a slot previously reserved with {@link acquireConcurrency}. Never throws. */
export async function releaseConcurrency(namespace: DurableObjectNamespace, key: string): Promise<void> {
  try {
    await stub(namespace, key).fetch("https://rate-limiter/concurrency-release", {
      method: "POST",
      body: JSON.stringify({ action: "concurrency-release" }),
    });
  } catch {
    // Best-effort: a failed release just means the stale-slot timeout will
    // clean it up later instead of it being freed immediately.
  }
}
