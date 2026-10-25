import urllib.request,urllib.error,http.cookiejar,json,uuid
base='http://127.0.0.1:4321';jar=http.cookiejar.CookieJar();auth=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar));anon=urllib.request.build_opener();auth.open(base+'/_emdash/api/setup/dev-bypass').read()
def req(path,body=None,method=None,public=False):
 h={'Origin':base,'X-EmDash-Request':'1','Content-Type':'application/json'}
 try:
  r=(anon if public else auth).open(urllib.request.Request(base+path,headers=h,data=json.dumps(body).encode() if body is not None else None,method=method));return r.status,r.read().decode()
 except urllib.error.HTTPError as e:return e.code,e.read().decode()
slug='cms-check-'+uuid.uuid4().hex[:8]
body={'slug':slug,'locale':'zh','status':'draft','data':{'title':'本地新闻流程验证','description':'此内容仅用于本地测试，不会发布到官网。','content':[{'_type':'block','_key':'p1','style':'normal','markDefs':[],'children':[{'_type':'span','_key':'s1','text':'验证中文富文本内容。','marks':[]}]}],'category':'公司动态','verification_status':'公司一手信息','native_reviewed':True}}
code,s=req('/_emdash/api/content/news',body);print('创建草稿',code,s[:230]);assert code==201 or code==200
obj=json.loads(s)['data'];item=obj.get('item',obj);id=item['id']
try:
 code,s=req('/zh/news/'+slug+'/',public=True);print('草稿匿名不可见',code);assert code==404
 code,s=req('/_emdash/api/content/news/'+id+'/publish',{});print('发布',code,s[:100]);assert code==200
 code,s=req('/zh/news/'+slug+'/',public=True);print('发布后详情',code);assert code==200 and '验证中文富文本内容' in s
 code,s=req('/zh/news/',public=True);print('中文列表',code);assert code==200 and '本地新闻流程验证' in s
 code,s=req('/news/',public=True);print('英语列表隔离',code);assert code==200 and '本地新闻流程验证' not in s
 code,s=req('/news/'+slug+'/',public=True);print('英语详情隔离',code);assert code==404
 code,s=req('/_emdash/api/content/news/'+id+'/unpublish',{});print('撤回',code);assert code==200
 code,s=req('/zh/news/'+slug+'/',public=True);print('撤回后匿名不可见',code);assert code==404
 code,s=req('/_emdash/api/content/news',body,public=True);print('匿名写入拒绝',code);assert code in (401,403)
finally:
 print('清理',req('/_emdash/api/content/news/'+id,method='DELETE')[0])
print('全部流程通过')
