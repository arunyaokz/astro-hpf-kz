import ts from 'typescript';

/** Translate visible Lingui text, preserving argument IDs, selectors and format options. */
export function localizeCatalogue(catalogue, words) {
 const message=parts=>parts.map(part=>{
  if(typeof part==='string')return Object.hasOwn(words,part) ? words[part] : part;
  if(!Array.isArray(part))return part;
  if(part.length>=3&&part[2]&&typeof part[2]==='object'&&!Array.isArray(part[2])) {
   const copy=[...part];copy[2]=Object.fromEntries(Object.entries(part[2]).map(([branch,body])=>[branch,message(body)]));return copy;
  }
  return part;
 });
 return Object.fromEntries(Object.entries(catalogue).map(([id,parts])=>[id,message(parts)]));
}

// Only displayed metadata is localized. Stored labels, editor values, field IDs and content stay intact.
const metadataWords={Categories:'分类',Category:'分类',Tags:'标签',Tag:'标签',Name:'名称',Title:'标题',Description:'说明',Author:'作者',Authors:'作者',Avatar:'头像',Biography:'简介',Website:'网站',Email:'邮箱',Image:'图片',Caption:'图片说明',Role:'角色',Default:'默认',General:'常规',Advanced:'高级',SEO:'搜索优化','OG image':'社交分享图片','Meta description':'搜索摘要'};
const helper='__hpfAdminLabel';
export function localizeUiExpressions(code, words) {
 const source=ts.createSourceFile('admin.js',code,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);const edits=[];
 const uiProps=new Set(['children','label','title','placeholder','description','helperText','emptyText','aria-label','aria-description']);
 const metadataObjects=new Set(['tax','taxonomy','taxonomyDef','field','fieldDef','def','config']);
 function displayContext(node){let parent=node.parent;while(parent&&(ts.isBinaryExpression(parent)||ts.isConditionalExpression(parent)||ts.isParenthesizedExpression(parent)))parent=parent.parent;return parent&&ts.isPropertyAssignment(parent)&&uiProps.has(parent.name.text)&&parent.initializer.pos<=node.pos;}
 function visit(node){
  if(ts.isStringLiteral(node)&&ts.isPropertyAssignment(node.parent)&&node.parent.initializer===node&&uiProps.has(node.parent.name.text)){
   const translated=Object.hasOwn(words,node.text)?words[node.text]:undefined;if(translated&&translated!==node.text)edits.push({start:node.getStart(source),end:node.end,text:JSON.stringify(translated)});
  }else if(ts.isPropertyAccessExpression(node)&&['label','labelSingular'].includes(node.name.text)&&ts.isIdentifier(node.expression)&&metadataObjects.has(node.expression.text)&&displayContext(node)){
   edits.push({start:node.getStart(source),end:node.end,text:`${helper}(${node.getText(source)})`});return;
  }else if(ts.isIdentifier(node)&&['plural','singular','collectionLabel'].includes(node.text)&&ts.isPropertyAssignment(node.parent)&&node.parent.initializer===node&&['children','label','title'].includes(node.parent.name.text)){
   edits.push({start:node.getStart(source),end:node.end,text:`${helper}(${node.text})`});
  }
  ts.forEachChild(node,visit);
 }
 visit(source);if(!edits.length)return code;
 let result=code;for(const edit of edits.sort((a,b)=>b.start-a.start))result=result.slice(0,edit.start)+edit.text+result.slice(edit.end);
 if(edits.some(e=>e.text.startsWith(helper+'(')))result=`const __hpfAdminLabels=${JSON.stringify(metadataWords)};function ${helper}(value){return Object.hasOwn(__hpfAdminLabels,value) ? __hpfAdminLabels[value] : value;}\n`+result;
 return result;
}
