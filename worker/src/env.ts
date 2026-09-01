export interface Env {
  MISTRAL_API_KEY: string;
  /** Kill switch (static/deploy-time): set to the literal string "false" (via `wrangler secret put AI_ENABLED`) to disable AI generation without a redeploy. Combined with the dashboard's dynamic switch — either one being off disables generation. */
  AI_ENABLED?: string;
  RATE_LIMITER_DO: DurableObjectNamespace;
  METRICS_DO: DurableObjectNamespace;

  // --- /monitor authorization ---
  // The real, working protection today: a long random secret only the site
  // owner knows. Set with `wrangler secret put ADMIN_TOKEN`. Until this is
  // set, /monitor is permanently inaccessible (fails closed).
  ADMIN_TOKEN?: string;
  // Optional second layer, meaningful only once Cloudflare Access is
  // configured to gate /monitor at the edge (see wrangler.toml). Comma-
  // separated list of the email(s) Access is allowed to authenticate.
  ADMIN_EMAILS?: string;

  // Scaffolding for Cloudflare Turnstile — inert unless explicitly enabled.
  // Turn it on later by setting TURNSTILE_ENABLED = "true" in wrangler.toml
  // [vars] and redeploying, plus a TURNSTILE_SECRET_KEY secret (`wrangler
  // secret put TURNSTILE_SECRET_KEY`) — once the frontend also renders the
  // widget and sends its token as `turnstileToken` in the request body.
  TURNSTILE_ENABLED?: string;
  TURNSTILE_SECRET_KEY?: string;

  // All operational limits below are plain (non-secret) Worker vars — see
  // wrangler.toml [vars]. Every one has a sensible built-in fallback, so an
  // unset/malformed value never disables a protection.
  RATE_LIMIT_MAX?: string;
  RATE_LIMIT_WINDOW_SECONDS?: string;
  BURST_LIMIT?: string;
  BURST_WINDOW_SECONDS?: string;
  DAILY_LIMIT?: string;
  DAILY_WINDOW_SECONDS?: string;
  MAX_CONCURRENT_PER_IP?: string;
  FAILURE_LIMIT?: string;
  FAILURE_WINDOW_SECONDS?: string;
  MAX_INGREDIENTS?: string;
  MAX_INGREDIENT_LENGTH?: string;
  LIST_MAX_TOKENS?: string;
  DETAIL_MAX_TOKENS?: string;
  MAX_BODY_BYTES?: string;
}
