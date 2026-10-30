"""Local checks for the products collection. Creates the schema additively; test entries are deleted at the end."""
import urllib.request,urllib.error,http.cookiejar,json,uuid,pathlib,re
base='http://localhost:4321';jar=http.cookiejar.CookieJar();auth=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar));anon=urllib.request.build_opener();auth.open(base+'/_emdash/api/setup/dev-bypass').read()
def req(path,body=None,method=None,public=False):
 h={'Origin':base,'X-EmDash-Request':'1','Content-Type':'application/json'}
 try:
  r=(anon if public else auth).open(urllib.request.Request(base+path,headers=h,data=json.dumps(body).encode() if body is not None else None,method=method),timeout=90);return r.status,r.read().decode()
 except urllib.error.HTTPError as e:return e.code,e.read().decode()
def api(path,body=None,method=None):
 code,s=req('/_emdash/api'+path,body,method);j=json.loads(s);assert code in (200,201) and j['success'],(path,code,s[:300]);return j['data']
# 1. 结构：与生产迁移相同的增量步骤（只新增，不改已有字段）
collection=json.loads(pathlib.Path('src/cms/product-import.json').read_text())['collections'][0]
if not any(c['slug']=='products' for c in api('/schema/collections')['items']):
 api('/schema/collections',{**{k:v for k,v in collection.items() if k not in ('fields','titleField')},'source':'manual','admin':{'quickCreate':False}},'POST')
have={f['slug']:f for f in api('/schema/collections/products/fields')['items']}
for order,field in enumerate(collection['fields']):
 if field['slug'] in have:assert have[field['slug']]['type']==field['type'],('字段类型不一致',field['slug']);continue
 api('/schema/collections/products/fields',{**field,'sortOrder':order},'POST')
api('/schema/collections/products',{'titleField':'title','admin':{'quickCreate':False}},'PUT')
print('运输产品结构就绪',len(collection['fields']),'个字段')
# 2. 内容流程（测试条目，结束即删）
slug='product-check-'+uuid.uuid4().hex[:8];ids=[]
def create(locale,data,status,translation=None):
 body={'slug':slug,'locale':locale,'status':'draft','data':data,**({'translationOf':translation} if translation else {})}
 obj=api('/content/products',body,'POST');item=obj.get('item',obj);ids.append(item['id'])
 if status=='published':api('/content/products/'+item['id']+'/publish',{},'POST')
 return item['id']
try:
 en=create('en',{'title':'Local check: TIR China to Europe','summary':'Test entry for local verification only.','price_minor':'','currency':'','sku_id':'CHECK-1','revision_ref':'rev-1','revision_hash':'hash-1','pricing_mode':'quote','service_scope':'Test scope','service_area':'China → Europe','service_lead_time':'Test lead time','pricing_method':'Test pricing','category':'跨境运输','highlights':'Line one\nLine two'},'published')
 create('zh',{'title':'本地验证：中国至欧洲 TIR','summary':'仅用于本地测试。','category':'跨境运输','service_area':'中国 → 欧洲'},'published',en)
 create('ru',{'title':'Проверка: TIR Китай — Европа','summary':'Тестовая запись.'},'draft',en)
 code,s=req('/products/',public=True);assert code==200 and 'Local check: TIR China to Europe' in s and 'Quote on request' in s,('英文列表',code)
 assert '/about/?product=Local%20check' in s,'询价链接未带产品名'
 assert '本地验证' not in s,'语言串用'
 code,s=req('/zh/products/',public=True);assert code==200 and '本地验证：中国至欧洲 TIR' in s and '按需报价' in s,('中文列表',code)
 code,s=req('/ru/products/',public=True);assert code==200 and 'Проверка' not in s,'俄文草稿泄漏'
 code,s=req('/ru/products/'+slug+'/',public=True);assert code==404,('俄文草稿详情',code)
 code,s=req('/products/'+slug+'/',public=True);assert code==200 and 'Line two' in s and 'China → Europe' in s and 'Test lead time' in s,('英文详情',code)
 code,s=req('/zh/products/'+slug+'/',public=True);assert code==200 and '中国 → 欧洲' in s,('中文详情',code)
 print('三语列表、详情、草稿隔离、按需报价、询价链接通过')
 api('/content/products/'+en,{'data':{'price_minor':'120000','currency':'USD','pricing_mode':''}},'PUT');api('/content/products/'+en+'/publish',{},'POST')
 code,s=req('/products/'+slug+'/',public=True);assert code==200 and re.search(r'(US)?\$1,200\.00',s),('价格显示',code)
 code,s=req('/_emdash/api/content/products',{'slug':'anon','locale':'en','data':{'title':'x'}},'POST',True);assert code in (401,403),('匿名写入',code)
 print('价格显示、匿名写入拒绝通过（联系表单预填在浏览器里验）')
finally:
 for id in reversed(ids):print('清理',id,req('/_emdash/api/content/products/'+id,method='DELETE')[0])
print('全部通过')
