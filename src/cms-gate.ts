import { defineMiddleware } from "astro:middleware";
import { env } from "cloudflare:workers";
import { timingSafeEqual } from "node:crypto";

// Protect the initial administrator claim until the owner registers a passkey.
// After a real user exists, EmDash's own authentication governs access.
async function equalSecret(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [left, right] = await Promise.all([a, b].map((value) =>
    crypto.subtle.digest("SHA-256", encoder.encode(value))));
  return timingSafeEqual(new Uint8Array(left), new Uint8Array(right));
}

export const onRequest = defineMiddleware(async (context, next) => {
  if (!context.url.pathname.startsWith("/_emdash/")) {
    const response = await next();
    if (response.headers.get("Content-Type")?.includes("text/html")) response.headers.set("Cache-Control", "private, no-store");
    return response;
  }

  let hasOwner = false;
  try {
    hasOwner = !!(await env.DB.prepare("SELECT 1 AS present FROM users LIMIT 1").first());
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("no such table")) throw error;
  }
  if (!hasOwner) {
    const token = env.HPF_CMS_SETUP_TOKEN;
    const supplied = context.url.searchParams.get("setup_token") ?? context.cookies.get("hpf-cms-setup")?.value;
    if (!token || !supplied || !(await equalSecret(token, supplied))) {
      return new Response("新闻后台正在初始化，请使用老板专属的初始化链接。", {
        status: 403,
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "private, no-store" },
      });
    }
    if (context.url.searchParams.has("setup_token")) {
      context.cookies.set("hpf-cms-setup", token, {
        httpOnly: true, secure: context.url.protocol === "https:", sameSite: "strict", path: "/_emdash/", maxAge: 3600,
      });
      const clean = new URL(context.url);
      clean.searchParams.delete("setup_token");
      return context.redirect(clean.pathname + clean.search, 303);
    }
  }

  // Resolve Chinese on the server from the very first admin screen, even on
  // a browser whose system language is English or Russian.
  if (context.url.pathname.startsWith("/_emdash/admin") && context.cookies.get("emdash-locale")?.value !== "zh-CN") {
    context.cookies.set("emdash-locale", "zh-CN", { path: "/", sameSite: "lax", maxAge: 31536000 });
    return context.redirect(context.url.pathname + context.url.search, 303);
  }
  if (/^\/_emdash\/admin\/content\/(service_pages|route_pages|company_pages|home_pages|footer_settings|contact_settings|header_settings)(\/|$)/.test(context.url.pathname) && !context.url.searchParams.has("locale")) {
    const localized = new URL(context.url);
    localized.searchParams.set("locale", "zh");
    return context.redirect(localized.pathname + localized.search, 303);
  }
  const response = await next();
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "same-origin");
  if (context.url.pathname.startsWith("/_emdash/admin") && response.headers.get("Content-Type")?.includes("text/html")) {
    return new HTMLRewriter().on("title", { element: (element) => { element.setInnerContent("华鹏飞 · 官网管理"); } }).transform(response);
  }
  return response;
});
