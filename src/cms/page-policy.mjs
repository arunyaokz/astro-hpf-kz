import { definePlugin } from 'emdash';
import { decodePage, PAGE_COLLECTIONS, PAGE_SLUGS } from './page-model.mjs';

async function checkPage(event) {
  const kind=Object.keys(PAGE_COLLECTIONS).find(key=>PAGE_COLLECTIONS[key]===event.collection);
  if(!kind)return;
  const item=event.content;
  if(kind==='contacts'&&item.locale!=='zh')return {cancel:true,reason:'全站联系方式统一在中文条目维护。'};
  if(!['en','zh','ru'].includes(item.locale))return {cancel:true,reason:'请选择中文、英文或俄文页面。'};
  if(item.slug!==PAGE_SLUGS[kind])return {cancel:true,reason:'请编辑列表中的现有页面，不要更改页面网址。'};
  try { decodePage(kind,item.locale,item.data); }
  catch(error){return {cancel:true,reason:error instanceof Error?error.message:'页面内容不完整，请检查后再发布。'}}
}
export function createPlugin() {
  return definePlugin({
    id:'hpf-corporate-pages',version:'1.0.0',capabilities:['hooks.content-policy:register','content:read'],
    hooks:{'content:beforePublish':checkPage,'content:beforeSchedule':checkPage,
      'content:beforeUnpublish':async event=>['footer_settings','contact_settings'].includes(event.collection)?{cancel:true,reason:'全站设置需要保持发布状态，请直接编辑后发布。'}:undefined,
      'content:beforeDelete':async event=>['footer_settings','contact_settings'].includes(event.collection)?false:undefined},
  });
}
