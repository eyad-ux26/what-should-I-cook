/** Reads an integer from a Worker env var (plain [vars] in wrangler.toml), falling back if missing/invalid. */
export function envInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function envBool(value: string | undefined, fallback: boolean): boolean {
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
}

/**
 * Cheap non-cryptographic hash (FNV-1a) used only to correlate repeated log
 * lines from the same source without printing raw IPs in our own logs.
 * Not a security boundary — Cloudflare's own request metadata already has
 * the real IP regardless — just log hygiene per the "no unnecessary
 * personal information" requirement.
 */
export function shortHash(value: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

/** Structured, single-line, content-free logging: never includes ingredients, recipe text, or raw IPs. */
export function logEvent(event: string, fields: Record<string, string | number | boolean> = {}): void {
  console.log(JSON.stringify({ event, ...fields, ts: new Date().toISOString() }));
}

export function logWarning(event: string, fields: Record<string, string | number | boolean> = {}): void {
  console.warn(JSON.stringify({ event, ...fields, ts: new Date().toISOString() }));
}

/**
 * Verifies a Cloudflare Turnstile token server-side. Scaffolding only: wired
 * up but inert unless TURNSTILE_ENABLED="true" and a secret key is set, so it
 * adds no friction for normal users until deliberately turned on (e.g. once
 * abuse is observed) — at which point the frontend also needs to render the
 * Turnstile widget and send its token as `turnstileToken` in the request body.
 */
export async function verifyTurnstile(token: string, secretKey: string | undefined, remoteIp: string): Promise<boolean> {
  if (!secretKey || !token) return false;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token, remoteip: remoteIp }),
    });
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
