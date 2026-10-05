declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    ADMIN_PASSWORD: string;
    RESEND_API_KEY?: string;
    IDEAS_EMAIL_TO?: string;
    IDEAS_EMAIL_FROM?: string;
  }
}
