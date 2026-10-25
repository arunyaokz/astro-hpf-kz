// Execute in an authenticated administrator browser after deploying global settings.
// Move duplicated company contacts to the shared collection without changing legal copy.
export async function migrateCompanyContacts() {
 async function api(path,method='GET',body) {
  const r=await fetch('/_emdash/api'+path,{method,headers:{'Content-Type':'application/json','X-EmDash-Request':'1'},...(body?{body:JSON.stringify(body)}:{})});const j=await r.json();
  if(!r.ok||!j.success)throw new Error(path+': '+JSON.stringify(j.error));return j.data;
 }
 const prepared=[];
 for(const locale of ['en','zh','ru']){
  const item=(await api('/content/company_pages?locale='+locale)).items.find(x=>x.slug==='about');
  const detail=await api('/content/company_pages/'+item.id);
  if(detail.item.draftRevisionId)throw new Error('公司介绍已有未发布草稿，请保留该草稿后再迁移：'+locale);
  prepared.push({locale,item,detail});
 }
 const fields=(await api('/schema/collections/company_pages/fields')).items;
 const field=fields.find(x=>x.slug==='entity_facts');
 await api('/schema/collections/company_pages/fields/entity_facts','PUT',{validation:{...field.validation,minItems:4,maxItems:4}});
 if(fields.some(x=>x.slug==='contact_email'))await api('/schema/collections/company_pages/fields/contact_email','DELETE');
 await api('/schema/collections/company_pages','PUT',{description:'编辑三语公司介绍及法人资料。邮箱、电话和办公地址统一在“全站联系方式”维护。'});
 const results=[];
 for(const {locale,item,detail}of prepared){
  const data={...detail.item.data,entity_facts:detail.item.data.entity_facts.slice(0,4)};delete data.contact_email;
  await api('/content/company_pages/'+item.id,'PUT',{data,_rev:detail._rev});
  await api('/content/company_pages/'+item.id+'/publish','POST',{});
  results.push({locale,id:item.id,legalFacts:4});
 }
 for(const collection of ['footer_settings','contact_settings']){
  const list=(await api('/schema/collections/'+collection+'/fields')).items;
  if(list.some(x=>x.slug==='hero_image'))await api('/schema/collections/'+collection+'/fields/hero_image','DELETE');
 }
 return results;
}
