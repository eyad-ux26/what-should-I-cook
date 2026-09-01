import type { MetricsSummary } from "./metrics";

/**
 * Hand-rolled HTML (no client framework, no external requests, no charting
 * library) — this is a small internal tool, not a public-facing surface, so
 * it doesn't need to match the main app's build pipeline. Every value
 * rendered below comes from our own server-computed numbers/labels, never
 * from user input, so there's no HTML-escaping concern here.
 */

const PAGE_STYLES = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, "Segoe UI", Roboto, ui-sans-serif, system-ui, sans-serif;
    background: #faf7f3;
    color: #211710;
  }
  .wrap { max-width: 960px; margin: 0 auto; padding: 32px 20px 64px; }
  header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
  h1 { font-size: 22px; font-weight: 800; margin: 0; }
  .muted { color: #706357; }
  a { color: #e8552a; }
  .status-pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 16px; border-radius: 999px; font-weight: 700; font-size: 14px;
  }
  .status-on { background: #e4f3ea; color: #2f8a5b; }
  .status-off { background: #ffe6da; color: #e8552a; }
  .dot { width: 8px; height: 8px; border-radius: 999px; background: currentColor; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .card {
    background: #fff; border: 1px solid #ece3d8; border-radius: 16px;
    padding: 16px; box-shadow: 0 1px 2px rgba(26,18,12,0.04);
  }
  .card .label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: #706357; margin-bottom: 6px; }
  .card .value { font-size: 26px; font-weight: 800; }
  .card .sub { font-size: 12px; color: #706357; margin-top: 2px; }
  section { margin-bottom: 28px; }
  section h2 { font-size: 15px; font-weight: 700; margin: 0 0 12px; }
  .chart { display: flex; align-items: flex-end; gap: 4px; height: 120px; background: #fff; border: 1px solid #ece3d8; border-radius: 16px; padding: 16px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; gap: 4px; }
  .bar { width: 100%; max-width: 28px; background: linear-gradient(180deg, #ff8a4c, #ff4d6d); border-radius: 4px 4px 0 0; min-height: 2px; }
  .bar-label { font-size: 9px; color: #706357; white-space: nowrap; }
  form.kill-switch { display: flex; align-items: center; gap: 12px; }
  button {
    font: inherit; font-weight: 700; border: none; border-radius: 999px;
    padding: 12px 20px; cursor: pointer; font-size: 14px;
  }
  .btn-danger { background: linear-gradient(120deg, #ff8a4c, #ff4d6d); color: #fff; }
  .btn-safe { background: #2f8a5b; color: #fff; }
  .login-box { max-width: 360px; margin: 80px auto; background: #fff; border: 1px solid #ece3d8; border-radius: 20px; padding: 28px; }
  input[type="password"] {
    width: 100%; padding: 12px 14px; border-radius: 12px; border: 1px solid #ece3d8;
    font-size: 15px; margin: 12px 0; box-sizing: border-box;
  }
  .error { color: #e8552a; font-size: 13px; margin-top: 8px; }
  footer.note { margin-top: 32px; font-size: 12px; color: #706357; }
`;

function page(title: string, body: string): string {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>${title}</title>
<style>${PAGE_STYLES}</style>
</head><body>${body}</body></html>`;
}

export type LoginError = "none" | "invalid" | "rate-limited";

const LOGIN_ERROR_MESSAGES: Record<Exclude<LoginError, "none">, string> = {
  invalid: "Invalid token. Please try again.",
  "rate-limited": "Too many attempts. Please wait about 15 minutes and try again.",
};

export function renderLoginPage(error: LoginError): string {
  return page(
    "Sign in — Monitoring",
    `<div class="login-box">
      <h1>Monitoring dashboard</h1>
      <p class="muted">Enter the admin token to continue.</p>
      <form method="POST" action="/monitor/login">
        <input type="password" name="token" placeholder="Admin token" autofocus required />
        <button type="submit" class="btn-danger" style="width:100%">Sign in</button>
      </form>
      ${error !== "none" ? `<p class="error">${LOGIN_ERROR_MESSAGES[error]}</p>` : ""}
    </div>`,
  );
}

function bars(series: { label: string; value: number }[]): string {
  const max = Math.max(1, ...series.map((s) => s.value));
  return `<div class="chart">${series
    .map(
      (s) => `<div class="bar-col">
        <div class="bar" style="height:${Math.max(2, Math.round((s.value / max) * 88))}px" title="${s.label}: ${s.value}"></div>
        <div class="bar-label">${s.label}</div>
      </div>`,
    )
    .join("")}</div>`;
}

export function renderDashboard(summary: MetricsSummary): string {
  const statusOn = summary.aiEnabled;
  const costPerMillion = 0; // see estimatedTokens note below — no reliable default rate is assumed

  return page(
    "Monitoring — What Should I Cook",
    `<div class="wrap">
      <header>
        <div>
          <h1>What Should I Cook — Monitoring</h1>
          <p class="muted" style="margin:4px 0 0">Internal dashboard. Not linked from the public site.</p>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <span class="status-pill ${statusOn ? "status-on" : "status-off"}">
            <span class="dot"></span> AI GENERATION: ${statusOn ? "ENABLED" : "DISABLED"}
          </span>
          <form method="POST" action="/monitor/logout"><button type="submit" style="background:#f3ede3;color:#211710;">Sign out</button></form>
        </div>
      </header>

      <section>
        <h2>Emergency control</h2>
        <div class="card">
          <form class="kill-switch" method="POST" action="/monitor/api/toggle-ai">
            <input type="hidden" name="enabled" value="${statusOn ? "false" : "true"}" />
            <button type="submit" class="${statusOn ? "btn-danger" : "btn-safe"}">
              ${statusOn ? "Disable AI Generation" : "Re-enable AI Generation"}
            </button>
            <span class="muted" style="font-size:13px">
              ${statusOn
                ? "Immediately stops the public site from calling the AI provider. Visitors see a friendly “temporarily unavailable” message."
                : "AI generation is currently OFF. This turns it back on for all visitors."}
            </span>
          </form>
        </div>
      </section>

      <section>
        <h2>Recipe generations</h2>
        <div class="grid">
          <div class="card"><div class="label">Today</div><div class="value">${summary.today.generations}</div><div class="sub">+${summary.today.detailGenerations} detail views</div></div>
          <div class="card"><div class="label">Last 24 hours</div><div class="value">${summary.last24h.generations}</div></div>
          <div class="card"><div class="label">Last 7 days</div><div class="value">${summary.last7d.generations}</div></div>
          <div class="card"><div class="label">Avg response time</div><div class="value">${summary.last24h.avgResponseMs}<span style="font-size:14px">ms</span></div><div class="sub">last 24h</div></div>
        </div>
      </section>

      <section>
        <h2>Errors &amp; blocking (last 24h)</h2>
        <div class="grid">
          <div class="card"><div class="label">Blocked — rate limit</div><div class="value">${summary.last24h.blockedRateLimit}</div></div>
          <div class="card"><div class="label">Blocked — repeated failures</div><div class="value">${summary.last24h.blockedFailure}</div><div class="sub">possible automated abuse</div></div>
          <div class="card"><div class="label">Error count</div><div class="value">${summary.last24h.errors}</div><div class="sub">invalid requests</div></div>
          <div class="card"><div class="label">AI/API failures</div><div class="value">${summary.last24h.aiFailures}</div><div class="sub">upstream model errors</div></div>
        </div>
      </section>

      <section>
        <h2>Request volume — last 24 hours</h2>
        ${bars(summary.hourlySeries)}
      </section>

      <section>
        <h2>Request volume — last 7 days</h2>
        ${bars(summary.dailySeries)}
      </section>

      <section>
        <h2>Estimated AI usage</h2>
        <div class="card">
          <div class="label">Total tokens (last ${summary.estimatedTokens.retentionDays} days)</div>
          <div class="value">${summary.estimatedTokens.total.toLocaleString()}</div>
          <div class="sub">
            ${costPerMillion > 0
              ? `~$${((summary.estimatedTokens.total / 1_000_000) * costPerMillion).toFixed(2)} at your configured rate`
              : "No per-token price configured — check your Mistral usage dashboard for actual billed cost. This number is a usage indicator, not a bill."}
          </div>
        </div>
      </section>

      <footer class="note">
        Aggregated, IP-free counters only — no recipe text, no per-visitor data. Retained ~${summary.estimatedTokens.retentionDays} days, then discarded automatically.
      </footer>
    </div>`,
  );
}
