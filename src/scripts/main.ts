class AppHeader {
  header: HTMLElement | null;
  mobileMenuBtn: HTMLButtonElement | null;
  mobileMenu: HTMLElement | null;
  mobileNavLinks: NodeListOf<HTMLAnchorElement>;

  constructor() {
    this.header = document.querySelector('.apple-header');
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn') as HTMLButtonElement;
    this.mobileMenu = document.getElementById('mobileMenu');
    this.mobileNavLinks = this.mobileMenu?.querySelectorAll('a') ?? document.querySelectorAll('');

    this.init();
  }

  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupSmoothScroll();
  }

  setupScrollEffect() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.header?.classList.add('scrolled');
      } else {
        this.header?.classList.remove('scrolled');
      }
    });
  }

  setupMobileMenu() {
    this.mobileMenuBtn?.addEventListener('click', () => this.toggleMobileMenu());

    // close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuBtn?.getAttribute('aria-expanded') === 'true') {
        this.toggleMobileMenu();
      }
    });

    // close when clicking link
    this.mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.mobileMenuBtn?.getAttribute('aria-expanded') === 'true') {
          this.toggleMobileMenu();
        }
      });
    });
  }

  toggleMobileMenu() {
    const expanded = this.mobileMenuBtn?.getAttribute('aria-expanded') === 'true';
    this.mobileMenuBtn?.setAttribute('aria-expanded', String(!expanded));
    this.mobileMenu?.classList.toggle('active');
    document.body.style.overflow = expanded ? '' : 'hidden';
    if (!expanded) {
      // focus first link
      (this.mobileNavLinks[0] as HTMLElement)?.focus();
    } else {
      this.mobileMenuBtn?.focus();
    }
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new AppHeader();
  });
}
