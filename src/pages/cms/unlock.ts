import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { timingSafeEqual } from "node:crypto";
export const prerender = false;

export const POST: APIRoute = async ({ request, url, cookies }) => {
  const headers = { "Cache-Control": "private, no-store" };
  if (request.headers.get("origin") !== url.origin) return new Response("来源无效", { status: 403, headers });
  let body: unknown;
  try { body = await request.json(); } catch { return new Response("请求无效", { status: 400, headers }); }
  const token = body && typeof body === "object" && "token" in body ? body.token : undefined;
  if (typeof token !== "string" || token.length > 256 || !env.HPF_CMS_SETUP_TOKEN) return new Response("入口无效", { status: 403, headers });
  const encode = (value: string) => crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  const [a, b] = await Promise.all([encode(token), encode(env.HPF_CMS_SETUP_TOKEN)]);
  if (!timingSafeEqual(new Uint8Array(a), new Uint8Array(b))) return new Response("入口无效", { status: 403, headers });
  cookies.set("hpf-cms-setup", token, { httpOnly: true, secure: url.protocol === "https:", sameSite: "strict", path: "/_emdash/", maxAge: 3600 });
  return new Response(null, { status: 204, headers });
};
