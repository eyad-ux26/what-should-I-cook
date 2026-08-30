/**
 * A minimal fixed-window rate limiter backed by a Durable Object.
 *
 * Cloudflare's experimental `ratelimit` binding (the "unsafe" one) is
 * best-effort only — testing showed it does not reliably block bursts of
 * concurrent requests, which is exactly the abuse pattern this needs to
 * stop. A Durable Object gives each key (client IP) a single-threaded,
 * durable counter, so concurrent requests from the same IP are serialized
 * and counted correctly.
 */
export class RateLimiterDO implements DurableObject {
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    const { limit, windowMs } = (await request.json()) as { limit: number; windowMs: number };
    const now = Date.now();

    const stored = await this.state.storage.get<{ count: number; windowStart: number }>("bucket");
    let bucket = stored;
    if (!bucket || now - bucket.windowStart >= windowMs) {
      bucket = { count: 0, windowStart: now };
    }
    bucket.count += 1;
    await this.state.storage.put("bucket", bucket);

    const allowed = bucket.count <= limit;
    return Response.json({ allowed, count: bucket.count });
  }
}

export async function checkRateLimit(
  namespace: DurableObjectNamespace,
  key: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  const id = namespace.idFromName(key);
  const stub = namespace.get(id);
  const response = await stub.fetch("https://rate-limiter/check", {
    method: "POST",
    body: JSON.stringify({ limit, windowMs }),
  });
  const { allowed } = (await response.json()) as { allowed: boolean };
  return allowed;
}
