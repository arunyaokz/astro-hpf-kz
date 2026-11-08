#!/usr/bin/env node
// Direct MCP calls through Codex's credential manager; no exported tokens.
// The in-memory tool session never runs a model or saves a new chat.
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { spawn } from 'node:child_process';
export const SITE = 'https://hpf.kz';
const SERVER = 'hpf-emdash';
const allowed = new Set(['schema_get_collection','schema_list_collections','content_list','content_get','content_create','content_update','content_translations','media_list','media_upload','media_get']);
export async function connect() {
  const child = spawn('codex', ['app-server','--stdio','-c','mcp_servers={hpf-emdash={url="https://hpf.kz/_emdash/api/mcp"}}'], {stdio:['pipe','pipe','pipe'],detached:true});
  child.stderr.resume();
  const pending = new Map(); let serial = 0;
  const lines = readline.createInterface({input:child.stdout});
  const fail = error => {for(const item of pending.values()){clearTimeout(item.timer);item.reject(error);}pending.clear();};
  child.on('error',fail);child.on('exit',()=>fail(new Error('Codex 工具连接已关闭。')));
  lines.on('line',line=>{
    let msg;try{msg=JSON.parse(line);}catch{return;}
    if(msg.id===undefined)return;
    const item=pending.get(msg.id);if(!item)return;
    pending.delete(msg.id);clearTimeout(item.timer);
    if(msg.error)item.reject(new Error(JSON.stringify(msg.error)));else item.resolve(msg.result);
  });
  function rpc(method,params){
    const id=++serial;
    return new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>{pending.delete(id);reject(new Error(method+' 超时'));},180000);
      pending.set(id,{resolve,reject,timer});child.stdin.write(JSON.stringify({id,method,params})+'\n');
    });
  }
  try{
    await rpc('initialize',{clientInfo:{name:'hpf-editorial-tools',version:'1.0.0'},capabilities:{experimentalApi:true}});
    child.stdin.write('{"method":"initialized"}\n');
    const session=await rpc('thread/start',{ephemeral:true,cwd:process.cwd()});
    const threadId=session.thread.id;
    return {
      rpc,threadId,
      async listTools(){return rpc('mcpServerStatus/list',{serverName:SERVER,threadId,detail:'toolsAndAuthOnly'});},
      async callTool(name,args){return rpc('mcpServer/tool/call',{threadId,server:SERVER,tool:name,arguments:args});},
      async close(){lines.close();child.stdin.end();try{process.kill(-child.pid,'SIGTERM');}catch{child.kill();}},
    };
  }catch(error){lines.close();try{process.kill(-child.pid,'SIGTERM');}catch{child.kill();}throw error;}
}
export async function call(client,name,args={}){
  if(!allowed.has(name))throw new Error('此草稿流程不允许调用 '+name);
  if(['content_create','content_update'].includes(name)&&args.status!=='draft')throw new Error('此流程只允许保存草稿。');
  const result=await client.callTool(name,args);
  if(result.isError)throw new Error(JSON.stringify(result));
  const block=result.content?.find(item=>item.type==='text');
  return block?JSON.parse(block.text):result;
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(import.meta.filename)){
  let client;
  try{
    client=await connect();const [name,file]=process.argv.slice(2);
    if(name==='tools'){
      const inventory=await client.listTools();
      const tools=inventory.data.find(item=>item.name===SERVER)?.tools??{};
      console.log(JSON.stringify(Object.values(tools).filter(item=>allowed.has(item.name)),null,2));
    }else console.log(JSON.stringify(await call(client,name,file?JSON.parse(fs.readFileSync(file,'utf8')):{}),null,2));
  }catch(error){console.error(error.message);process.exitCode=1;}finally{await client?.close();}
}
