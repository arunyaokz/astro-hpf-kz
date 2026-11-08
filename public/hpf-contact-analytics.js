(() => {
  const record = (type) => {
    try { navigator.sendBeacon('/_hpf/contact-event', type); } catch (_) { /* Navigation must never depend on analytics. */ }
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
