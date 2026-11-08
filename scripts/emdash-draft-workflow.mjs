#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { connect, call, SITE } from './emdash-mcp.mjs';

const dir = path.resolve(process.argv[2] || 'ops/editorial/middle-corridor-shipping-checklist-20261025');
const receiptFile = path.join(dir, 'receipt.json');
const slug = path.basename(dir).replace('-20261025', '');
const sources = [
  'https://www.worldbank.org/en/news/press-release/2023/11/27/middle-corridor-through-central-asia-caucasus-can-boost-trade-connectivity-and-supply-chain-resilience',
  'https://www.adb.org/publications/unlocking-transport-connectivity-in-the-caucasus-and-central-asia',
];
const descriptions = {
  zh: '从路线方案、换装与过海、单证一致性、费用边界到异常沟通，用五个问题把中间走廊发运准备说清楚。',
  ru: 'Маршрут, перегрузки, документы, состав цены и связь при отклонениях: пять вопросов, которые стоит согласовать до отправки по Среднему коридору.',
  kk: 'Бағыт, қайта тиеу, құжаттар, баға құрамы және өзгерістер туралы байланыс: Орта дәлізбен жүк жөнелтпес бұрын келісетін бес мәселе.',
};
const alt = {
  zh: 'AI 概念插画：货运列车、集装箱码头与里海货轮，非实景或 HPF.kz 自有资产照片。',
  ru: 'Концептуальная иллюстрация ИИ: грузовой поезд, контейнерный терминал и судно на Каспии; не фотография реального объекта или активов HPF.kz.',
  kk: 'ЖИ жасаған тұжырымдамалық иллюстрация: жүк пойызы, контейнер терминалы және Каспийдегі кеме; нақты нысанның не HPF.kz активтерінің фотосуреті емес.',
};
const receipt = fs.existsSync(receiptFile) ? JSON.parse(fs.readFileSync(receiptFile, 'utf8')) : { site: SITE, slug, media: null, drafts: {}, checks: {} };
const save = () => fs.writeFileSync(receiptFile, JSON.stringify(receipt, null, 2) + '\n');
const unwrap = result => result.item ?? result;
let client;
try {
  const bodies = Object.fromEntries(['zh','ru','kk'].map(locale => [locale, fs.readFileSync(path.join(dir, locale + '.md'), 'utf8')]));
  for (const [locale, text] of Object.entries(bodies)) {
    if (!text.startsWith('# ') || !text.includes(sources[0]) || !text.includes(sources[1])) throw new Error(locale + ' 缺少标题或来源');
  }
  client = await connect();
  const schema = await call(client, 'schema_get_collection', { slug: 'news' });
  for (const field of ['title','description','content','hero_image','native_reviewed','source_urls']) {
    if (!schema.fields.some(item => item.slug === field)) throw new Error('缺少新闻字段 ' + field);
  }
  const image = fs.readFileSync(path.join(dir, 'cover.png'));
  receipt.imageSha256 = crypto.createHash('sha256').update(image).digest('hex');
  if (!receipt.media) {
    receipt.media = unwrap(await call(client, 'media_upload', { filename: slug + '-ai-cover.png', base64: image.toString('base64'), contentType: 'image/png', alt: alt.zh, caption: 'Codex 内置生图 · AI 概念插画；非真实港口、作业或 HPF.kz 自有资产照片。' }));
    save(); console.log('封面已入库：' + receipt.media.id);
  }
  for (const locale of ['zh','ru','kk']) {
    if (!receipt.drafts[locale]) {
      // A previous call may have succeeded before the response was saved.
      const prior = await call(client, 'content_list', { collection: 'news', locale, limit: 100 });
      const existing = prior.items?.find(item => item.slug === slug);
      if (existing) {
        if (existing.status !== 'draft') throw new Error(locale + ' 已有非草稿同名文章，停止以免覆盖。');
        receipt.drafts[locale] = { id: existing.id, locale, slug, status: existing.status };
        save();
      } else {
        const text = bodies[locale];
        const title = text.split('\n')[0].replace(/^# /, '');
        const media = receipt.media;
        const result = unwrap(await call(client, 'content_create', {
          collection: 'news', slug, locale, status: 'draft',
          ...(locale !== 'zh' ? { translationOf: receipt.drafts.zh.id } : {}),
          data: { title, description: descriptions[locale], content: text.replace(/^# [^\n]+\n+/, ''), hero_image: { id: media.id, provider: 'local', url: media.url, width: media.width, height: media.height, alt: alt[locale], caption: alt[locale] }, category: '行业分析', verification_status: '分析观点', source_urls: sources.join('\n'), author_name: 'HPF.kz', native_reviewed: false },
          seo: { title, description: descriptions[locale] },
        }));
        receipt.drafts[locale] = { id: result.id, locale, slug, status: result.status, title, adminUrl: SITE + '/_emdash/admin/content/news/' + result.id + '?locale=' + locale };
        save(); console.log(locale + ' 草稿已保存：' + result.id);
      }
    }
    const item = unwrap(await call(client, 'content_get', { collection: 'news', id: receipt.drafts[locale].id }));
    // D1 returns boolean custom fields as SQLite 0/1 over MCP.
    const unreviewed = item.data.native_reviewed === false || item.data.native_reviewed === 0;
    if (item.status !== 'draft' || item.publishedAt || item.scheduledAt || item.locale !== locale || item.data.hero_image?.id !== receipt.media.id || !unreviewed) throw new Error(locale + ' 草稿回读校验失败');
    const spans = JSON.stringify(item.data.content);
    if (!Array.isArray(item.data.content) || !spans.includes(bodies[locale].split('\n\n')[1].slice(0, 20))) throw new Error(locale + ' 富文本校验失败');
    receipt.checks[locale] = { status: 'draft', nativeReviewed: false, heroLinked: true, portableText: true, noPublicationOrSchedule: true };
    save();
  }
  const group = await call(client, 'content_translations', { collection: 'news', id: receipt.drafts.zh.id });
  const translations = group.translations ?? [];
  if (!['zh','ru','kk'].every(locale => translations.some(item => item.locale === locale && item.id === receipt.drafts[locale].id))) throw new Error('三语翻译关联校验失败');
  receipt.translationGroup = group;
  const mediaResponse = await fetch(new URL(receipt.media.url, SITE));
  const actual = Buffer.from(await mediaResponse.arrayBuffer());
  if (!mediaResponse.ok || crypto.createHash('sha256').update(actual).digest('hex') !== receipt.imageSha256) throw new Error('图片匿名读取或文件完整性校验失败');
  receipt.checks.media = { status: mediaResponse.status, sha256Matches: true, bytes: actual.length };
  for (const locale of ['zh','ru','kk']) {
    const response = await fetch(SITE + '/' + locale + '/news/' + slug + '/');
    if (response.status !== 404) throw new Error(locale + ' 草稿匿名访问应返回404，实际：' + response.status);
    receipt.checks[locale].anonymousStatus = response.status;
  }
  receipt.completedAt = new Date().toISOString(); save();
  console.log('已验证：图片入库并可读取，三语关联草稿、封面绑定、富文本和匿名不可见。');
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { await client?.close(); }
