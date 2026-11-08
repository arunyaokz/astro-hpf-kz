(() => {
  // This address currently serves staging business data. Never publish its numbers on the public site.
  const endpoint = 'https://fasttruck.hpf.kz/api/public/green-channel-index';
  const productionSourceVerified = false;
  const roots = document.querySelectorAll('[data-green-index], [data-green-home]');
  if (!roots.length) return;
  const text = {
    zh: {unavailable:'数据核验中', noHistory:'历史数据不足', historyReady:'首屏图表显示已核验的历史数据。', bad:'数据暂不可用', days:'天', sample:'有效车辆', asof:'数据截至', departure:'最近有效离港'},
    en: {unavailable:'Data under review', noHistory:'Not enough history', historyReady:'The chart above shows verified historical data.', bad:'Data unavailable', days:'days', sample:'Valid vehicles', asof:'Data as of', departure:'Last valid departure'},
    ru: {unavailable:'Данные проверяются', noHistory:'Недостаточно данных', historyReady:'На графике показаны проверенные исторические данные.', bad:'Данные недоступны', days:'дн.', sample:'Автомобилей', asof:'Данные на', departure:'Последнее отправление'}
  };
  const lang = document.documentElement.lang.startsWith('zh') ? 'zh' : document.documentElement.lang.startsWith('ru') ? 'ru' : 'en';
  const t = text[lang], stamp = v => new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : lang === 'ru' ? 'ru-RU' : 'en-GB', {timeZone:'Asia/Almaty', year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'}).format(new Date(v));
  function hide(bad) {const index=document.querySelector('[data-index]');if(index)index.textContent='—';const note=document.querySelector('[data-note]');if(note && bad)note.textContent=t.bad; const line=document.querySelector('[data-line]');if(line)line.setAttribute('d','');const area=document.querySelector('[data-area]');if(area)area.setAttribute('d','');const pts=document.querySelector('[data-points]');if(pts)pts.replaceChildren();const base=document.querySelector('[data-baseline]');if(base)base.setAttribute('d','');const label=document.querySelector('[data-baseline-label]');if(label)label.textContent='';const empty=document.querySelector('[data-chart-empty]');if(empty){empty.hidden=false;empty.textContent=bad?t.bad:t.unavailable} const el=document.querySelector('[data-green-home]'); if(el) el.textContent=bad?t.bad:t.unavailable; const status=document.querySelector('[data-status]');if(status)status.textContent=bad?t.bad:t.unavailable;}
  fetch(endpoint,{cache:'no-store',credentials:'omit',signal:AbortSignal.timeout(6000)}).then(r => {if(!r.ok) throw Error('unavailable');return r.json()}).then(data=>{
    if(!productionSourceVerified || data.schemaVersion!=='1.0'||data.status!=='available'||!data.current){hide(false);return}
    const c=data.current, generated=Date.parse(data.generatedAt),last=Date.parse(c.lastDepartureAt),now=Date.now();
    if(!Number.isFinite(Date.parse(c.end))||Date.parse(c.end)>now+300000||!Number.isFinite(generated)||generated>now+300000||now-generated>86400000||!Number.isFinite(last)||last>now+300000||now-last>7*86400000||!Number.isFinite(c.index)||c.index<=0||!Number.isFinite(c.medianDays)||c.medianDays<=0||!Number.isInteger(c.sampleCount)||c.sampleCount<20){hide(true);return}
    const home=document.querySelector('[data-green-home]');if(home)home.textContent=String(c.index);const metricDays=document.querySelector('[data-metric-days]');if(metricDays)metricDays.textContent=c.medianDays+' '+t.days;const metricIndex=document.querySelector('[data-metric-index]');if(metricIndex)metricIndex.textContent=String(c.index);const metricCount=document.querySelector('[data-metric-count]');if(metricCount)metricCount.textContent=String(c.sampleCount);const dataNote=document.querySelector('[data-data-note]');if(dataNote)dataNote.textContent=t.asof+' '+stamp(c.end)+' (Asia/Almaty)';
    const root=document.querySelector('[data-green-index]');if(!root)return;
    root.querySelector('[data-status]').textContent=t.asof+' '+stamp(c.end);
    root.querySelector('[data-index]').textContent=String(c.index);
    root.querySelector('[data-note]').textContent=`${c.medianDays} ${t.days} · ${t.sample}: ${c.sampleCount} · ${t.departure}: ${stamp(c.lastDepartureAt)} (Asia/Almaty)`;
    const summary=document.querySelector('[data-summary]'); if(summary)summary.textContent+=` · ${t.asof}: ${stamp(c.end)} (Asia/Almaty)`;
    const historic=Array.isArray(data.history)?data.history.filter(x=>Number.isFinite(x.index)&&x.index>0&&Number.isFinite(Date.parse(x.end))&&Date.parse(x.end)<=now).sort((a,b)=>Date.parse(a.end)-Date.parse(b.end)):[];
    const historyNote=document.querySelector('[data-history-note]');if(historyNote&&historic.length)historyNote.textContent=t.historyReady;const buttons=[...root.querySelectorAll('[data-months]')];
    function render(months){
      buttons.forEach(b=>b.classList.toggle('active',Number(b.dataset.months)===months));
      const cutoff=now-months*31*86400000, values=historic.filter(x=>Date.parse(x.end)>=cutoff).concat([{end:c.end,index:c.index}]);
      const empty=root.querySelector('[data-chart-empty]'), line=root.querySelector('[data-line]'), area=root.querySelector('[data-area]');
      if(values.length<2){empty.textContent=t.noHistory;empty.hidden=false;line.setAttribute('d','');area.setAttribute('d','');return}
      empty.hidden=true;root.querySelector('[data-chart-start]').textContent=stamp(values[0].end);root.querySelector('[data-chart-end]').textContent=stamp(values[values.length-1].end);const nums=values.map(x=>x.index).concat([100]),lo=Math.min(...nums)*.95,hi=Math.max(...nums)*1.05, span=hi-lo||1;
      const y100=191-(100-lo)/span*159;root.querySelector('[data-baseline]').setAttribute('d',`M0 ${y100} H500`);const baseLabel=root.querySelector('[data-baseline-label]');baseLabel.setAttribute('y',String(y100-5));baseLabel.textContent='100';const times=values.map(x=>Date.parse(x.end)),first=Math.min(...times),duration=Math.max(...times)-first||1;
      const coords=values.map(x=>({x:(Date.parse(x.end)-first)/duration*500,y:191-(x.index-lo)/span*159,t:Date.parse(x.end)}));
      // Missing reporting periods remain gaps, not invented connecting lines.
      const segments=[];let group=[];coords.forEach(pt=>{if(group.length&&pt.t-group[group.length-1].t>45*86400000){segments.push(group);group=[]}group.push(pt)});if(group.length)segments.push(group);
      const dots=root.querySelector('[data-points]');dots.replaceChildren();coords.forEach(p=>{const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');circle.setAttribute('cx',p.x);circle.setAttribute('cy',p.y);circle.setAttribute('r','3');dots.appendChild(circle)});const paths=segments.map(g=>g.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' '));line.setAttribute('d',paths.join(' '));area.setAttribute('d',segments.filter(g=>g.length>1).map((g,i)=>g.map((p,j)=>(j?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ')+` L${g[g.length-1].x.toFixed(1)} 191 L${g[0].x.toFixed(1)} 191 Z`).join(' '));
    }
    buttons.forEach(b=>{b.disabled=false;b.addEventListener('click',()=>render(Number(b.dataset.months)))});render(6);
  }).catch(()=>hide(true));
})();
