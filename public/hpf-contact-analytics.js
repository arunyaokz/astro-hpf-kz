(() => {
  const detectLang = () => {
    const seg = (location.pathname.split('/')[1] || '').toLowerCase();
    if (seg === 'zh' || seg === 'ru' || seg === 'kk') return seg;
    const htmlLang = (document.documentElement.lang || '').toLowerCase();
    if (htmlLang.startsWith('zh')) return 'zh';
    if (htmlLang.startsWith('ru')) return 'ru';
    if (htmlLang.startsWith('kk')) return 'kk';
    return 'en';
  };
  const detectSource = () => {
    try {
      const from = new URLSearchParams(location.search).get('from')?.trim();
      if (from) return from.slice(0, 120);
      if (document.referrer) {
        const ref = new URL(document.referrer);
        if (ref.origin !== location.origin) return `ref:${ref.hostname}`.slice(0, 120);
      }
    } catch (_) { /* ignore malformed referrer */ }
    return '';
  };
  const record = (type) => {
    try {
      const body = JSON.stringify({
        event: type,
        lang: detectLang(),
        path: location.pathname.slice(0, 160),
        source: detectSource(),
      });
      navigator.sendBeacon('/_hpf/contact-event', body);
    } catch (_) { /* Navigation must never depend on analytics. */ }
  };
  document.addEventListener('click', (event) => {
    if (!event.isTrusted || !(event.target instanceof Element)) return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (/^mailto:/i.test(href)) record('email');
    else if (/^tel:/i.test(href)) record('phone');
    else if (/^https:\/\/(?:wa\.me|api\.whatsapp\.com)\//i.test(href)) record('whatsapp');
  }, true);
  document.addEventListener('submit', (event) => {
    if (event.isTrusted && event.target instanceof HTMLFormElement && event.target.matches('[data-enquiry-form]') && event.target.checkValidity()) record('enquiry');
  }, true);
})();
