import fs from 'node:fs';
import { corporateSeed, PAGE_COLLECTIONS, PAGE_SLUGS, encodePage, decodePage, baseline } from '../src/cms/page-model.mjs';
const collections=corporateSeed();
const content={};
for(const kind of Object.keys(PAGE_COLLECTIONS)){
 content[PAGE_COLLECTIONS[kind]]=['en','zh','ru'].map((locale,index)=>{
  const data=encodePage(kind,locale);const {heroImage,...decoded}=decodePage(kind,locale,data);
  if(JSON.stringify(decoded)!==JSON.stringify(baseline[kind][locale]))throw new Error('Round-trip mismatch: '+kind+'/'+locale);
  return {id:`${kind}-${locale}`,slug:PAGE_SLUGS[kind],locale,status:'published',...(index?{translationOf:`${kind}-en`}:{}),data};
 });
}
const p='.emdash/seed.json';const seed=JSON.parse(fs.readFileSync(p));seed.collections=seed.collections.filter(c=>!Object.values(PAGE_COLLECTIONS).includes(c.slug)).concat(collections);seed.content={...seed.content,...content};seed.settings.title='华鹏飞 · 官网管理';seed.meta.name='华鹏飞官网内容';fs.writeFileSync(p,JSON.stringify(seed,null,2)+'\n');
fs.writeFileSync('src/cms/corporate-import.json',JSON.stringify({collections,content},null,2)+'\n');
console.log('Prepared',collections.map(x=>`${x.label}(${x.fields.length}个字段)`).join('、'),'；9个页面无损往返校验通过。');
