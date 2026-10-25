import urllib.request,http.cookiejar,json,base64,uuid
base='http://127.0.0.1:4321';opener=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()));opener.open(base+'/_emdash/api/setup/dev-bypass').read()
boundary='hpf'+uuid.uuid4().hex
image=base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aFbkAAAAASUVORK5CYII=')
data=('--'+boundary+'\r\nContent-Disposition: form-data; name="file"; filename="cms-local-check.png"\r\nContent-Type: image/png\r\n\r\n').encode()+image+('\r\n--'+boundary+'--\r\n').encode()
h={'Origin':base,'X-EmDash-Request':'1','Content-Type':'multipart/form-data; boundary='+boundary}
r=opener.open(urllib.request.Request(base+'/_emdash/api/media',data=data,headers=h));s=json.load(r);print('本地图片上传',r.status);item=s['data'].get('item',s['data']);print('返回字段',list(item))
try:
 url=item.get('url') or '/_emdash/api/media/file/'+item['storageKey'];rr=urllib.request.urlopen(base+url);actual=rr.read();print('匿名图片读取',rr.status,'字节一致',actual==image);assert actual==image
finally:
 rr=opener.open(urllib.request.Request(base+'/_emdash/api/media/'+item['id'],method='DELETE',headers={'Origin':base,'X-EmDash-Request':'1'}));print('清理图片',rr.status)
