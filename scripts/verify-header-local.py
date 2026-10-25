"""Local navigation integration checks. All temporary content changes are restored."""
import json,urllib.request,urllib.error,urllib.parse,http.cookiejar,pathlib,re,html
from html.parser import HTMLParser
BASE='http://127.0.0.1:4321'
auth=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
def request(path,body=None,method=None,private=False):
 req=urllib.request.Request(urllib.parse.urljoin(BASE,path),data=json.dumps(body).encode()if body is not None else None,method=method,headers={'Origin':BASE,'X-EmDash-Request':'1','Content-Type':'application/json'})
 try:
  r=(auth if private else urllib.request.build_opener()).open(req,timeout=90);return r.status,r.read().decode()
 except urllib.error.HTTPError as e:return e.code,e.read().decode()
def api(path,body=None,method=None):
 code,text=request('/_emdash/api'+path,body,method,True);j=json.loads(text);assert code in (200,201) and j['success'],(code,j);return j['data']
class Text(HTMLParser):
 def __init__(self):super().__init__();self.skip=0;self.parts=[]
 def handle_starttag(self,t,a):
  if t in ('script','style'):self.skip+=1
 def handle_endtag(self,t):
  if t in ('script','style'):self.skip-=1
 def handle_data(self,d):
  if not self.skip and d.strip():self.parts.append(re.sub(r'\s+',' ',d).strip())
def links(source):
 return [(html.unescape(re.search(r'href="([^"]*)"',a).group(1)),html.unescape(re.sub('<[^>]+>','',b)).strip(),bool(re.search('aria-current="page"',a)))for a,b in re.findall(r'<a\b([^>]*)>(.*?)</a>',source,re.S)]
def navigation(source):
 desktop=re.search(r'<div class="desktop-links"[^>]*>(.*?)</div>',source,re.S).group(1)
 mobile=re.search(r'<dialog\b.*?<nav\b[^>]*>(.*?)</nav>',source,re.S).group(1)
 d=links(desktop);m=links(mobile);return d,[(u,re.sub(r'^\d+\s*','',t),a)for u,t,a in m]
auth.open(BASE+'/_emdash/api/setup/dev-bypass').read()
root=pathlib.Path('ops/production-snapshot/header-before/site');snapshots=list(root.glob('*.html'));assert len(snapshots)==16
for snapshot in snapshots:
 path='/'if snapshot.stem=='home'else '/'+snapshot.stem.replace('-','/')+'/'
 code,source=request(path);assert code==200,(path,code,source[:200]);a=Text();a.feed(source);b=Text();b.feed(snapshot.read_text());assert a.parts==b.parts,(path,'原导航或正文变化');d,m=navigation(source);assert d==m,(path,d,m)
print('16个页面原文一致，桌面与手机导航一致')
for locale in ['zh','en','ru']:
 item=next(x for x in api('/content/header_settings?locale='+locale)['items']if x['slug']=='header');id=item['id'];old=item['data'];prefix=''if locale=='en'else '/'+locale;marker='导航验证-'+locale
 changed={**old,'navigation':[{**old['navigation'][3],'label':marker},*old['navigation'][:3],{'label':'Privacy test','url':prefix+'/privacy/'}],'cta_label':'询价验证-'+locale,'cta_url':prefix+'/services/'}
 try:
  api('/content/header_settings/'+id,{'data':changed},'PUT')
  assert marker not in request(prefix+'/')[1],('草稿泄漏',locale)
  preview=api('/content/header_settings/'+id+'/preview-url',{})['url'];assert marker in request(preview)[1],('签名预览失败',locale)
  api('/content/header_settings/'+id+'/publish',{})
  for page in ['/','/services/','/routes/','/about/','/privacy/','/news/']:
   path=prefix+page;code,source=request(path);assert code==200 and marker in source,(path,code)
   d,m=navigation(source);assert d==m,(path,'双端不一致');assert[(u,t)for u,t,_ in d]==[(x['url'],x['label'])for x in changed['navigation']],(path,'顺序或链接错误')
   assert source.count(changed['cta_label'])==2,(path,'询价按钮未同步')
   active=[u for u,_,selected in d if selected];expected=[prefix+page]if page in ['/services/','/routes/','/about/','/privacy/','/news/']else[];assert active==expected,(path,'高亮错误',active,expected)
  for other in ['en','zh','ru']:
   if other!=locale:assert marker not in request('/'if other=='en'else '/'+other+'/')[1],('语言串用',locale,other)
  code,_=request('/_emdash/api/content/header_settings/'+id,{'data':old},'PUT');assert code in (401,403)
  for action,method in [('/unpublish','POST'),('','DELETE')]:
   code,_=request('/_emdash/api/content/header_settings/'+id+action,{}if action else None,method,True);assert code in (400,403,409,422),(action,code)
  for bad in [{**old,'cta_url':'javascript:alert(1)'},{**old,'navigation':[old['navigation'][0],old['navigation'][0]]},{**old,'navigation':[]},{**old,'navigation':[{'label':'','url':'/'}]}]:
   code,_=request('/_emdash/api/content/header_settings/'+id,{'data':bad},'PUT',True)
   if code==200:
    code,_=request('/_emdash/api/content/header_settings/'+id+'/publish',{},'POST',True);assert code in (400,403,409,422),('无效导航允许发布',locale,code)
   else:assert code in (400,422)
  print('草稿、签名预览、发布、排序增项、双端联动、高亮、语言隔离、权限与错误拦截通过',locale)
 finally:
  api('/content/header_settings/'+id,{'data':old},'PUT');api('/content/header_settings/'+id+'/publish',{})
print('全部通过，三语原导航已恢复')
