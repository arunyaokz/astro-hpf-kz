#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const SITE = 'https://hpf.kz';
const LANGS = ['zh', 'ru', 'kk'];
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const unwrap = value => value.item ?? value;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
function localFile(root, name) {
  assert(typeof name === 'string' && name, '文件路径缺失');
  const target = fs.realpathSync(path.resolve(root, name));
  assert(target.startsWith(root + path.sep), '文件必须位于稿件包目录内');
  return target;
}
function textOnly(markdown) {
  return markdown.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}(?:#{1,6}\s+|[-*+]\s+|\d+[.)]\s+|>\s*)/gm, '')
    .replace(/\x60{1,3}|\*|_/g, '').replace(/\s+/g, '');
}
function portableText(value) {
  if (Array.isArray(value)) return value.map(portableText).join('');
  if (!value || typeof value !== 'object') return '';
  if (value._type === 'span') return value.text ?? '';
  return Object.values(value).filter(item => item && typeof item === 'object').map(portableText).join('');
}
export function loadBundle(file) {
  const manifestFile = fs.realpathSync(path.resolve(file));
  const root = path.dirname(manifestFile);
  const raw = fs.readFileSync(manifestFile);
  const manifest = JSON.parse(raw);
  assert(manifest.version === 1, '需要 version:1 稿件包');
  assert(!Object.keys(manifest).some(key => ['status','publishedAt','scheduledAt','site','collection'].includes(key)), '不接受发布参数或自定义目标站点/集合');
  assert(typeof manifest.topic === 'string' && manifest.topic.trim(), '缺少选题');
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.slug) && manifest.slug.length <= 100, 'slug 应为英文短名');
  assert(typeof manifest.category === 'string' && manifest.category.trim(), '缺少分类');
  assert(typeof manifest.verificationStatus === 'string', '缺少核验状态');
  assert(Array.isArray(manifest.sources), 'sources 必须为数组');
  for (const url of manifest.sources) assert(/^https?:\/\//.test(url) && new URL(url).hostname, '来源必须为 HTTP(S) 地址');
  assert(manifest.sources.length || (manifest.sourceNote?.trim() && ['公司一手信息','分析观点'].includes(manifest.verificationStatus)), '没有来源时须记录真实内部依据 sourceNote');
  assert(JSON.stringify(Object.keys(manifest.entries ?? {}).sort()) === JSON.stringify([...LANGS].sort()), '必须同时提供 zh/ru/kk');
  const image = fs.readFileSync(localFile(root, manifest.image?.file));
  const type = image.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ? 'image/png'
    : image[0]===255 && image[1]===216 ? 'image/jpeg'
    : image.toString('ascii',0,4)==='RIFF' && image.toString('ascii',8,12)==='WEBP' ? 'image/webp' : null;
  assert(type && type === manifest.image.contentType, '封面格式与文件头不符');
  const prompt = fs.readFileSync(localFile(root, manifest.image.promptFile), 'utf8');
  assert(prompt.trim().length > 15, '缺少完整生图提示词');
  const entries = {};
  for (const locale of LANGS) {
    const meta = manifest.entries[locale];
    assert(!Object.keys(meta).some(key => ['status','native_reviewed','publishedAt','scheduledAt'].includes(key)), '语言条目不接受发布或已校对参数');
    for (const field of ['description','alt','caption']) assert(typeof meta[field] === 'string' && meta[field].trim(), locale + ' 缺少 ' + field);
    const markdown = fs.readFileSync(localFile(root, meta.file), 'utf8').replace(/\r\n/g, '\n').trim();
    const match = markdown.match(/^# ([^\n]+)\n+([\s\S]+)$/);
    assert(match && match[2].trim().length >= 80, locale + ' 缺少标题或完整正文');
    for (const source of manifest.sources) assert(markdown.includes(source), locale + ' 正文遗漏来源');
    entries[locale] = { ...meta, title: match[1].trim(), body: match[2].trim() };
  }
  const fingerprint = hash(JSON.stringify({manifest, entries, image:hash(image), prompt}));
  return {root,manifest,entries,image,fingerprint,imageHash:hash(image)};
}
function checkpoint(file, receipt) {
  const temporary = file + '.tmp';
  fs.writeFileSync(temporary, JSON.stringify(receipt,null,2)+'\n');
  fs.renameSync(temporary,file);
}
async function listAll(api, locale) {
  const items=[]; let cursor; const seen=new Set();
  for(let page=0;page<100;page++){
    const result=await api('content_list',{collection:'news',locale,limit:100,...(cursor?{cursor}:{})});
    items.push(...(result.items??[]));
    if(!result.nextCursor)return items;
    assert(!seen.has(result.nextCursor),'分页游标重复，停止写入');
    seen.add(result.nextCursor);cursor=result.nextCursor;
  }
  throw new Error('查重超过100页，停止写入以免遗漏');
}
export function verifyDraft(item,bundle,locale,mediaId) {
  const data=item.data??{};
  assert(item.locale===locale && item.slug===bundle.manifest.slug && item.status==='draft' && !item.publishedAt && !item.scheduledAt && !item.liveRevisionId, locale+' 不是未发布、未定时草稿');
  assert(data.native_reviewed===false || data.native_reviewed===0,locale+' 校对状态不符合预期');
  assert(data.title===bundle.entries[locale].title && data.description===bundle.entries[locale].description,locale+' 标题或摘要已变化');
  assert(data.hero_image?.id===mediaId,locale+' 封面引用不一致');
  assert(data.source_urls===bundle.manifest.sources.join('\n') && data.category===bundle.manifest.category && data.verification_status===bundle.manifest.verificationStatus,locale+' 来源或分类已变化');
  assert(Array.isArray(data.content) && textOnly(portableText(data.content))===textOnly(bundle.entries[locale].body),locale+' 富文本正文与本地稿不一致；停止，不覆盖');
}
export async function runBundle(bundle, api, fetcher=fetch) {
  const file=path.join(bundle.root,'receipt.json');
  const receipt=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{version:1,site:SITE,slug:bundle.manifest.slug,fingerprint:bundle.fingerprint,media:null,drafts:{},checks:{}};
  assert(receipt.version===1 && receipt.site===SITE && receipt.slug===bundle.manifest.slug && receipt.fingerprint===bundle.fingerprint,'回执与本稿件包不符；停止以免混用或覆盖');
  const save=()=>checkpoint(file,receipt);
  const schema=await api('schema_get_collection',{slug:'news'});
  for(const slug of ['title','description','content','hero_image','source_urls','native_reviewed','category','verification_status','author_name']){
    assert(schema.fields?.some(field=>field.slug===slug),'新闻字段缺失：'+slug);
  }
  for(const [slug,value] of [['category',bundle.manifest.category],['verification_status',bundle.manifest.verificationStatus]]){
    const options=schema.fields.find(f=>f.slug===slug).validation?.options;
    if(options)assert(options.includes(value),'字段选项不匹配：'+slug);
  }
  // Read all locales before any write. Never adopt another same-slug entry.
  for(const locale of LANGS){
    const collisions=(await listAll(api,locale)).filter(x=>x.slug===receipt.slug);
    assert(collisions.every(x=>x.id===receipt.drafts[locale]?.id),locale+' 已有同名内容但不在本回执中，先只读核查，不自动认领');
  }
  assert(!receipt.pending,'上次写入结果尚未确认：请先只读核查 pending，再恢复回执');
  if(receipt.media){
    const media=unwrap(await api('media_get',{id:receipt.media.id}));
    assert(media.id===receipt.media.id,'已入库媒体不存在，停止写入');
  }
  // Preflight known drafts before creating any further entries.
  for(const locale of LANGS)if(receipt.drafts[locale]){
    verifyDraft(unwrap(await api('content_get',{collection:'news',id:receipt.drafts[locale].id})),bundle,locale,receipt.media.id);
  }
  const write=async(name,args,locale)=>{
    receipt.pending={tool:name,...(locale?{locale}:{}),startedAt:new Date().toISOString()};save();
    return unwrap(await api(name,args));
  };
  if(!receipt.media){
    const media=await write('media_upload',{filename:receipt.slug+path.extname(bundle.manifest.image.file),base64:bundle.image.toString('base64'),contentType:bundle.manifest.image.contentType,alt:bundle.entries.zh.alt,caption:bundle.entries.zh.caption});
    assert(media.id && media.url,'媒体上传未返回有效ID/URL；保留pending待核查');
    receipt.media=media;delete receipt.pending;save();
  }
  for(const locale of LANGS){
    if(!receipt.drafts[locale]){
      const entry=bundle.entries[locale],media=receipt.media;
      const item=await write('content_create',{
        collection:'news',slug:receipt.slug,locale,status:'draft',
        ...(locale==='zh'?{}:{translationOf:receipt.drafts.zh.id}),
        data:{title:entry.title,description:entry.description,content:entry.body,hero_image:{id:media.id,provider:'local',width:media.width,height:media.height,alt:entry.alt,caption:entry.caption},category:bundle.manifest.category,verification_status:bundle.manifest.verificationStatus,source_urls:bundle.manifest.sources.join('\n'),author_name:bundle.manifest.authorName||'HPF.kz',native_reviewed:false},
        seo:{title:entry.title,description:entry.description}
      },locale);
      assert(item.id,'创建未返回ID；保留pending待核查');
      receipt.drafts[locale]={id:item.id,locale,slug:receipt.slug,title:entry.title,adminUrl:SITE+'/_emdash/admin/content/news/'+item.id+'?locale='+locale};
      delete receipt.pending;save();
    }
    const item=unwrap(await api('content_get',{collection:'news',id:receipt.drafts[locale].id}));
    verifyDraft(item,bundle,locale,receipt.media.id);
    receipt.checks[locale]={draft:true,nativeReviewed:false,bodyMatches:true,heroLinked:true,noPublicationOrSchedule:true};save();
  }
  const group=await api('content_translations',{collection:'news',id:receipt.drafts.zh.id});
  assert(LANGS.every(locale=>group.translations?.some(x=>x.id===receipt.drafts[locale].id && x.locale===locale && x.status==='draft')),'三语翻译关联不完整');
  receipt.translationGroup=group;
  const mediaResponse=await fetcher(new URL(receipt.media.url,SITE));
  assert(mediaResponse.status===200 && hash(Buffer.from(await mediaResponse.arrayBuffer()))===bundle.imageHash,'媒体读取或文件摘要不符');
  receipt.checks.media={status:200,sha256Matches:true,sha256:bundle.imageHash};
  for(const locale of ['zh','ru']){
    const response=await fetcher(SITE+'/'+locale+'/news/'+receipt.slug+'/',{redirect:'manual'});
    await response.arrayBuffer();
    assert(response.status===404,locale+' 草稿公开详情未返回404，请核查');
    receipt.checks[locale].anonymousStatus=404;
  }
  receipt.checks.kk.publicRoute='未实现哈语公开页，不将其404当作草稿隔离证据';
  receipt.completedAt=new Date().toISOString();save();return receipt;
}
async function main(){
  const [file,...flags]=process.argv.slice(2);
  assert(file && flags.every(x=>x==='--validate-only'),'用法：node draft-bundle.mjs /path/bundle.json [--validate-only]');
  const bundle=loadBundle(file);
  if(flags.includes('--validate-only')){
    console.log('稿件包通过本地检查：'+bundle.manifest.topic+'；zh/ru/kk齐全；未联网、未写入。');return;
  }
  const lock=path.join(bundle.root,'.draft-bundle.lock');
  let descriptor,client;
  try{
    descriptor=fs.openSync(lock,'wx');fs.writeFileSync(descriptor,JSON.stringify({pid:process.pid,startedAt:new Date().toISOString()}));
    const bridge=await import('./emdash-mcp.mjs');
    client=await bridge.connect();
    const receipt=await runBundle(bundle,(name,args)=>bridge.call(client,name,args));
    console.log(JSON.stringify({topic:bundle.manifest.topic,drafts:receipt.drafts,checks:receipt.checks,completedAt:receipt.completedAt},null,2));
  }finally{
    await client?.close();
    if(descriptor!==undefined){fs.closeSync(descriptor);fs.unlinkSync(lock);}
  }
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  main().catch(error=>{console.error(error.message);process.exitCode=1;});
}
