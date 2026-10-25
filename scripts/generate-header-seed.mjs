import fs from 'node:fs';
import { corporateSeed, encodePage } from '../src/cms/page-model.mjs';
// Frozen original three-language navigation; existing CMS entries are never overwritten.
const collection=corporateSeed().find(c=>c.slug==='header_settings');
const entries=['en','zh','ru'].map(locale=>({id:`header-${locale}`,slug:'header',locale,status:'published',...(locale!=='en'?{translationOf:'header-en'}:{}),data:encodePage('header',locale)}));
const data={collections:[collection],content:{header_settings:entries}};
fs.writeFileSync('src/cms/header-import.json',JSON.stringify(data,null,2)+'\n');
const seed=JSON.parse(fs.readFileSync('.emdash/seed.json'));
seed.collections=seed.collections.filter(c=>c.slug!=='header_settings').concat(collection);
seed.content.header_settings=entries;
fs.writeFileSync('.emdash/seed.json',JSON.stringify(seed,null,2)+'\n');
console.log({collection:collection.slug,fields:collection.fields.length,entries:entries.length});
