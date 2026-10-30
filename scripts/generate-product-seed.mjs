import fs from 'node:fs';
import { productCollection } from '../src/cms/product-model.mjs';
// 只建「运输产品」结构，不写任何产品条目：产品内容来自 Horiza 同步或后台人工录入，不能虚构。
const collection=productCollection();
fs.writeFileSync('src/cms/product-import.json',JSON.stringify({collections:[collection],content:{}},null,2)+'\n');
const seed=JSON.parse(fs.readFileSync('.emdash/seed.json'));
seed.collections=seed.collections.filter(c=>c.slug!==collection.slug).concat(collection);
fs.writeFileSync('.emdash/seed.json',JSON.stringify(seed,null,2)+'\n');
console.log({collection:collection.slug,fields:collection.fields.length});
