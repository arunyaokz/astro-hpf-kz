// Run in an authenticated EmDash administrator browser. Additive only.
// Existing fields and content are never overwritten by this migration.
export async function migrateCorporateCollection(collection) {
 const api='/_emdash/api';
 async function request(path,method='GET',body) {
  const r=await fetch(api+path,{method,headers:{'Content-Type':'application/json','X-EmDash-Request':'1'},...(body?{body:JSON.stringify(body)}:{})});const j=await r.json();
  if(!r.ok||!j.success)throw new Error(`${path}: ${r.status} ${JSON.stringify(j.error)}`);return j.data;
 }
 const present=(await request('/schema/collections')).items.find(c=>c.slug===collection.slug);
 if(!present)await request('/schema/collections','POST',{...collection,fields:undefined,titleField:undefined,source:'manual',admin:{quickCreate:false}});
 const fields=(await request(`/schema/collections/${collection.slug}/fields`)).items;
 let created=0;
 for(const [sortOrder,field]of collection.fields.entries()){
  const old=fields.find(f=>f.slug===field.slug);
  if(old){if(old.type!==field.type)throw new Error('Existing field type differs: '+field.slug);continue}
  await request(`/schema/collections/${collection.slug}/fields`,'POST',{...field,sortOrder});created++;
 }
 await request(`/schema/collections/${collection.slug}`,'PUT',{titleField:collection.titleField,admin:{quickCreate:false}});
 return {collection:collection.slug,fieldsCreated:created,totalFields:collection.fields.length};
}

export async function migrateCorporateContent(collection,entries) {
 async function request(path,method='GET',body) {
  const r=await fetch('/_emdash/api'+path,{method,headers:{'Content-Type':'application/json','X-EmDash-Request':'1'},...(body?{body:JSON.stringify(body)}:{})});const j=await r.json();
  if(!r.ok||!j.success)throw new Error(`${path}: ${r.status} ${JSON.stringify(j.error)}`);return j.data;
 }
 const ids={};const result=[];
 for(const entry of entries){
  const items=(await request(`/content/${collection}?locale=${entry.locale}`)).items;
  const existing=items.find(item=>item.slug===entry.slug);
  if(existing){ids[entry.id]=existing.id;result.push({locale:entry.locale,status:'preserved',id:existing.id});continue}
  const {item}=await request(`/content/${collection}`,'POST',{slug:entry.slug,locale:entry.locale,status:'draft',data:entry.data,...(entry.translationOf?{translationOf:ids[entry.translationOf]}:{})});
  ids[entry.id]=item.id;
  await request(`/content/${collection}/${item.id}/publish`,'POST',{});
  result.push({locale:entry.locale,status:'imported',id:item.id});
 }
 return {collection,entries:result};
}
