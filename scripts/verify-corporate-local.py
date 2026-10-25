import json,urllib.parse,urllib.request,urllib.error,http.cookiejar,pathlib,re
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
 h={'Origin':BASE,'X-EmDash-Request':'1','Content-Type':'application/json'}
 try:
  r=(auth if private else urllib.request).open(urllib.request.Request(BASE+path,data=json.dumps(body).encode() if body is not None else None,method=method,headers=h)) if private else urllib.request.urlopen(urllib.request.Request(BASE+path,data=json.dumps(body).encode() if body is not None else None,method=method,headers=h))
  return r.status,r.read().decode()
 except urllib.error.HTTPError as e:return e.code,e.read().decode()
auth.open(BASE+'/_emdash/api/setup/dev-bypass').read()
seed=json.loads(pathlib.Path('src/cms/corporate-import.json').read_text())
for c in seed['collections']:
 for entry in seed['content'][c['slug']]:
  lang=entry['locale'];path=('' if lang=='en' else '/'+lang)+'/'+entry['slug']+'/'
  code,html=request(path);assert code==200,(path,code,html[:500]);a=Text();a.feed(html)
  snapshot=pathlib.Path('ops/production-snapshot/corporate-before/site')/(path.strip('/')+'.html')
  if snapshot.exists():
   b=Text();b.feed(snapshot.read_text());assert a.parts==b.parts,(path,'migration text differs')
  print('页面与现状一致',path)
 # Test each page type: published content must survive saving a new draft.
 entry=seed['content'][c['slug']][0];slug=entry['slug'];path='/'+slug+'/'
 code,s=request('/_emdash/api/content/'+c['slug']+'?locale=en',private=True);obj=json.loads(s)['data']['items'];item=next(x for x in obj if x['slug']==slug);id=item['id'];data=entry['data'];changed={**data,'page_title':'CMS local draft check '+slug}
 try:
  code,s=request('/_emdash/api/content/'+c['slug']+'/'+id,{'data':changed},method='PUT',private=True);assert code==200,s
  code,s=request(path);assert code==200 and 'CMS local draft check' not in s
  code,s=request('/_emdash/api/content/'+c['slug']+'/'+id+'/preview-url',{},private=True);assert code==200,s
  url=json.loads(s)['data']['url'];preview=urllib.request.urlopen(urllib.parse.urljoin(BASE,url)).read().decode();assert 'CMS local draft check' in preview,(slug,'preview missing draft')
  code,s=request('/_emdash/api/content/'+c['slug']+'/'+id+'/publish',{},private=True);assert code==200,s
  code,s=request(path);assert code==200 and 'CMS local draft check' in s
  code,s=request('/_emdash/api/content/'+c['slug']+'/'+id,{'data':changed},method='PUT');assert code in (401,403),s
  if c['slug']=='route_pages':
   malformed=json.loads(json.dumps(data));malformed['page_corridors'][1]['id']=malformed['page_corridors'][0]['id']
   code,s=request('/_emdash/api/content/'+c['slug']+'/'+id,{'data':malformed},method='PUT',private=True);assert code==200,s
   code,s=request('/_emdash/api/content/'+c['slug']+'/'+id+'/publish',{},private=True);assert code in (400,403,409,422) and '页面条目类型不能重复' in s,s
   print('重复路线类型已在发布前拦截')
  print('草稿隔离、预览、发布与匿名写入保护通过',slug)
 finally:
  code,s=request('/_emdash/api/content/'+c['slug']+'/'+id,{'data':data},method='PUT',private=True);assert code==200,s
  code,s=request('/_emdash/api/content/'+c['slug']+'/'+id+'/publish',{},private=True);assert code==200,s
print('全部通过；本地原始页面内容已恢复。')
