import { handleInquiry } from "./farsail-inquiry.mjs";
import handler, { createScheduledHandler } from "@emdash-cms/cloudflare/worker";

export default {
  ...handler,
  async fetch(request, env, ctx) {
    const bridge = await handleInquiry(request, env);
    if (bridge) return bridge;
    const url = new URL(request.url);
    if (url.pathname === '/_hpf/contact-event') {
      if (request.method !== 'POST' || request.headers.get('Origin') !== url.origin) return new Response(null, { status: 403 });
      const length = Number(request.headers.get('Content-Length') || 0);
      if (length > 128) return new Response(null, { status: 413 });
      const event = await request.text();
      if (!['email', 'phone', 'whatsapp', 'enquiry'].includes(event)) return new Response(null, { status: 400 });
      ctx.waitUntil(env.DB.prepare("INSERT INTO hpf_contact_clicks (day, event, count) VALUES (date('now', '+5 hours'), ?, 1) ON CONFLICT(day,event) DO UPDATE SET count=count+1").bind(event).run().catch(console.error));
      return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
    }
    return handler.fetch!(request, env, ctx);
  },
  scheduled: createScheduledHandler(),
} satisfies ExportedHandler<Env>;
