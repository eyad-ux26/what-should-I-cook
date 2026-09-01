import { checkWindow } from "./rateLimiter";
import { checkLoginToken, clearSessionCookie, createSessionCookie, isAuthorizedAdmin } from "./adminAuth";
import { getSummary, setAiEnabledFlag } from "./metrics";
import { logWarning, shortHash } from "./security";
import { renderDashboard, renderLoginPage } from "./monitorDashboard";
import type { Env } from "./env";

const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

function html(body: string, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function redirect(location: string, extraHeaders: Record<string, string> = {}): Response {
  return new Response(null, { status: 303, headers: { Location: location, "Cache-Control": "no-store", ...extraHeaders } });
}

/**
 * Handles every /monitor* path. Kept entirely separate from the public
 * recipe-generation logic in index.ts: no CORS headers (this is browsed
 * directly, never called cross-origin by the frontend), and its own
 * lightweight brute-force limit on the login endpoint (reusing the existing
 * per-IP RateLimiterDO rather than building a second rate-limiting system).
 *
 * Every branch below checks authorization BEFORE touching any monitoring
 * data — the login page and "invalid token" responses never include
 * dashboard content, and /monitor/api/* returns a plain 403 with no body
 * data for unauthorized callers.
 */
export async function handleMonitor(request: Request, env: Env, pathname: string): Promise<Response> {
  if (pathname === "/monitor/login" && request.method === "POST") {
    const clientIp = request.headers.get("cf-connecting-ip") ?? "unknown";
    const withinLimit = await checkWindow(env.RATE_LIMITER_DO, `admin_login:${clientIp}`, "attempts", LOGIN_ATTEMPT_LIMIT, LOGIN_ATTEMPT_WINDOW_MS);
    if (!withinLimit) {
      logWarning("admin_login_rate_limited", { ip: shortHash(clientIp) });
      return html(renderLoginPage("rate-limited"), 429);
    }

    if (!env.ADMIN_TOKEN) {
      // No token configured yet — fail closed rather than accepting anything.
      return html(renderLoginPage("invalid"), 403);
    }

    let token = "";
    try {
      const form = await request.formData();
      const value = form.get("token");
      token = typeof value === "string" ? value : "";
    } catch {
      return html(renderLoginPage("invalid"), 400);
    }

    const valid = token.length > 0 && (await checkLoginToken(token, env.ADMIN_TOKEN));
    if (!valid) {
      logWarning("admin_login_failed", { ip: shortHash(clientIp) });
      return html(renderLoginPage("invalid"), 401);
    }

    const cookie = await createSessionCookie(env.ADMIN_TOKEN);
    return redirect("/monitor", { "Set-Cookie": cookie });
  }

  if (pathname === "/monitor/logout" && request.method === "POST") {
    return redirect("/monitor", { "Set-Cookie": clearSessionCookie() });
  }

  // Everything below requires a valid session — checked before any
  // monitoring data is read or returned, per the "never send dashboard data
  // to an unauthorized visitor" requirement.
  const authorized = await isAuthorizedAdmin(request, env.ADMIN_TOKEN, env.ADMIN_EMAILS);

  if (pathname === "/monitor/api/toggle-ai" && request.method === "POST") {
    if (!authorized) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    }
    let enabled = true;
    try {
      const form = await request.formData();
      enabled = form.get("enabled") === "true";
    } catch {
      return redirect("/monitor");
    }
    await setAiEnabledFlag(env.METRICS_DO, enabled);
    logWarning(enabled ? "ai_reenabled_via_dashboard" : "ai_disabled_via_dashboard", {});
    return redirect("/monitor");
  }

  if (pathname === "/monitor" && request.method === "GET") {
    if (!authorized) {
      return html(renderLoginPage("none"), 200);
    }
    const summary = await getSummary(env.METRICS_DO);
    return html(renderDashboard(summary));
  }

  return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
}
