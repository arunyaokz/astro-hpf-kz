const messages = {
  zh: {sending:'正在提交…', success:'询价已收到，我们会与您联系。', failure:'提交未成功，请使用邮件方式发送；若刚才网络中断，可能会产生重复询价。', email:'打开邮件发送'},
  en: {sending:'Sending…', success:'Your enquiry has been received. We will contact you.', failure:'Submission failed. Please send by email. A network interruption may result in a duplicate enquiry.', email:'Send by email'},
  ru: {sending:'Отправка…', success:'Запрос получен. Мы свяжемся с вами.', failure:'Не удалось отправить запрос. Отправьте его по электронной почте. При сбое сети запрос может продублироваться.', email:'Отправить по электронной почте'}
};
for (const form of document.querySelectorAll<HTMLFormElement>('[data-enquiry-form]')) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type=submit]');
  const lang = (form.dataset.inquiryLang || 'en') as keyof typeof messages;
  const msg = messages[lang] ?? messages.en;
  let requestId = crypto.randomUUID();
  const cargo = form.querySelector<HTMLTextAreaElement>('textarea[name=cargo]');
  const product = new URLSearchParams(location.search).get('product')?.trim().slice(0, 200);
  if (product && cargo && !cargo.value) cargo.value = product;
  form.addEventListener('input', () => { requestId = crypto.randomUUID(); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const payload: Record<string, unknown> = {requestId, lang, consent: data.has('consent')};
    for (const key of ['name','email','company','phone','cargo','origin','destination','window','message']) payload[key] = String(data.get(key) ?? '').trim();
    const lines = Array.from(data.entries()).filter(([key]) => key !== 'consent').map(([key, value]) => `${key}: ${String(value).trim() || '—'}`);
    const email = `mailto:${form.dataset.contactEmail}?subject=${encodeURIComponent(form.dataset.mailSubject ?? 'HPF.kz freight enquiry')}&body=${encodeURIComponent(lines.join('\n'))}`;
    if (button) button.disabled = true;
    if (status) status.textContent = msg.sending;
    try {
      const response = await fetch('/_hpf/inquiry', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(payload), signal:AbortSignal.timeout(12000) });
      if (!response.ok || !((await response.json()) as {ok?: boolean}).ok) throw new Error('submit-failed');
      if (status) status.textContent = msg.success;
      form.reset(); requestId = crypto.randomUUID();
    } catch {
      if (status) {
        status.textContent = `${msg.failure} `;
        const link = document.createElement('a'); link.href = email; link.textContent = msg.email; status.appendChild(link);
      }
      location.href = email;
    } finally { if (button) button.disabled = false; }
  });
}
