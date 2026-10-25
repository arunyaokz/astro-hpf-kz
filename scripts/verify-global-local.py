"""Local integration checks; temporarily changes content and always restores it."""
import json,urllib.request,urllib.error,urllib.parse,http.cookiejar,pathlib,re
from html.parser import HTMLParser
BASE='http://127.0.0.1:4321'
auth=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
class Text(HTMLParser):
 def __init__(self):super().__init__();self.skip=0;self.parts=[]
 def handle_starttag(self,t,a):
  if t in ('script','style'):self.skip+=1
 def handle_endtag(self,t):
  if t in ('script','style'):self.skip-=1
 def handle_data(self,d):
  if not self.skip and d.strip():self.parts.append(re.sub(r'\s+',' ',d).strip())
def request(path,body=None,method=None,private=False):
 req=urllib.request.Request(urllib.parse.urljoin(BASE,path),data=json.dumps(body).encode()if body is not None else None,method=method,headers={'Origin':BASE,'X-EmDash-Request':'1','Content-Type':'application/json'})
 try:
  r=(auth if private else urllib.request.build_opener()).open(req);return r.status,r.read().decode(),{k.lower():v for k,v in r.headers.items()}
 except urllib.error.HTTPError as e:return e.code,e.read().decode(),dict(e.headers)
def api(path,body=None,method=None):
 code,text,_=request('/_emdash/api'+path,body,method,True);j=json.loads(text);assert code==200 and j['success'],(code,j);return j['data']
auth.open(BASE+'/_emdash/api/setup/dev-bypass').read()
root=pathlib.Path('ops/production-snapshot/global-before/site')
for snapshot in sorted(root.glob('*.html')):
 path='/' if snapshot.stem=='home' else '/'+snapshot.stem.replace('-','/')+'/'
 code,html,headers=request(path);assert code==200,(path,code,html[:400]);a=Text();a.feed(html);b=Text();b.feed(snapshot.read_text());assert a.parts==b.parts,(path,[(x,y)for x,y in zip(a.parts,b.parts)if x!=y][:5],len(a.parts),len(b.parts));assert 'no-store' in headers.get('cache-control','') or path=='/blog/'
 print('三语原文一致',path)
for collection,locale,field,marker,paths in [
 ('home_pages','zh','page_title','首页草稿验证',['/zh/']),
 ('footer_settings','zh','line','页脚草稿验证',['/zh/','/zh/services/','/zh/about/','/zh/privacy/']),
 ('contact_settings','zh','email','cms-test@example.com',['/','/zh/','/ru/','/about/','/zh/about/','/ru/about/','/privacy/','/zh/privacy/','/ru/privacy/','/blog/'])]:
 item=api('/content/'+collection+'?locale='+locale)['items'][0];id=item['id'];old=item['data'];changed={**old,field:marker}
 if collection=='contact_settings':changed.update({'phone':'+7 700 000 0000','map_url':'https://example.com/office',**{l+'_office':l+' office verification'for l in ['en','zh','ru']}})
 try:
  api(f'/content/{collection}/{id}',{'data':changed},'PUT')
  for path in paths:
   code,html,_=request(path);assert code==200 and marker not in html,(collection,'草稿泄漏',path)
  preview=api(f'/content/{collection}/{id}/preview-url',{})['url'];code,html,_=request(preview);assert code==200 and marker in html,(collection,'预览失败',code,html[:200])
  api(f'/content/{collection}/{id}/publish',{})
  for path in paths:
   code,html,headers=request(path);assert code==200 and marker in html,(collection,'发布未生效',path)
   if collection=='contact_settings':
    assert '+7 700 000 0000' in html and 'https://example.com/office' in html,(path,'电话或地图未同步')
    assert f'"email":"{marker}"' in html,(path,'结构化资料未同步')
    if 'about' in path:assert f'data-contact-email="{marker}"'in html,(path,'表单未同步')
  code,_,_=request(f'/_emdash/api/content/{collection}/{id}',{'data':changed},'PUT');assert code in (401,403)
  if collection in ['footer_settings','contact_settings']:
   code,_,_=request(f'/_emdash/api/content/{collection}/{id}/unpublish',{},'POST',True);assert code in (400,403,409,422),(collection,'允许撤下全站设置',code)
   code,_,_=request(f'/_emdash/api/content/{collection}/{id}',None,'DELETE',True);assert code in (400,403,409,422),(collection,'允许删除全站设置',code)
  bad={**old,'email':'broken'}if collection=='contact_settings'else {**old,'navigation':[{**x,'url':'javascript:alert(1)'}for x in old['navigation']]}if collection=='footer_settings'else None
  if bad:
   api(f'/content/{collection}/{id}',{'data':bad},'PUT');code,_,_=request(f'/_emdash/api/content/{collection}/{id}/publish',{},'POST',True);assert code in (400,403,409,422),(collection,'允许非法字段发布',code)
  print('草稿隔离、签名预览、发布联动、权限及字段校验通过',collection)
 finally:
  api(f'/content/{collection}/{id}',{'data':old},'PUT');api(f'/content/{collection}/{id}/publish',{})
for path in ['/xx/','/zh/unknown/','/xx/privacy/','/blog/unknown/']:
 code,_,_=request(path);assert code==404,(path,code)
print('全部通过；本地原始内容已恢复。')
