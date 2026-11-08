import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {loadBundle,runBundle,verifyDraft} from './draft-bundle.mjs';

const fields=['title','description','content','hero_image','source_urls','native_reviewed','category','verification_status','author_name'].map(slug=>({slug}));
const block=text=>({_type:'block',_key:'p',style:'normal',markDefs:[],children:[{_type:'span',_key:'s',text,marks:[]}]});
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aFbkAAAAASUVORK5CYII=','base64');
function fixture(slug){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'hpf-ops-test-'));
  const source='https://example.org/'+slug;
  const manifest={version:1,topic:slug,slug,category:'行业分析',verificationStatus:'分析观点',sources:[source],image:{file:'cover.png',promptFile:'image-prompt.txt',contentType:'image/png'},entries:{}};
  fs.writeFileSync(path.join(root,'cover.png'),png);fs.writeFileSync(path.join(root,'image-prompt.txt'),'Generated conceptual port illustration for '+slug);
  const paragraphs={};
  for(const locale of ['zh','ru','kk']){
    const para=locale+' '+slug+' '+('Concrete shipping handover details without transit-time promises. ').repeat(3);
    paragraphs[locale]=para;
    fs.writeFileSync(path.join(root,locale+'.md'),'# '+locale+' '+slug+'\n\n'+para+'\n\n[Source]('+source+')\n');
    manifest.entries[locale]={file:locale+'.md',description:locale+' summary '+slug,alt:locale+' cover '+slug,caption:locale+' AI conceptual illustration'};
  }
  const file=path.join(root,'bundle.json');fs.writeFileSync(file,JSON.stringify(manifest));
  return {root,file,manifest,paragraphs,clean:()=>fs.rmSync(root,{recursive:true,force:true})};
}
function fake(f,options={}){
  const items=[],calls=[];let serial=0;let failed=false;
  const api=async(name,args)=>{
    calls.push({name,args});
    if(name==='schema_get_collection')return {fields};
    if(name==='content_list'){
      if(options.page2Collision && args.locale==='kk'){
        return args.cursor?{items:[{id:'foreign',slug:f.manifest.slug,status:'draft'}]}:{items:[],nextCursor:'page2'};
      }
      return {items:items.filter(x=>x.locale===args.locale)};
    }
    if(name==='media_upload')return {id:'media-1',url:'/media/cover.png',width:1,height:1};
    if(name==='media_get')return {item:{id:'media-1'}};
    if(name==='content_create'){
      assert.equal(args.status,'draft');assert.equal(args.data.native_reviewed,false);
      const item={id:'draft-'+(++serial),slug:args.slug,locale:args.locale,status:'draft',data:{...args.data,content:[block(f.paragraphs[args.locale]),block('Source')]},translationGroup:args.translationOf||'draft-1'};
      items.push(item);
      if(options.lostCreate && !failed){failed=true;throw new Error('response lost after server committed');}
      return {item};
    }
    if(name==='content_get')return {item:items.find(x=>x.id===args.id)};
    if(name==='content_translations')return {translations:items.map(({id,locale,status,slug})=>({id,locale,status,slug}))};
    throw new Error('Unexpected operation: '+name);
  };
  const fetcher=async url=>({status:String(url).includes('/media/')?200:404,arrayBuffer:async()=>String(url).includes('/media/')?png:Buffer.alloc(0)});
  const writes=()=>calls.filter(x=>['media_upload','content_create','content_update'].includes(x.name));
  return {api,fetcher,items,calls,writes};
}

test('two independent topics produce their own three linked draft sets; repeat creates nothing',async()=>{
  for(const slug of ['warehouse-handover','tir-document-preparation']){
    const f=fixture(slug),m=fake(f);
    try{
      const result=await runBundle(loadBundle(f.file),m.api,m.fetcher);
      assert.equal(m.writes().length,4);
      assert.deepEqual(m.calls.filter(x=>x.name==='content_create').map(x=>x.args.locale),['zh','ru','kk']);
      assert.equal(m.calls.find(x=>x.name==='content_create'&&x.args.locale==='ru').args.translationOf,result.drafts.zh.id);
      assert.equal(m.calls.find(x=>x.name==='content_create'&&x.args.locale==='kk').args.translationOf,result.drafts.zh.id);
      assert.ok(result.completedAt);assert.equal(result.checks.media.sha256Matches,true);
      assert.equal(result.checks.zh.anonymousStatus,404);
      assert.ok(!m.calls.some(x=>/publish|schedule|delete|update/.test(x.name)));
      await runBundle(loadBundle(f.file),m.api,m.fetcher);assert.equal(m.writes().length,4);
    }finally{f.clean();}
  }
});
test('a same-slug collision on a later page stops before any upload',async()=>{
  const f=fixture('collision'),m=fake(f,{page2Collision:true});
  try{await assert.rejects(runBundle(loadBundle(f.file),m.api,m.fetcher),/同名/);assert.equal(m.writes().length,0);}finally{f.clean();}
});
test('lost create response is journaled and rerun never creates a duplicate',async()=>{
  const f=fixture('uncertain-create'),m=fake(f,{lostCreate:true});
  try{
    await assert.rejects(runBundle(loadBundle(f.file),m.api,m.fetcher),/response lost/);
    const receipt=JSON.parse(fs.readFileSync(path.join(f.root,'receipt.json')));
    assert.equal(receipt.pending.tool,'content_create');assert.equal(m.items.length,1);
    await assert.rejects(runBundle(loadBundle(f.file),m.api,m.fetcher),/同名/);
    assert.equal(m.items.length,1);assert.equal(m.writes().length,2);
  }finally{f.clean();}
});
test('remote body edit and publication are rejected without overwriting',async()=>{
  const f=fixture('remote-edit'),m=fake(f);
  try{
    await runBundle(loadBundle(f.file),m.api,m.fetcher);const count=m.writes().length;
    m.items[1].data.content=[block('Externally changed text')];
    await assert.rejects(runBundle(loadBundle(f.file),m.api,m.fetcher),/正文/);
    assert.equal(m.writes().length,count);
    m.items[1].status='published';
    await assert.rejects(runBundle(loadBundle(f.file),m.api,m.fetcher),/草稿/);
    assert.equal(m.writes().length,count);
  }finally{f.clean();}
});
test('changed local bundle cannot be paired with an old receipt',async()=>{
  const f=fixture('changed-package'),m=fake(f);
  try{
    await runBundle(loadBundle(f.file),m.api,m.fetcher);
    fs.appendFileSync(path.join(f.root,'zh.md'),'\nChanged paragraph.');
    await assert.rejects(runBundle(loadBundle(f.file),m.api,m.fetcher),/回执/);
    assert.equal(m.writes().length,4);
  }finally{f.clean();}
});
test('publication parameters, missing language and mismatched image type fail offline',()=>{
  const f=fixture('offline-rejections');
  try{
    for(const change of [
      m=>m.status='published',
      m=>m.entries.ru.native_reviewed=true,
      m=>delete m.entries.kk,
      m=>m.image.contentType='image/jpeg',
    ]){
      const manifest=structuredClone(f.manifest);change(manifest);fs.writeFileSync(f.file,JSON.stringify(manifest));assert.throws(()=>loadBundle(f.file));
    }
  }finally{f.clean();}
});
