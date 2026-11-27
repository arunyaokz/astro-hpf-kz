import { handleInquiry } from "./farsail-inquiry.mjs";
import { handleSeoPre, transformSeoResponse } from "./seo/worker-seo.mjs";
import { runIndexNowSweep } from "./seo/indexnow.mjs";
import handler, { createScheduledHandler } from "@emdash-cms/cloudflare/worker";

const emdashScheduled = createScheduledHandler();
const VALID_EVENTS = new Set(["email", "phone", "whatsapp", "enquiry"]);
const VALID_LANGS = new Set(["en", "zh", "ru", "kk"]);

function parseContactEvent(raw: string) {
  const trimmed = raw.trim();
  if (VALID_EVENTS.has(trimmed)) {
    return { event: trimmed, lang: "unknown", path: "/", source: "" };
  }
  if (!trimmed.startsWith("{")) return null;
  try {
    const obj = JSON.parse(trimmed);
    const event = typeof obj?.event === "string" ? obj.event.trim() : "";
    if (!VALID_EVENTS.has(event)) return null;
    const rawLang = typeof obj?.lang === "string" ? obj.lang.trim().toLowerCase().slice(0, 8) : "";
    const lang = VALID_LANGS.has(rawLang) ? rawLang : "unknown";
    const rawPath = typeof obj?.path === "string" ? obj.path.trim() : "/";
    const path = rawPath.startsWith("/") ? rawPath.split(/[?#]/)[0].slice(0, 160) : "/";
    const source = typeof obj?.source === "string" ? obj.source.trim().replace(/[^\w:./-]/g, "").slice(0, 120) : "";
    return { event, lang, path, source };
  } catch {
    return null;
  }
}

export default {
  ...handler,
  async fetch(request, env, ctx) {
    const bridge = await handleInquiry(request, env);
    if (bridge) return bridge;
    const url = new URL(request.url);
    if (url.pathname === '/_hpf/contact-event') {
      if (request.method !== 'POST' || request.headers.get('Origin') !== url.origin) return new Response(null, { status: 403 });
      const length = Number(request.headers.get('Content-Length') || 0);
      if (length > 512) return new Response(null, { status: 413 });
      const parsed = parseContactEvent(await request.text());
      if (!parsed) return new Response(null, { status: 400 });
      ctx.waitUntil((async () => {
        try {
          await env.DB.batch([
            env.DB.prepare(
              "INSERT INTO hpf_contact_clicks (day, event, count) VALUES (date('now', '+5 hours'), ?, 1) ON CONFLICT(day,event) DO UPDATE SET count=count+1"
            ).bind(parsed.event),
            env.DB.prepare(
              `CREATE TABLE IF NOT EXISTS hpf_contact_clicks_detail (
                day TEXT NOT NULL,
                event TEXT NOT NULL,
                lang TEXT NOT NULL,
                path TEXT NOT NULL,
                source_ref TEXT NOT NULL DEFAULT '',
                count INTEGER NOT NULL DEFAULT 0,
                PRIMARY KEY (day, event, lang, path, source_ref)
              )`
            ),
            env.DB.prepare(
              `INSERT INTO hpf_contact_clicks_detail (day, event, lang, path, source_ref, count)
               VALUES (date('now', '+5 hours'), ?, ?, ?, ?, 1)
               ON CONFLICT(day, event, lang, path, source_ref) DO UPDATE SET count=count+1`
            ).bind(parsed.event, parsed.lang, parsed.path, parsed.source),
          ]);
        } catch (err) {
          console.error("[contact-event] DB write failed:", err);
        }
      })());
      return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
    }

    const seoPre = handleSeoPre(request);
    if (seoPre) return seoPre;

    const response = await handler.fetch!(request, env, ctx);
    return transformSeoResponse(request, response);
  },
  async scheduled(event, env, ctx) {
    await emdashScheduled(event, env, ctx);
    // Run hourly at :05 with D1 exponential backoff to avoid IndexNow 429 rate-limit loops.
    const minute = new Date(event.scheduledTime).getUTCMinutes();
    if (minute === 5) {
      ctx.waitUntil(runIndexNowSweep(env));
    }
  },
} satisfies ExportedHandler<Env>;
