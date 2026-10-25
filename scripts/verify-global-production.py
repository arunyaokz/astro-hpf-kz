import json,re,subprocess,concurrent.futures,pathlib,sys
from html.parser import HTMLParser
ROOT=pathlib.Path(__file__).resolve().parents[1]
class Text(HTMLParser):
 def __init__(self):super().__init__();self.skip=0;self.parts=[]
 def handle_starttag(self,t,a):
  if t in ('script','style'):self.skip+=1
 def handle_endtag(self,t):
  if t in ('script','style'):self.skip-=1
 def handle_data(self,d):
  if not self.skip and d.strip():self.parts.append(re.sub(r'\s+',' ',d).strip())
snapshots=ROOT/'ops/production-snapshot/global-before/site'
paths=['/' if p.stem=='home' else '/'+p.stem.replace('-','/')+'/' for p in sorted(snapshots.glob('*.html'))]
assert len(paths)==16,'需要迁移前16页快照，不能跳过正文对比'
out=ROOT/'ops/production-snapshot/global-after/site';out.mkdir(parents=True,exist_ok=True)
def check(path):
 p=out/((path.strip('/').replace('/','-')or'home')+'.html');p.parent.mkdir(parents=True,exist_ok=True);h=p.with_suffix('.headers')
 r=subprocess.run(['curl','-sS','-L','--retry','2','--max-time','45','-D',str(h),'-o',str(p),'-w','%{http_code}','https://hpf.kz'+path],capture_output=True,text=True)
 assert r.returncode==0 and r.stdout=='200',(path,r.stdout,r.stderr)
 a=Text();a.feed(p.read_text());b=Text();b.feed((snapshots/((path.strip('/').replace('/','-')or'home')+'.html')).read_text())
 assert a.parts==b.parts,(path,'正文与迁移前不同，请检查是否有管理员编辑')
 assert 'private, no-store' in h.read_text().lower(),(path,'not served dynamically')
 return {'path':path,'status':200,'text_matches_before':True,'dynamic':True}
rows=list(concurrent.futures.ThreadPoolExecutor(4).map(check,paths))
legacy=json.loads((ROOT/'ops/sync-report.json').read_text())['failed_assets']
for url in legacy+['https://hpf.kz/news/','https://hpf.kz/zh/news/','https://hpf.kz/ru/news/']:
 r=subprocess.run(['curl','-sS','--max-time','30','-o','/dev/null','-w','%{http_code}',url],capture_output=True,text=True);assert r.stdout=='200',(url,r.stdout);rows.append({'url':url,'status':200})
report={'date':'2026-10-25','version':sys.argv[1] if len(sys.argv)>1 else 'not-specified','checks':rows,'local_tests':['draft isolation','signed preview','publish immediate','anonymous write denied','settings deletion/unpublish blocked','invalid email/link rejected','phone/map/form/schema synchronized']}
(ROOT/'ops/global-production-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print('16个页面正文一致并实时读取；3个新闻入口及6个兼容资源均正常。')
