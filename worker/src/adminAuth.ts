/**
 * Authorization for /monitor. Two independent paths, either is sufficient:
 *
 * 1. A signed session cookie, issued after the caller supplies ADMIN_TOKEN
 *    (a secret only the site owner knows) to /monitor/login. This is the
 *    real, working protection today. The cookie is a stateless
 *    HMAC-signed "<expiry>.<signature>" pair — no session storage needed,
 *    and it can't be forged without ADMIN_TOKEN.
 *
 * 2. The `Cf-Access-Authenticated-User-Email` header, checked against
 *    ADMIN_EMAILS. Cloudflare Access sets this header itself, only after
 *    it has already verified the caller's identity — but ONLY once Access
 *    is actually configured to gate this route at Cloudflare's edge. Until
 *    then this header is meaningless (a client could send it themselves),
 *    so path 1 is what actually protects the dashboard right now. See the
 *    CF_ACCESS setup notes in wrangler.toml / the project README for how
 *    to turn this into a real second layer once the domain is connected.
 */

const SESSION_COOKIE = "monitor_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get("Cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

export async function createSessionCookie(adminToken: string): Promise<string> {
  const expiry = Date.now() + SESSION_TTL_MS;
  const signature = await hmac(adminToken, String(expiry));
  const value = `${expiry}.${signature}`;
  return `${SESSION_COOKIE}=${value}; Path=/monitor; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_MS / 1000}`;
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/monitor; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

async function hasValidSessionCookie(request: Request, adminToken: string): Promise<boolean> {
  const cookie = getCookie(request, SESSION_COOKIE);
  if (!cookie) return false;
  const dotIndex = cookie.indexOf(".");
  if (dotIndex === -1) return false;
  const expiryStr = cookie.slice(0, dotIndex);
  const signature = cookie.slice(dotIndex + 1);
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const expected = await hmac(adminToken, expiryStr);
  return timingSafeEqual(expected, signature);
}

function hasValidAccessHeader(request: Request, adminEmails: string | undefined): boolean {
  if (!adminEmails) return false;
  const email = request.headers.get("Cf-Access-Authenticated-User-Email");
  if (!email) return false;
  const allowed = adminEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}

export async function isAuthorizedAdmin(
  request: Request,
  adminToken: string | undefined,
  adminEmails: string | undefined,
): Promise<boolean> {
  if (adminToken && (await hasValidSessionCookie(request, adminToken))) return true;
  if (hasValidAccessHeader(request, adminEmails)) return true;
  return false;
}

export async function checkLoginToken(provided: string, adminToken: string): Promise<boolean> {
  // Compare hashes rather than raw strings so both inputs are fixed-length
  // before the constant-time comparison, regardless of the attempted value's length.
  const providedHash = await hmac("login-check", provided);
  const expectedHash = await hmac("login-check", adminToken);
  return timingSafeEqual(providedHash, expectedHash);
}
