import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import chineseUI from '../src/cms/chinese-ui.mjs';
import {localizeCatalogue,localizeUiExpressions} from '../src/cms/localize-admin.mjs';
const root='node_modules/@emdash-cms/admin/dist';
const technical=new Set(['Twitter','Astro','TypeScript','MDX','Ruby','XML','YouTube','JSON','Instagram','PDF','Swift','Bash','Facebook','HTML','URL','you@company.com','Vue','xxxx xxxx xxxx xxxx xxxx xxxx','GitHub','Rust','CSS','TOML','PHP','<count>','EmDash ','Diff','Java','Yoast/RankMath','GraphQL','test@example.com','YAML','JSX','https://example.com','JavaScript','TSX','SBOM· ','SBOM· ','SQL','you@example.com','https://example.com/image.jpg','https://yoursite.com','example.com','Kotlin','Markdown','SCSS','Dockerfile','<rewrittenCount>','<contentCount>','robots.txt','https://example.com/blog/my-post','Lua','Esc','Python']);
function catalogue(code){const sf=ts.createSourceFile('catalogue.js',code,ts.ScriptTarget.Latest,true);for(const s of sf.statements)if(ts.isVariableStatement(s))for(const d of s.declarationList.declarations)if(d.name.getText(sf)==='messages')return Function('return ('+d.initializer.getText(sf)+')')();throw Error('Chinese catalogue not found');}
function structure(parts){return parts.map(x=>{if(typeof x==='string')return x==='#'?'#':null;if(Array.isArray(x)&&x[2]&&typeof x[2]==='object'){const t=[...x];t[2]=Object.fromEntries(Object.entries(x[2]).map(([k,v])=>[k,structure(v)]));return t;}return x}).filter(x=>x!==null);}
function visible(parts){return parts.flatMap(x=>typeof x==='string'?[x]:Array.isArray(x)&&x[2]&&typeof x[2]==='object'?Object.values(x[2]).flatMap(visible):[]);}
let total=0;const residual=new Set();
for(const file of fs.readdirSync(root).filter(x=>/^messages-.*\.js$/.test(x))){const code=fs.readFileSync(root+'/'+file,'utf8');if(!code.includes('src/locales/zh-CN/messages.mjs'))continue;const before=catalogue(code),after=catalogue(chineseUI().transform(code,'/'+root+'/'+file).code);assert.deepEqual(Object.keys(after),Object.keys(before));
 for(const [id,parts]of Object.entries(before)){assert.deepEqual(structure(after[id]),structure(parts),'Variables or selectors changed: '+id);const beforeTags=visible(parts).join('').match(/<\/?[a-zA-Z0-9]+>/g)??[];const afterTags=visible(after[id]).join('').match(/<\/?[a-zA-Z0-9]+>/g)??[];assert.deepEqual(afterTags,beforeTags,'Markup changed: '+id);for(const text of visible(after[id]))if(/[A-Za-z]{3}/.test(text)&&!/[\u3400-\u9fff]/.test(text)&&!technical.has(text))residual.add(text);}
 total=Object.keys(after).length;
}
assert.equal(total,3512,'Installed EmDash catalogue changed; review the localization patch');assert.deepEqual([...residual],[],'Untranslated admin UI strings remain');
const fixture={example:['Move ',['name'],' later ',['count','plural',{one:['#',' item'],other:['#',' items']}]]};
const translated=localizeCatalogue(fixture,{name:'名称',count:'数量',one:'一个',other:'其他','Move ':'移动 ',' later ':' 后移 ',' item':' 个条目',' items':' 个条目'});assert.deepEqual(structure(translated.example),structure(fixture.example));assert.equal(translated.example[1][0],'name');
const code='const initial=field.label;const form={value:field.label,fieldId:"title",children:tax.label};const content={children:entry.data.title};const button={children:"Cancel"};';const localized=localizeUiExpressions(code,{Cancel:'取消'});assert(localized.includes('initial=field.label'));assert(localized.includes('value:field.label'));assert(localized.includes('fieldId:"title"'));assert(localized.includes('children:entry.data.title'));assert(localized.includes('children:__hpfAdminLabel(tax.label)'));assert(localized.includes('children:"取消"'));
const prototypeFixture=localizeCatalogue({a:['constructor','toString']},{});assert.deepEqual(prototypeFixture.a,['constructor','toString']);
const switchCode='const v = typeof s == "string" ? s : "Switch";const props={"data-kumo-component":"Switch"};';const switched=chineseUI().transform(switchCode,'/node_modules/@cloudflare/kumo/dist/chunks/switch-test.js').code;assert(switched.includes('? s : "开关"'));assert(switched.includes('"data-kumo-component":"Switch"'),'Component identifiers must stay intact');
const queried=chineseUI().transform('const view={children:"Cancel"};','/node_modules/@emdash-cms/admin/dist/index.js?v=123');assert(queried?.code.includes('取消'),'Dev query URLs must be translated');
assert.equal(chineseUI().transform('const text="Publish";','/src/content/user-document.js'),undefined,'Business content must not be translated');
console.log(JSON.stringify({messages:total,untranslated_ui_strings:residual.size,icu_arguments:'preserved',plural_branches:'preserved',markup:'preserved',stored_metadata_and_business_content:'untouched'},null,2));
