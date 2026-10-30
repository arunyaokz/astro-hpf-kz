// 运输与海关服务产品（`products`），2026-10-30 起在官网后台人工维护。
// title 到 pricing_method 沿用 Horiza EmDash 同步约定的字段名（gatekeeper-horiza src/emdash-site-sync.ts），
// 以后若重新接外部同步不必改结构；字段名不要改。
export const PRODUCT_COLLECTION = 'products';
export const PRODUCT_CATEGORIES = ['跨境运输', '危险品运输', '冷链运输', '海关服务'];
export const PRODUCT_FIELDS = [
 {slug:'title',label:'产品名称',type:'string',required:true,searchable:true},
 {slug:'summary',label:'产品简介',type:'text',searchable:true},
 {slug:'price_minor',label:'价格（最小货币单位，如 120000 = 1,200.00；留空显示「按需报价」）',type:'string',validation:{pattern:'^[0-9]{0,12}$'}},
 {slug:'currency',label:'币种（如 USD、KZT、CNY）',type:'string',validation:{pattern:'^([A-Z]{3})?$'}},
 {slug:'sku_id',label:'产品编号（可留空）',type:'string'},
 {slug:'revision_ref',label:'外部同步版本（留空）',type:'string'},
 {slug:'revision_hash',label:'外部同步指纹（留空）',type:'string'},
 {slug:'pricing_mode',label:'询价标记（填 quote 则一律显示「按需报价」，可留空）',type:'string'},
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
 return {slug:PRODUCT_COLLECTION,label:'运输产品',labelSingular:'运输产品',description:'运输与海关服务产品，在这里人工维护。先建英文版再加中文、俄文翻译；不填价格就显示「按需报价」。俄语须经母语者校对。',icon:'truck',supports:['drafts','revisions','preview','scheduling','search','seo'],urlPattern:'/products/{slug}/',titleField:'title',fields:PRODUCT_FIELDS};
}
