import baseline from './page-baseline.json' with { type: 'json' };
export { baseline };
export const PAGE_COLLECTIONS={services:'service_pages',routes:'route_pages',company:'company_pages'};
export const PAGE_SLUGS={services:'services',routes:'routes',company:'about'};
const LABELS={page:'页面内容',metaTitle:'搜索标题',metaDescription:'搜索摘要',eyebrow:'栏目说明',title:'标题',lead:'简介',primary:'主按钮文字',secondary:'次按钮文字',imageAlt:'图片说明',imageCaption:'图片注释',indexLabel:'服务导航标题',introEyebrow:'做法栏目说明',introTitle:'做法标题',introText:'做法介绍',principles:'服务原则',text:'正文',servicesEyebrow:'服务栏目说明',servicesTitle:'服务标题',servicesLead:'服务简介',labels:'界面文字',fit:'适用场景',work:'工作内容',outputs:'交付物',value:'客户价值',input:'输入',result:'结果',response:'响应',services:'服务项目',id:'项目类型',number:'序号',kicker:'副标题',summary:'概述',sequenceEyebrow:'流程栏目说明',sequenceTitle:'流程标题',sequenceLead:'流程简介',sequence:'服务流程',step:'步骤编号',exceptionEyebrow:'异常栏目说明',exceptionTitle:'异常标题',exceptionLead:'异常简介',exceptions:'异常处理',issue:'问题',update:'跟进说明',boundaryEyebrow:'承诺栏目说明',boundaryTitle:'承诺标题',boundaryLead:'承诺简介',boundaryDoTitle:'承诺清单标题',boundaryDo:'承诺清单',boundaryDontTitle:'边界清单标题',boundaryDont:'边界清单',briefEyebrow:'询价栏目说明',briefTitle:'询价标题',briefText:'询价说明',briefFields:'询价清单',briefNote:'询价提示',ctaButton:'联系按钮文字',heroNotes:'首屏要点',label:'名称',atlasEyebrow:'地图栏目说明',atlasTitle:'地图标题',atlasLead:'地图简介',atlasNote:'地图提示',detailEyebrow:'路线栏目说明',detailTitle:'路线标题',detailLead:'路线简介',corridors:'路线走廊',index:'编号',name:'名称',strap:'路线特点',route:'途经节点',bestForLabel:'适用场景标签',bestFor:'适用场景',modeLabel:'运输方式标签',mode:'运输方式',watchLabel:'风险提示标签',watch:'风险提示',switchLabel:'切换条件标签',switchWhen:'切换条件',serviceEyebrow:'服务阶段说明',serviceTitle:'服务阶段标题',serviceLead:'服务阶段简介',serviceSteps:'服务阶段',phase:'阶段',updateTitle:'异常更新标题',updateText:'异常更新说明',updateItems:'更新内容清单',switchEyebrow:'主备切换说明',switchTitle:'主备切换标题',switchText:'主备切换正文',switchTriggers:'切换触发条件',requestEyebrow:'询价栏目说明',requestTitle:'询价标题',requestText:'询价正文',requestItems:'询价要素',promiseTitle:'服务承诺标题',promiseText:'服务承诺正文',scene:'图片说明',output:'交付物标签',triggers:'复核条件标题',checklist:'询价清单标题',mapPlaces:'地图地名',europe:'欧洲',china:'中国',kz:'哈萨克斯坦',north:'北线节点',middle:'中线节点',south:'南线节点',heroCaption:'首屏图片注释',updateEyebrow:'异常更新栏目说明',ctaEyebrow:'联系栏目说明',sectionTitle:'内容区标题',sectionLead:'内容区简介',sections:'价值观与经营原则',points:'具体做法',processTitle:'工作流程标题',process:'工作流程',ctaTitle:'联系标题',ctaText:'联系说明',story:'使命愿景',compassEyebrow:'使命栏目说明',compassTitle:'使命标题',compassLead:'使命简介',pillars:'使命愿景条目',valuesEyebrow:'价值观栏目说明',valuesTitle:'价值观标题',do:'承诺标签',dont:'边界标签',image:'图片注释',scope:'范围标签',boundary:'边界标签',entityLabels:'法人资料说明',note:'来源说明',heroAlt:'首屏图片说明',contact:'联系表单',fields:'表单文字',company:'公司',email:'邮箱',phone:'电话',cargo:'货物',origin:'出发地',destination:'目的地',window:'期望时间',message:'补充说明',consent:'隐私同意提示',submit:'提交按钮',required:'必填提示',asideTitle:'联系侧栏标题',asideText:'联系侧栏正文',emailLabel:'邮箱标签',responseNote:'响应说明',contactLabel:'联系栏目说明',contactEmail:'业务邮箱',entityFacts:'法人登记资料',url:'证明链接',source:'信息来源',verified:'已核验'};
export const keyOf=path=>path.replace(/([a-z0-9])([A-Z])/g,'$1_$2').replaceAll('.','_').toLowerCase();
const titleOf=path=>path.split('.').map(k=>{if(!LABELS[k])throw new Error('Missing Chinese label: '+k);return LABELS[k]}).join('｜');
const ID_LABELS={customs:'清关服务',transport:'跨境运输',multimodal:'多式联运',warehouse:'仓储服务',delivery:'本地交付','market-entry':'市场落地',north:'北线',middle:'中线',south:'南线'};
const fromID=value=>Object.entries(ID_LABELS).find(([,label])=>label===value)?.[0];
function visit(tree,fn,path='') {for(const[k,v]of Object.entries(tree)){const p=path?`${path}.${k}`:k;if(v&&typeof v==='object'&&!Array.isArray(v))visit(v,fn,p);else fn(p,v)}}
export function corporateFields(kind) {
 const fields=[];
 visit(baseline[kind].zh,(path,v)=>{
  const f={slug:keyOf(path),label:titleOf(path),required:true};
  if(Array.isArray(v)&&typeof v[0]==='object') {
   f.type='repeater';f.validation={minItems:v.length,maxItems:v.length,subFields:Object.entries(v[0]).map(([k,x])=>({slug:keyOf(k),label:LABELS[k]+(Array.isArray(x)?'（每行一项）':''),type:k==='id'?'select':Array.isArray(x)||typeof x==='string'?'text':'boolean',required:k!=='url',...(k==='id'?{options:v.map(x=>ID_LABELS[x.id])}:{})}))};
  } else if(Array.isArray(v)){f.type='text';f.label+='（每行一项）'}
  else {f.type=typeof v==='boolean'?'boolean':'text';if(path==='contactEmail'){f.type='string';f.validation={pattern:'^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'}}}
  fields.push(f);
 });
 fields.push({slug:'hero_image',label:'首屏图片（留空使用现有图片）',type:'image'});
 return fields;
}
export function encodePage(kind,lang) {
 const data={};visit(baseline[kind][lang],(path,v)=>{
  data[keyOf(path)]=Array.isArray(v)?(typeof v[0]==='object'?v.map(item=>Object.fromEntries(Object.entries(item).map(([k,x])=>[keyOf(k),k==='id'?ID_LABELS[x]:Array.isArray(x)?x.join('\n'):x]))):v.join('\n')):v;
 });return data;
}
export function decodePage(kind,lang,data) {
 function decode(template,path='') {
  const result={};for(const[k,v]of Object.entries(template)){
   const p=path?`${path}.${k}`:k;const value=data[keyOf(p)];
   if(v&&typeof v==='object'&&!Array.isArray(v)){result[k]=decode(v,p);continue}
   if(Array.isArray(v)&&typeof v[0]==='object'){
    if(!Array.isArray(value)||value.length!==v.length)throw new Error('页面条目数量无效：'+titleOf(p));
    result[k]=value.map(item=>Object.fromEntries(Object.entries(v[0]).map(([child,t])=>{
     const raw=item[keyOf(child)];
     if(child==='id'){const id=fromID(raw);if(!v.some(x=>x.id===id))throw new Error('页面条目类型无效');return[child,id]}
     if(Array.isArray(t)){if(typeof raw!=='string')throw new Error('页面清单无效');return[child,raw.split(/\r?\n/).filter(x=>x.trim())]}
     if(child==='url'&&raw==null)return[child,''];
     if(typeof raw!==typeof t)throw new Error('页面字段无效：'+LABELS[child]);return[child,raw];
    })));
    if('id' in v[0]&&new Set(result[k].map(x=>x.id)).size!==v.length)throw new Error('页面条目类型不能重复');
   }else if(Array.isArray(v)){if(typeof value!=='string')throw new Error('页面清单无效');result[k]=value.split(/\r?\n/).filter(x=>x.trim())}
   else {if(typeof value!==typeof v)throw new Error('页面字段缺失：'+titleOf(p));result[k]=value}
  }return result;
 }
 return {...decode(baseline[kind][lang]),heroImage:data.hero_image};
}
export function corporateSeed() {
 const labels={services:'服务介绍',routes:'路线网络',company:'公司介绍'};
 return Object.keys(PAGE_COLLECTIONS).map((kind,index)=>({slug:PAGE_COLLECTIONS[kind],label:labels[kind],labelSingular:labels[kind],description:'编辑现有三语页面。保存草稿不会修改线上；发布后生效。列表每行一项，条目数量保持原版式。',supports:['drafts','revisions','preview','scheduling','seo'],urlPattern:`/${PAGE_SLUGS[kind]}/`,titleField:'page_title',sortOrder:index+1,fields:corporateFields(kind)}));
}
