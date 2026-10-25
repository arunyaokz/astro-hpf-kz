import fs from 'node:fs';
import ts from 'typescript';
import { execFileSync } from 'node:child_process';
import { parse } from 'yaml';
async function load(name) {
 const js=ts.transpileModule(fs.readFileSync(`src/${name}.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
 return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
}
const site=await load('site-v2'),services=await load('services-content'),routes=await load('routes-content');
function literal(file,name,selector) {
 const s=execFileSync('git',['show',`7564fd3:${file}`],{encoding:'utf8'});const match=s.match(new RegExp(`const ${name} = ([\\s\\S]*?)\\[${selector}\\];`));
 if(!match) throw new Error(`Cannot find ${name} in ${file}`);
 return Function(`return (${match[1]})`)();
}
const companyLabels=literal('src/components/ContentPage.astro','labels','lang');
const entityLabels=literal('src/components/ContentPage.astro','entityLabels','lang');
const hero=literal('src/components/ContentPage.astro','heroImage','pageKey').about;
const routeLabels=literal('src/components/RouteNetworkPage.astro','labels','lang');
const mapPlaces=literal('src/components/CorridorNetworkMap.astro','places','lang');
const facts=parse(fs.readFileSync('src/content/facts.yaml','utf8'));
const baseline={...JSON.parse(fs.readFileSync('src/cms/page-baseline.json','utf8')),services:{},routes:{},company:{}};
for(const lang of ['en','zh','ru']) {
 baseline.services[lang]={page:services.SERVICES_COPY[lang]};
 baseline.routes[lang]={page:routes.ROUTE_NETWORK_COPY[lang],labels:routeLabels[lang],mapPlaces:mapPlaces[lang],heroCaption:'HPF.kz / Eurasian route planning',updateEyebrow:'Human response / exception update',ctaEyebrow:'HPF.kz / route desk'};
 baseline.company[lang]={page:site.PAGE_COPY.about[lang],story:site.COMPANY_STORY[lang],labels:companyLabels[lang],entityLabels:entityLabels[lang],heroAlt:hero.alt[lang],contact:site.CONTACT_COPY[lang],contactLabel:{en:'Contact / freight enquiry',zh:'联系 / 货运需求',ru:'Контакт / запрос перевозки'}[lang],entityFacts:['legal_name','bin','registration_year','founder'].map(id=>{const f=facts.find(x=>x.id===id);return {label:f.labels[lang],value:f.localizedValues?.[lang]??f.value,url:f.url??'',source:f.source,verified:f.verified};})};
}
fs.writeFileSync('src/cms/page-baseline.json',JSON.stringify(baseline,null,2)+'\n');
console.log('Exported 9 page baselines.');
