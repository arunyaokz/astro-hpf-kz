// 本机联调：用 Horiza 后台真正的同步模块（只读引用 Horiza 代码）写本机 hpf.kz，结束后删除测试产品和本机令牌。
// 只连 localhost，绝不指向生产。用法：先 npm run dev，再 node scripts/verify-horiza-sync-local.mts
// Horiza 代码位置用 HORIZA_OS 指定，默认 ~/Developer/horiza/cloudflare-os。
import { homedir } from "node:os";
const horiza = process.env.HORIZA_OS ?? `${homedir()}/Developer/horiza/cloudflare-os`;
const { emdashToolCaller, previewEmDashSync, runReviewedEmDashSync } = await import(`${horiza}/packages/gatekeeper-horiza/src/emdash-site-sync.ts`);

const base = "http://localhost:4321";
const log: Record<string, unknown> = {};
const bypass = await fetch(`${base}/_emdash/api/setup/dev-bypass`, { redirect: "manual" });
const cookie = bypass.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ");
const admin = async (path: string, body?: unknown, method = body ? "POST" : "GET") => {
  const r = await fetch(`${base}/_emdash/api${path}`, { method, headers: { cookie, Origin: base, "X-EmDash-Request": "1", "Content-Type": "application/json" }, ...(body ? { body: JSON.stringify(body) } : {}) });
  const j = await r.json() as { success: boolean; data: any; error?: unknown };
  if (!j.success) throw new Error(`${path} ${r.status} ${JSON.stringify(j.error)}`);
  return j.data;
};
const created = await admin("/admin/api-tokens", { name: "horiza-sync-local-check", scopes: ["content:read", "content:write", "media:read", "media:write", "schema:read"] });
const token: string = created.token ?? created.rawToken;
const tokenId: string = (created.info ?? created.item ?? created).id;
const call = emdashToolCaller(`${base}/_emdash/api/mcp`, token);
const sku = `CHECK-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
const svc = { service_scope: "Local check scope", service_area: "China → Europe", service_lead_time: "Local check lead time", pricing_method: "Local check pricing" };
const entry = (over: Record<string, unknown> = {}) => ({ serviceFields: svc, skuId: sku, title: "Local check: TIR China to Europe", description: "Connector check only.", unitPriceMinor: "120000", currency: "USD", productRevisionRef: `rev-${sku}`, productRevisionHash: `hash-${crypto.randomUUID().slice(0, 8)}`, productRevisionStatus: "released", status: "published" as const, ...over });
const input = { connectorId: "local", siteId: "hpf-kz-local", target: `${base}/_emdash/api/mcp`, includeServiceDetails: true };
async function sync(entries: any[], label: string) {
  for (const publish of [false, true]) {
    const preview = await previewEmDashSync(call, entries, { ...input, publish });
    const result = await runReviewedEmDashSync(call, entries, { ...input, publish, expectedPreviewHash: preview.hash });
    log[`${label}·${publish ? "发布" : "草稿"}`] = { actions: preview.actions.map((a) => a.kind), ok: result.ok, receipts: result.receipts };
  }
}
try {
  await sync([entry()], "首次同步");
  const page = await (await fetch(`${base}/products/sku-${sku.toLowerCase()}/`)).text();
  log["英文详情显示服务资料与价格"] = ["Local check lead time", "Local check pricing", "China → Europe"].every((t) => page.includes(t)) && /\$1,200\.00/.test(page);
  try { await previewEmDashSync(call, [entry({ pricingMode: "quote", unitPriceMinor: null })], { ...input, publish: false }).then((p) => (log["按需报价预览"] = p.blockers)); } catch (e) { log["按需报价预览"] = `失败：${(e as Error).message}`; }
  try { const q = [entry({ pricingMode: "quote", unitPriceMinor: null })]; const p = await previewEmDashSync(call, q, { ...input, publish: false }); await runReviewedEmDashSync(call, q, { ...input, publish: false, expectedPreviewHash: p.hash }); log["按需报价写入"] = "通过"; } catch (e) { log["按需报价写入"] = `被拒：${(e as Error).message}`; }
  const en = (await admin("/content/products?locale=en")).items.find((x: any) => x.data.sku_id === sku);
  await admin("/content/products", { slug: en.slug, locale: "zh", status: "draft", translationOf: en.id, data: { title: "本机检查：中国至欧洲 TIR" } });
  try { await sync([entry({ title: "Local check: TIR China to Europe v2" })], "有中文翻译后再同步"); } catch (e) { log["有中文翻译后再同步"] = `失败：${(e as Error).message}`; }
} finally {
  for (const locale of ["en", "zh", "ru"]) for (const x of (await admin(`/content/products?locale=${locale}`)).items) if (String(x.data.sku_id ?? "").startsWith("CHECK-") || String(x.data.title ?? "").startsWith("本机检查")) await admin(`/content/products/${x.id}`, undefined, "DELETE");
  await admin(`/admin/api-tokens/${tokenId}`, undefined, "DELETE");
  console.log(JSON.stringify(log, null, 1));
}
