/**
 * Aggregated, privacy-minimal operational metrics for the /monitor dashboard.
 *
 * Deliberately separate from RateLimiterDO (per-IP abuse control, unchanged).
 * This is a SINGLE global Durable Object instance — there is exactly one of
 * these for the whole Worker — that stores only aggregate counters bucketed
 * by hour. It never stores IP addresses, recipe text, or anything tied to an
 * individual visitor: just counts, timings, and token totals. Old hours are
 * pruned automatically so retention stays bounded (~8 days).
 *
 * It also holds the dashboard-controlled "soft" AI kill switch, since a
 * Durable Object can be written to at request time — a Worker secret
 * (AI_ENABLED, see index.ts) cannot be changed except via `wrangler secret
 * put`, so it can't back a "Disable AI Generation" button. Both switches are
 * checked (see isAiDisabled in index.ts); either one being off disables
 * generation.
 */

export type MetricKind =
  | "generations"
  | "detailGenerations"
  | "errors"
  | "aiFailures"
  | "blockedRateLimit"
  | "blockedFailure"
  | "blockedKillSwitch";

interface HourBucket {
  requestVolume: number;
  generations: number;
  detailGenerations: number;
  errors: number;
  aiFailures: number;
  blockedRateLimit: number;
  blockedFailure: number;
  blockedKillSwitch: number;
  totalResponseMs: number;
  responseCount: number;
  totalTokens: number;
}

function emptyBucket(): HourBucket {
  return {
    requestVolume: 0,
    generations: 0,
    detailGenerations: 0,
    errors: 0,
    aiFailures: 0,
    blockedRateLimit: 0,
    blockedFailure: 0,
    blockedKillSwitch: 0,
    totalResponseMs: 0,
    responseCount: 0,
    totalTokens: 0,
  };
}

const RETENTION_HOURS = 24 * 8; // ~8 days — enough for a 7-day view with margin

function hourKey(date: Date): string {
  return date.toISOString().slice(0, 13); // "2026-08-31T14"
}

function hoursAgoKey(hoursAgo: number, now: Date): string {
  return hourKey(new Date(now.getTime() - hoursAgo * 3_600_000));
}

type MetricsRequest =
  | { action: "record"; kind: MetricKind; ms?: number; tokens?: number }
  | { action: "get-summary" }
  | { action: "get-ai-enabled" }
  | { action: "set-ai-enabled"; enabled: boolean };

export class MetricsDO implements DurableObject {
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    const body = (await request.json()) as MetricsRequest;

    if (body.action === "record") {
      await this.record(body.kind, body.ms, body.tokens);
      return Response.json({ ok: true });
    }

    if (body.action === "get-summary") {
      return Response.json(await this.summarize());
    }

    if (body.action === "get-ai-enabled") {
      const enabled = (await this.state.storage.get<boolean>("config:aiEnabled")) ?? true;
      return Response.json({ enabled });
    }

    if (body.action === "set-ai-enabled") {
      await this.state.storage.put("config:aiEnabled", body.enabled);
      return Response.json({ ok: true });
    }

