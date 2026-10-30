// 运输与海关服务产品（`products`）。title 到 pricing_method 是 Horiza EmDash 同步约定的字段
// （gatekeeper-horiza src/emdash-site-sync.ts：7 个基础字段 + 询价标记 + 4 个服务资料字段），字段名不能改；其余字段由官网自己维护。
export const PRODUCT_COLLECTION = 'products';
export const PRODUCT_CATEGORIES = ['跨境运输', '危险品运输', '冷链运输', '海关服务'];
export const PRODUCT_FIELDS = [
 {slug:'title',label:'产品名称',type:'string',required:true,searchable:true},
 {slug:'summary',label:'产品简介',type:'text',searchable:true},
 {slug:'price_minor',label:'价格（最小货币单位，如 120000 = 1,200.00；留空显示「按需报价」）',type:'string',validation:{pattern:'^[0-9]{0,12}$'}},
 {slug:'currency',label:'币种（如 USD、KZT、CNY）',type:'string',validation:{pattern:'^([A-Z]{3})?$'}},
 {slug:'sku_id',label:'产品编号（Horiza 同步，勿改）',type:'string'},
 {slug:'revision_ref',label:'产品版本（Horiza 同步，勿改）',type:'string'},
 {slug:'revision_hash',label:'版本指纹（Horiza 同步，勿改）',type:'string'},
 {slug:'pricing_mode',label:'询价标记（Horiza 同步，quote = 按需报价）',type:'string'},
 {slug:'service_scope',label:'服务范围',type:'text'},
 {slug:'service_area',label:'服务区域 / 线路（如 中国 → 欧洲）',type:'text'},
 {slug:'service_lead_time',label:'时效',type:'text'},
 {slug:'pricing_method',label:'计价方式',type:'text'},
 {slug:'category',label:'产品分类',type:'select',defaultValue:'跨境运输',validation:{options:PRODUCT_CATEGORIES}},
 {slug:'highlights',label:'服务要点（每行一项）',type:'text'},
 {slug:'hero_image',label:'产品图片',type:'image'},
 {slug:'native_reviewed',label:'译文已由母语者校对',type:'boolean',defaultValue:false},
];
export function productCollection() {
 return {slug:PRODUCT_COLLECTION,label:'运输产品',labelSingular:'运输产品',description:'运输与海关服务产品。由 Horiza 同步的条目只改图片、分类和服务要点；名称、简介、价格和服务资料请在 Horiza 改，否则下次同步会被覆盖。俄语须经母语者校对。',icon:'truck',supports:['drafts','revisions','preview','scheduling','search','seo'],urlPattern:'/products/{slug}/',titleField:'title',fields:PRODUCT_FIELDS};
}
