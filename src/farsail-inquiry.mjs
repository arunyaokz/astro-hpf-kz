// HPF inquiry adapter. It is disabled until the website explicitly routes requests here.
const encoder = new TextEncoder();
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const LIMIT = 16 * 1024;
const json = (status, value) => new Response(JSON.stringify(value), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

async function readJson(req) {
  if (!req.headers.get('content-type')?.toLowerCase().startsWith('application/json')) throw new Error('content-type');
  const reader = req.body?.getReader();
  if (!reader) throw new Error('empty-body');
  const chunks = []; let n = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    n += value.byteLength;
    if (n > LIMIT) { await reader.cancel(); throw new Error('too-large'); }
    chunks.push(value);
  }
  const all = new Uint8Array(n); let offset = 0;
  for (const chunk of chunks) { all.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(all));
}

function normalize(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('bad-body');
  const field = (key, max, required = false) => {
    const value = data[key];
    if (value != null && typeof value !== 'string') throw new Error('bad-field');
    const text = (value ?? '').trim();
    if (text.length > max || (required && !text)) throw new Error('bad-field');
    return text;
  };
  const name = field('name', 80, true), email = field('email', 254, true);
  if (!EMAIL.test(email) || data.consent !== true) throw new Error('bad-field');
  const cargo = field('cargo', 120, true), origin = field('origin', 500, true), destination = field('destination', 500, true);
  const company = field('company', 500), phone = field('phone', 200), window = field('window', 500), message = field('message', 2500);
  const lang = ['zh', 'ru', 'en'].includes(data.lang) ? data.lang : 'en';
  const text = [`公司 / Company: ${company || '—'}`, `电话 / Phone: ${phone || '—'}`, `货物 / Cargo: ${cargo}`, `起运地 / Origin: ${origin}`, `目的地 / Destination: ${destination}`, `期望到达 / Arrival: ${window || '—'}`, `补充说明 / Notes: ${message || '—'}`].join('\n');
  if (text.length > 5000) throw new Error('too-large');
  return { name, email, product: cargo, qty: '', lang, text };
}

async function validSignature(header, secret, cursor, limit) {
  const match = /^t=(\d+),v1=([a-f0-9]{64})$/.exec(header ?? '');
  if (!secret || !match || Math.abs(Date.now() / 1000 - Number(match[1])) > 300) return false;
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const signature = Uint8Array.from(match[2].match(/../g), byte => parseInt(byte, 16));
  return crypto.subtle.verify('HMAC', key, signature, encoder.encode(`${match[1]}.${cursor}.${limit}`));
}

// DB is the website's D1 binding; the table is a separate additive migration.
export async function handleInquiry(request, env) {
  const url = new URL(request.url);
  const submit = url.pathname === '/_hpf/inquiry';
  const pull = url.pathname === '/_emdash/api/plugins/farsail-bridge/pull';
  if (!submit && !pull) return null;
  if (request.method !== 'POST') return json(405, { error: 'method' });
  if (submit && request.headers.get('origin') !== url.origin) return json(403, { error: 'origin' });
  let input;
  try { input = await readJson(request); } catch { return json(400, { error: 'bad-request' }); }
  if (submit) {
    let inquiry;
    try { inquiry = normalize(input); } catch { return json(400, { error: 'bad-inquiry' }); }
    if (typeof input.requestId !== 'string' || !/^[0-9a-f-]{36}$/i.test(input.requestId)) return json(400, { error: 'bad-request-id' });
    try {
      const ip = request.headers.get('cf-connecting-ip');
      if (!ip || !env.HPF_SITE_PULL_SECRET) return json(503, { error: 'unavailable' });
      const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(`${env.HPF_SITE_PULL_SECRET}:${ip}`)));
      const client = Array.from(digest, x => x.toString(16).padStart(2, '0')).join('');
      const minute = Math.floor(Date.now() / 60_000);
      await env.DB.prepare('DELETE FROM hpf_farsail_rate WHERE minute < ?').bind(minute - 2).run();
      const counter = await env.DB.prepare('INSERT INTO hpf_farsail_rate (client, minute, count) VALUES (?, ?, 1) ON CONFLICT(client, minute) DO UPDATE SET count = count + 1 RETURNING count').bind(client, minute).first();
      if (counter.count > 5) return json(429, { error: 'rate-limit' });
      // One SQL insert commits the sequence and record together; retries use the same request ID.
      const payload = JSON.stringify(inquiry);
      await env.DB.prepare('INSERT INTO hpf_farsail_inquiries (request_id, payload, received_at) VALUES (?, ?, ?) ON CONFLICT(request_id) DO NOTHING').bind(input.requestId, payload, Date.now()).run();
      const saved = await env.DB.prepare('SELECT payload FROM hpf_farsail_inquiries WHERE request_id = ?').bind(input.requestId).first();
      if (!saved || saved.payload !== payload) return json(409, { error: 'request-conflict' });
      return json(200, { ok: true });
    } catch { return json(503, { error: 'unavailable' }); }
  }
  const { cursor, limit } = input ?? {};
  if (!Number.isSafeInteger(cursor) || cursor < 0 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) return json(400, { error: 'bad-cursor' });
  if (!await validSignature(request.headers.get('x-farsail-pull'), env.HPF_SITE_PULL_SECRET, cursor, limit)) return json(401, { error: 'unauthorized' });
  // The cursor acknowledges durably received records; keep those at least seven days.
  await env.DB.prepare('DELETE FROM hpf_farsail_inquiries WHERE seq <= ? AND received_at < ?').bind(cursor, Date.now() - 7 * 86400_000).run();
  const result = await env.DB.prepare('SELECT seq, payload FROM hpf_farsail_inquiries WHERE seq > ? ORDER BY seq LIMIT ?').bind(cursor, limit + 1).all();
  const rows = result.results;
  const items = rows.slice(0, limit).map(row => ({ ...JSON.parse(row.payload), seq: row.seq }));
  const head = await env.DB.prepare('SELECT COALESCE(MAX(seq), 0) AS head FROM hpf_farsail_inquiries').first();
  return json(200, { items, head: head.head, hasMore: rows.length > limit });
}