    return Response.json({ error: "unknown action" }, { status: 400 });
  }

  private async record(kind: MetricKind, ms?: number, tokens?: number): Promise<void> {
    const now = new Date();
    const key = `hour:${hourKey(now)}`;
    const bucket = (await this.state.storage.get<HourBucket>(key)) ?? emptyBucket();

    bucket.requestVolume += 1;
    bucket[kind] += 1;
    if (typeof ms === "number") {
      bucket.totalResponseMs += ms;
      bucket.responseCount += 1;
    }
    if (typeof tokens === "number") {
      bucket.totalTokens += tokens;
    }

    await this.state.storage.put(key, bucket);
    await this.prune(now);
  }

  private async prune(now: Date): Promise<void> {
    const cutoff = `hour:${hoursAgoKey(RETENTION_HOURS, now)}`;
    const old = await this.state.storage.list<HourBucket>({ prefix: "hour:", end: cutoff });
    if (old.size > 0) {
      await this.state.storage.delete([...old.keys()]);
    }
  }

  private async summarize() {
    const now = new Date();
    const entries = await this.state.storage.list<HourBucket>({ prefix: "hour:", reverse: true, limit: RETENTION_HOURS });
    const byHour = new Map<string, HourBucket>();
    for (const [key, value] of entries) {
      byHour.set(key.slice("hour:".length), value);
    }

    const todayPrefix = now.toISOString().slice(0, 10); // "2026-08-31"
    const sum = (keys: string[]) => {
      const totals = emptyBucket();
      for (const k of keys) {
        const b = byHour.get(k);
        if (!b) continue;
        (Object.keys(totals) as (keyof HourBucket)[]).forEach((field) => {
          totals[field] += b[field];
        });
      }
      return totals;
    };

    const last24Keys = Array.from({ length: 24 }, (_, i) => hoursAgoKey(i, now));
    const last7dKeys = Array.from({ length: 24 * 7 }, (_, i) => hoursAgoKey(i, now));
    const todayKeys = Array.from(byHour.keys()).filter((k) => k.startsWith(todayPrefix));
    const retainedKeys = Array.from(byHour.keys());

    const today = sum(todayKeys);
    const last24h = sum(last24Keys);
    const last7d = sum(last7dKeys);
    const allRetained = sum(retainedKeys);

    // Hourly series for the last 24 hours (oldest first) — request volume chart.
    const hourlySeries = Array.from({ length: 24 }, (_, i) => {
      const k = hoursAgoKey(23 - i, now);
      return { label: k.slice(11) + ":00", value: byHour.get(k)?.requestVolume ?? 0 };
    });

    // Daily series for the last 7 days (oldest first) — request volume chart.
    const dailySeries = Array.from({ length: 7 }, (_, i) => {
      const dayStart = new Date(now.getTime() - i * 86_400_000);
      const dayPrefix = dayStart.toISOString().slice(0, 10);
      const total = Array.from(byHour.entries())
        .filter(([k]) => k.startsWith(dayPrefix))
        .reduce((acc, [, b]) => acc + b.requestVolume, 0);
      return { label: dayPrefix.slice(5), value: total };
    }).reverse();

    const avgResponseMs = last24h.responseCount > 0 ? Math.round(last24h.totalResponseMs / last24h.responseCount) : 0;
    const aiEnabled = (await this.state.storage.get<boolean>("config:aiEnabled")) ?? true;

    return {
      aiEnabled,
      today: { generations: today.generations, detailGenerations: today.detailGenerations },
      last24h: {
        generations: last24h.generations,
        detailGenerations: last24h.detailGenerations,
        blockedRateLimit: last24h.blockedRateLimit,
        blockedFailure: last24h.blockedFailure,
        blockedKillSwitch: last24h.blockedKillSwitch,
        errors: last24h.errors,
        aiFailures: last24h.aiFailures,
        avgResponseMs,
        requestVolume: last24h.requestVolume,
      },
      last7d: {
        generations: last7d.generations,
        detailGenerations: last7d.detailGenerations,
        blockedRateLimit: last7d.blockedRateLimit,
        blockedFailure: last7d.blockedFailure,
        errors: last7d.errors,
        aiFailures: last7d.aiFailures,
        requestVolume: last7d.requestVolume,
      },
      estimatedTokens: { total: allRetained.totalTokens, retentionDays: Math.round(RETENTION_HOURS / 24) },
      hourlySeries,
      dailySeries,
    };
  }
}

export type MetricsSummary = Awaited<ReturnType<InstanceType<typeof MetricsDO>["summarize"]>>;

function stub(namespace: DurableObjectNamespace) {
  // Single global instance — there's only ever one "site" to monitor.
  return namespace.get(namespace.idFromName("global"));
}

export async function recordMetric(
  namespace: DurableObjectNamespace,
  kind: MetricKind,
  extra?: { ms?: number; tokens?: number },
): Promise<void> {
  try {
    await stub(namespace).fetch("https://metrics/record", {
      method: "POST",
      body: JSON.stringify({ action: "record", kind, ...extra }),
    });
  } catch {
    // Metrics are best-effort — never let a logging failure affect the user.
  }
}

export async function getSummary(namespace: DurableObjectNamespace): Promise<MetricsSummary> {
  const response = await stub(namespace).fetch("https://metrics/summary", {
    method: "POST",
    body: JSON.stringify({ action: "get-summary" }),
  });
  return (await response.json()) as MetricsSummary;
}

export async function getAiEnabledFlag(namespace: DurableObjectNamespace): Promise<boolean> {
  try {
    const response = await stub(namespace).fetch("https://metrics/ai-enabled", {
      method: "POST",
      body: JSON.stringify({ action: "get-ai-enabled" }),
    });
    const { enabled } = (await response.json()) as { enabled: boolean };
    return enabled;
  } catch {
    return true; // fail open on the flag store's own error, not on the user
  }
}

export async function setAiEnabledFlag(namespace: DurableObjectNamespace, enabled: boolean): Promise<void> {
  await stub(namespace).fetch("https://metrics/ai-enabled", {
    method: "POST",
    body: JSON.stringify({ action: "set-ai-enabled", enabled }),
  });
}
