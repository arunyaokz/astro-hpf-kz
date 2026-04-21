import React, { useState, useEffect, useRef } from 'react';
import { Globe, Activity, Shield, Box, Zap, ChevronRight, Terminal, Radio, Server, Crosshair } from 'lucide-react';

// --- STYLES & FONTS ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    :root {
      --void-black: #03050A;
      --graphite: #0A0E17;
      --surface: #121622;
      --ion-blue: #2ED3FF;
      --ion-blue-glow: rgba(46, 211, 255, 0.15);
      --soft-ice: #E8EDF2;
      --signal-red: #FF2E2E;
    }
    html, body {
      background-color: var(--void-black) !important;
      color: var(--soft-ice);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .font-heading { font-family: 'Space Grotesk', sans-serif; }
    .font-mono-data { font-family: 'IBM Plex Mono', monospace; }
    .text-huge {
      font-size: clamp(3.5rem, 8vw, 8rem);
      line-height: 0.9;
      letter-spacing: -0.04em;
    }
    .text-massive {
      font-size: clamp(4rem, 12vw, 14rem);
      line-height: 0.8;
      letter-spacing: -0.05em;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
    }
    .bg-noise {
      position: fixed;
      inset: 0;
      z-index: 100;
      pointer-events: none;
      opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
    @keyframes pulse-node {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(46, 211, 255, 0.6); }
      70% { transform: scale(1.3); box-shadow: 0 0 0 15px rgba(46, 211, 255, 0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(46, 211, 255, 0); }
    }
    @keyframes data-flow {
      0% { stroke-dashoffset: 100; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes scanline-vertical {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    @keyframes glitch-anim {
      0% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 2px); }
      20% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
      40% { clip-path: inset(40% 0 40% 0); transform: translate(2px, 2px); }
      60% { clip-path: inset(90% 0 2% 0); transform: translate(-2px, -2px); }
      80% { clip-path: inset(20% 0 60% 0); transform: translate(2px, -2px); }
      100% { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 2px); }
    }
    .animate-node { animation: pulse-node 3s infinite cubic-bezier(0.19, 1, 0.22, 1); }
    .animate-flow { stroke-dasharray: 4 8; animation: data-flow 3s linear infinite; }
    .scanner-line {
      position: absolute;
      top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--ion-blue), transparent);
      box-shadow: 0 0 10px var(--ion-blue);
      animation: scanline-vertical 8s linear infinite;
      opacity: 0.5;
      z-index: 20;
      pointer-events: none;
    }
    .glass-panel {
      background: linear-gradient(145deg, rgba(18, 22, 34, 0.7) 0%, rgba(10, 14, 23, 0.9) 100%);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.03);
      box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.8);
    }
    .tech-border { position: relative; }
    .tech-border::before, .tech-border::after,
    .tech-border-inner::before, .tech-border-inner::after {
      content: ''; position: absolute; width: 6px; height: 6px;
      border: 1px solid var(--ion-blue); opacity: 0.7; transition: all 0.3s ease;
    }
    .tech-border::before { top: -1px; left: -1px; border-right: none; border-bottom: none; }
    .tech-border::after { bottom: -1px; right: -1px; border-left: none; border-top: none; }
    .tech-border-inner::before { top: -1px; right: -1px; border-left: none; border-bottom: none; }
    .tech-border-inner::after { bottom: -1px; left: -1px; border-right: none; border-top: none; }
    .tech-border:hover::before, .tech-border:hover::after,
    .tech-border:hover .tech-border-inner::before, .tech-border:hover .tech-border-inner::after {
      width: 12px; height: 12px; opacity: 1; border-color: #fff;
    }
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(60px) scale(0.98);
      transition: opacity 1.4s cubic-bezier(0.19, 1, 0.22, 1), transform 1.4s cubic-bezier(0.19, 1, 0.22, 1);
      will-change: opacity, transform;
    }
    .reveal-on-scroll.is-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    .reveal-delay-100 { transition-delay: 100ms; }
    .reveal-delay-200 { transition-delay: 200ms; }
    .reveal-delay-300 { transition-delay: 300ms; }
    .reveal-delay-400 { transition-delay: 400ms; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--void-black); }
    ::-webkit-scrollbar-thumb { background: rgba(46, 211, 255, 0.3); }
    ::-webkit-scrollbar-thumb:hover { background: var(--ion-blue); }
    .hover-glitch:hover {
      animation: glitch-anim 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
      color: var(--ion-blue);
    }
    /* Override Astro header for dark theme */
    header.site-header, nav.site-header {
      background: transparent !important;
    }
  `}</style>
);

// --- TRANSLATIONS ---
const dict = {
  nav: {
    status: { en: "SYSTEM_OPERATIONAL", zh: "系统_运行正常", ru: "СИСТЕМА_РАБОТАЕТ" }
  },
  hero: {
    tagline: { en: "STRATEGIC INFRASTRUCTURE", zh: "战略基础设施", ru: "СТРАТЕГИЧЕСКАЯ ИНФРАСТРУКТУРА" },
    title: { en: "TRANS-CASPIAN", zh: "跨里海中间走廊", ru: "ТРАНСКАСПИЙСКИЙ" },
    titleHighlight: { en: "CORRIDOR", zh: "物流网络", ru: "КОРИДОР" },
    sub: {
      en: "Connecting China and Europe through a resilient multimodal logistics infrastructure. Global telemetry optimized for precision and velocity.",
      zh: "通过具有弹性的多式联运基础设施连接中国与欧洲。为精确性和速度优化的全球遥测系统。",
      ru: "Соединяя Китай и Европу через надежную мультимодальную логистическую инфраструктуру."
    },
    stats: {
      routes: { en: "ACTIVE NODES", zh: "活跃节点", ru: "АКТИВНЫЕ УЗЛЫ" },
      transit: { en: "VELOCITY (DAYS)", zh: "运输速度（天）", ru: "СКОРОСТЬ (ДНИ)" },
      ports: { en: "PORTS SYNCED", zh: "同步港口", ru: "СИНХРОНИЗИРОВАННЫЕ ПОРТЫ" },
      countries: { en: "JURISDICTIONS", zh: "覆盖法域", ru: "ЮРИСДИКЦИИ" }
    }
  },
  corridor: {
    title: { en: "THE CORRIDOR", zh: "走廊概览", ru: "КОРИДОР" },
    subtitle: { en: "Global Infrastructure Control System", zh: "全球基础设施控制系统", ru: "Глобальная система контроля" },
  },
  services: {
    title: { en: "CORE LOGISTICS MODULES", zh: "核心物流模块", ru: "ЛОГИСТИЧЕСКИЕ МОДУЛИ" },
    ftl: {
      title: { en: "Full Truck Load Transport", zh: "整车运输", ru: "Полная загрузка автомобиля" },
      desc: { en: "Dedicated long-distance truck transport between China and Central Asia. Optimized for security and speed.", zh: "中国与中亚之间的长途专线卡车运输。针对安全性和速度进行了优化。", ru: "Выделенные грузовые перевозки между Китаем и Центральной Азией." }
    },
    multi: {
      title: { en: "Multimodal Transport", zh: "多式联运", ru: "Мультимодальные перевозки" },
      desc: { en: "Integrated logistics combining truck, rail, and air transportation to optimize cost and transit velocity.", zh: "结合卡铁空的多式联运综合物流，以优化成本和运输速度。", ru: "Интегрированная логистика (авто, ж/д, авиа)." }
    },
    ltl: {
      title: { en: "LTL Consolidation", zh: "拼箱运输", ru: "Сборные грузы" },
      desc: { en: "Regular consolidation services connecting China, Kazakhstan, Caucasus, and European distribution hubs.", zh: "连接中国、中亚、高加索地区和欧洲分拨中心的定期拼箱服务。", ru: "Регулярные услуги по консолидации." }
    }
  },
  platform: {
    title: { en: "DIGITAL LOGISTICS PLATFORM", zh: "数字物流中枢", ru: "ЦИФРОВАЯ ПЛАТФОРМА" },
    desc: {
      en: "Real-time telemetry, routing optimization, and automated customs coordination. Operating at the intersection of geography and code.",
      zh: "实时遥测、路线优化和自动化的跨境通关协调。在地理与代码的交汇处运行。",
      ru: "Телеметрия в реальном времени и таможенная координация."
    },
    modules: {
      tracking: { en: "Cargo Tracking", zh: "全链路货物追踪", ru: "Отслеживание грузов" },
      routing: { en: "Route Optimization", zh: "AI路线优化", ru: "Оптимизация маршрута" },
      customs: { en: "Customs Coordination", zh: "自动化通关协调", ru: "Таможенная координация" },
      visibility: { en: "Transport Visibility", zh: "全局运输透明度", ru: "Прозрачность транспорта" }
    }
  },
  partnership: {
    title: { en: "BUILD THE CORRIDOR", zh: "共建欧亚走廊", ru: "ПОСТРОИТЬ КОРИДОР" },
    cta: { en: "INITIATE PROTOCOL", zh: "启动合作协议", ru: "ИНИЦИИРОВАТЬ ПРОТОКОЛ" }
  }
};

type Lang = 'en' | 'zh' | 'ru';

// --- HOOKS ---
const useIntersectionObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);
};

const AnimatedCounter = ({ end, duration = 2500, suffix = "", prefix = "" }: { end: number; duration?: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const scrambleInterval = setInterval(() => {
      setCount(Math.floor(Math.random() * end * 2));
    }, 50);
    const timeout = setTimeout(() => {
      clearInterval(scrambleInterval);
      setIsScrambling(false);
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * end));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }, 600);
    return () => { clearInterval(scrambleInterval); clearTimeout(timeout); };
  }, [end, duration, isVisible]);

  return (
    <span ref={nodeRef} className={isScrambling ? "text-[#2ED3FF]/50" : "text-white"}>
      {prefix}{count}{suffix}
    </span>
  );
};

// --- SUB COMPONENTS ---
const CinematicBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0A1128_0%,_#03050A_100%)]"></div>
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[150vw] h-[80vh] bg-[radial-gradient(ellipse_at_top,_rgba(46,211,255,0.25),_transparent_70%)] mix-blend-screen blur-[80px]"></div>
    <div className="absolute bottom-0 right-0 w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_bottom_right,_rgba(255,46,46,0.05),_transparent_50%)]"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] rounded-full border border-[#2ED3FF]/10 opacity-50"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] rounded-full border border-[#2ED3FF]/20 border-dashed opacity-30 animate-[spin_120s_linear_infinite]"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full border border-[#2ED3FF]/10 opacity-70"></div>
    <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.15]">
      <defs>
        <pattern id="premium-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2ED3FF" strokeWidth="0.5" strokeDasharray="1 3"/>
          <circle cx="0" cy="0" r="1.5" fill="#2ED3FF" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#premium-grid)" />
    </svg>
    <div className="scanner-line"></div>
  </div>
);

const TelemetryBox = ({ label, value, suffix = "", delay }: { label: string; value: number; suffix?: string; delay: string }) => (
  <div className={`glass-panel p-6 tech-border reveal-on-scroll ${delay} flex flex-col justify-between h-full relative overflow-hidden group`}>
    <div className="absolute inset-0 bg-gradient-to-br from-[#2ED3FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    <div className="tech-border-inner"></div>
    <div className="flex justify-between items-start mb-8 relative z-10">
      <div className="text-xs text-[#2ED3FF] font-mono-data tracking-[0.2em] uppercase max-w-[70%] leading-relaxed font-semibold">{label}</div>
      <Crosshair className="w-5 h-5 text-[#E8EDF2]/60" />
    </div>
    <div className="relative z-10">
      <div className="text-5xl lg:text-6xl font-heading font-medium tracking-tighter mb-2 text-white group-hover:text-[#2ED3FF] transition-colors duration-500">
        <AnimatedCounter end={value} suffix={suffix} />
      </div>
      <div className="flex gap-1 w-full h-[2px]">
        <div className="w-1/3 h-full bg-[#2ED3FF]"></div>
        <div className="w-2/3 h-full bg-[#121622]"></div>
      </div>
    </div>
  </div>
);

const RouteMapNetwork = () => {
  const nodes = [
    { id: 'CN', name: 'CN_HUB', x: 88, y: 75, small: false, delay: '0s' },
    { id: 'KZ', name: 'KZ_NODE', x: 68, y: 50, small: false, delay: '0.2s' },
    { id: 'AKT', name: 'PORT_AKT', x: 55, y: 58, small: true, delay: '0.4s' },
    { id: 'KUR', name: 'PORT_KUR', x: 53, y: 62, small: true, delay: '0.5s' },
    { id: 'BAK', name: 'AZ_NODE', x: 45, y: 65, small: false, delay: '0.7s' },
    { id: 'TBI', name: 'GE_NODE', x: 38, y: 58, small: false, delay: '0.9s' },
    { id: 'EU', name: 'EU_HUB', x: 15, y: 45, small: false, delay: '1.2s' },
  ];

  return (
    <div className="relative w-full h-[60vh] min-h-[500px] glass-panel tech-border overflow-hidden flex items-center justify-center group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(46,211,255,0.05),_transparent_70%)]"></div>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 z-0">
        <path d="M 88 75 Q 78 60 68 50 T 55 58 T 45 65 T 38 58 T 15 45" stroke="rgba(232, 237, 242, 0.15)" strokeWidth="0.2" fill="none" />
        <path d="M 88 75 Q 78 60 68 50 T 55 58 T 45 65 T 38 58 T 15 45" stroke="#2ED3FF" strokeWidth="0.4" fill="none" className="animate-flow" />
        <circle cx="45" cy="65" r="20" stroke="rgba(46, 211, 255, 0.2)" strokeWidth="0.1" fill="none" />
        <circle cx="45" cy="65" r="40" stroke="rgba(46, 211, 255, 0.1)" strokeWidth="0.1" fill="none" strokeDasharray="1 2" />
      </svg>
      {nodes.map((node) => (
        <div key={node.id} className="absolute flex flex-col items-center" style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}>
          <div
            className={`rounded-full bg-[#2ED3FF] ${node.small ? 'w-2 h-2' : 'w-3 h-3 animate-node'}`}
            style={{ animationDelay: node.delay }}
          ></div>
          <div className="mt-3 text-xs font-mono-data tracking-[0.2em] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-md" style={{ transitionDelay: node.delay }}>
            [{node.name}]
          </div>
        </div>
      ))}
      <div className="absolute top-6 left-6 text-xs font-mono-data text-[#E8EDF2]/70 tracking-widest uppercase flex flex-col gap-1">
        <span>LAT: 41.9N / LON: 101.3E</span>
        <span>SAT_LINK: ESTABLISHED</span>
        <span>SECURE_CHAN: 0x8A2F</span>
      </div>
      <div className="absolute bottom-6 right-6 flex items-center gap-3">
        <div className="w-12 h-[2px] bg-[#2ED3FF]/80"></div>
        <div className="text-xs font-mono-data text-[#2ED3FF] font-bold tracking-widest uppercase animate-pulse">
          LIVE_TRACKING
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function ModernHomepage() {
  const [lang, setLang] = useState<Lang>('zh');
  useIntersectionObserver();

  return (
    <div className="min-h-screen relative font-sans text-white selection:bg-[#2ED3FF] selection:text-[#03050A]" style={{ backgroundColor: '#03050A' }}>
      <GlobalStyles />
      <div className="bg-noise"></div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-white text-[#03050A] flex items-center justify-center font-heading font-bold text-lg group-hover:bg-[#2ED3FF] transition-colors duration-500">
              H
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold tracking-[0.2em] text-base leading-tight">HPF KZ</span>
              <span className="font-mono-data text-xs text-[#2ED3FF] tracking-widest">INFRA_OS_v2.0</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 glass-panel px-6 py-3 rounded-full border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono-data tracking-[0.2em] text-[#E8EDF2]/90">
              <div className="w-2 h-2 rounded-full bg-[#2ED3FF] animate-pulse shadow-[0_0_8px_#2ED3FF]"></div>
              {dict.nav.status[lang]}
            </div>
            <div className="w-[1px] h-4 bg-white/20"></div>
            <div className="flex gap-4 text-xs font-mono-data">
              {(['zh', 'en', 'ru'] as Lang[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`uppercase transition-all duration-300 hover:text-[#2ED3FF] ${lang === l ? 'text-white font-bold border-b border-[#2ED3FF]' : 'text-[#E8EDF2]/70'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col justify-center pt-24 pb-12 overflow-hidden border-b border-white/10">
        <CinematicBackground />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
          <h1 className="text-massive font-heading font-bold whitespace-nowrap drop-shadow-2xl">MIDDLE CORRIDOR</h1>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 flex flex-col justify-between h-full flex-1">
          <div className="mt-auto mb-20 reveal-on-scroll">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#2ED3FF]/50 bg-[#2ED3FF]/10 backdrop-blur-md mb-8">
              <Activity className="w-4 h-4 text-[#2ED3FF]" />
              <span className="text-xs font-mono-data font-medium tracking-[0.3em] text-[#2ED3FF]">
                {dict.hero.tagline[lang]}
              </span>
            </div>
            <h1 className="text-huge font-heading font-bold uppercase flex flex-col gap-2 mb-8 drop-shadow-[0_0_40px_rgba(3,5,10,0.8)]">
              <span className="text-white">{dict.hero.title[lang]}</span>
              <span className="text-[#E8EDF2]/80 italic">{dict.hero.titleHighlight[lang]}</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-t border-white/20 pt-8">
              <p className="text-base md:text-lg text-[#E8EDF2]/90 max-w-2xl font-normal leading-relaxed font-mono-data drop-shadow-md">
                {dict.hero.sub[lang]}
              </p>
              <div className="flex flex-col items-center gap-4 text-[#E8EDF2]/70 drop-shadow-lg">
                <span className="text-xs font-mono-data tracking-[0.3em] uppercase rotate-90 origin-left translate-x-3">SCROLL</span>
                <div className="w-[2px] h-16 bg-gradient-to-b from-white/60 to-transparent"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
            <TelemetryBox label={dict.hero.stats.routes[lang]} value={24} delay="reveal-delay-100" />
            <TelemetryBox label={dict.hero.stats.transit[lang]} value={12} suffix="d" delay="reveal-delay-200" />
            <TelemetryBox label={dict.hero.stats.ports[lang]} value={18} delay="reveal-delay-300" />
            <TelemetryBox label={dict.hero.stats.countries[lang]} value={15} delay="reveal-delay-400" />
          </div>
        </div>
      </section>

      {/* CORRIDOR MAP */}
      <section className="py-32 relative border-b border-white/10 z-10" style={{ backgroundColor: '#03050A' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-on-scroll">
            <div>
              <h3 className="text-xs font-mono-data font-bold tracking-[0.4em] text-[#2ED3FF] mb-6 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#2ED3FF]"></span> MAP_PROTOCOL // 001
              </h3>
              <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">{dict.corridor.title[lang]}</h2>
            </div>
            <p className="text-[#E8EDF2]/70 font-mono-data text-sm uppercase mt-4 md:mt-0 tracking-widest">{dict.corridor.subtitle[lang]}</p>
          </div>
          <div className="reveal-on-scroll reveal-delay-200 p-1 glass-panel">
            <RouteMapNetwork />
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="py-32 relative border-b border-white/10 z-10" style={{ backgroundColor: '#03050A' }}>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03),_transparent_70%)] pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="reveal-on-scroll mb-20">
            <h3 className="text-xs font-mono-data font-bold tracking-[0.4em] text-[#2ED3FF] mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#2ED3FF]"></span> MODULES // 002
            </h3>
            <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">{dict.services.title[lang]}</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-px bg-white/10 p-px">
            {([
              { id: 'ftl' as const, icon: <Box className="w-10 h-10" />, code: "SYS-FTL-01" },
              { id: 'multi' as const, icon: <Radio className="w-10 h-10" />, code: "SYS-MLT-02" },
              { id: 'ltl' as const, icon: <Server className="w-10 h-10" />, code: "SYS-LTL-03" }
            ]).map((service, idx) => (
              <div
                key={service.id}
                className="p-10 hover:bg-[#0A0E17] transition-all duration-500 cursor-crosshair group relative overflow-hidden reveal-on-scroll"
                style={{ backgroundColor: '#03050A', transitionDelay: `${idx * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#2ED3FF]/0 to-[#2ED3FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <div className="text-white/60 group-hover:text-[#2ED3FF] transition-colors duration-500">{service.icon}</div>
                  <div className="text-xs font-mono-data font-bold text-[#E8EDF2]/90 bg-white/10 px-3 py-1.5">{service.code}</div>
                </div>
                <div className="space-y-2 mb-6 relative z-10">
                  <h3 className="text-2xl font-heading font-medium tracking-tight text-white group-hover:text-[#2ED3FF] transition-colors">{dict.services[service.id].title[lang]}</h3>
                  <div className="h-[2px] w-12 bg-white/40 group-hover:w-full group-hover:bg-[#2ED3FF] transition-all duration-700"></div>
                </div>
                <p className="text-base text-[#E8EDF2]/90 leading-relaxed font-normal min-h-[80px] relative z-10">
                  {dict.services[service.id].desc[lang]}
                </p>
                <div className="mt-12 flex items-center gap-2 text-xs font-mono-data font-bold text-[#2ED3FF] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 relative z-10">
                  INITIALIZE_PROCESS <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIGITAL PLATFORM */}
      <section className="py-32 relative border-b border-white/10 overflow-hidden z-10" style={{ backgroundColor: '#03050A' }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#2ED3FF]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 reveal-on-scroll relative z-10">
              <h3 className="text-xs font-mono-data font-bold tracking-[0.4em] text-[#2ED3FF] mb-6 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#2ED3FF]"></span> PLATFORM // 003
              </h3>
              <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-8 leading-tight">{dict.platform.title[lang]}</h2>
              <p className="text-base text-[#E8EDF2]/90 leading-relaxed font-mono-data mb-12 border-l-2 border-[#2ED3FF]/50 pl-6 py-2">
                {dict.platform.desc[lang]}
              </p>
              <div className="space-y-6">
                {Object.entries(dict.platform.modules).map(([key, val], idx) => (
                  <div key={key} className="flex items-center gap-6 text-base font-mono-data group cursor-default">
                    <span className="text-[#2ED3FF]/80 font-bold">0{idx + 1}</span>
                    <span className="uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">{val[lang]}</span>
                    <div className="flex-1 h-[2px] bg-white/10 group-hover:bg-[#2ED3FF]/50 transition-colors"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 reveal-on-scroll reveal-delay-200">
              <div className="tech-border glass-panel p-[2px] rounded-sm shadow-2xl shadow-[#2ED3FF]/10">
                <div className="rounded-sm p-6 h-[500px] flex flex-col font-mono-data text-sm md:text-base relative overflow-hidden" style={{ backgroundColor: '#03050A' }}>
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-6 relative z-10">
                    <div className="flex gap-3 text-[#E8EDF2]/80 items-center font-bold">
                      <Terminal className="w-5 h-5" />
                      <span className="tracking-widest">HPF_CORE_KERNEL_v2.4</span>
                    </div>
                    <div className="text-[#2ED3FF] flex items-center gap-2 bg-[#2ED3FF]/20 px-3 py-1.5 text-xs font-bold tracking-widest">
                      <span className="w-2 h-2 bg-[#2ED3FF] animate-pulse"></span>
                      LIVE_FEED
                    </div>
                  </div>
                  <div className="flex-1 space-y-4 text-[#E8EDF2]/90 overflow-hidden relative z-10">
                    <div className="text-[#2ED3FF] font-bold hover-glitch">{`> INITIALIZING NEURAL ROUTE CALCULATION...`}</div>
                    <div>[SYS] Establishing handshake with Kuryk Port node... <span className="text-green-400 font-bold">OK</span></div>
                    <div>[SYS] Analyzing Caspian maritime weather patterns... <span className="text-green-400 font-bold">NOMINAL</span></div>
                    <div className="border-l-2 border-[#E8EDF2]/40 pl-4 my-5 opacity-90">
                      [DATA_STREAM] Payload_ID: CN-KZ-AZ-889<br />
                      [DATA_STREAM] Weight: 24,000kg<br />
                      [DATA_STREAM] Class: High-Value_Tech
                    </div>
                    <div className="text-yellow-400 font-bold">[WARN] Minor bottleneck detected at Alashankou border. Re-routing...</div>
                    <div className="text-[#03050A] font-bold mt-6 bg-[#2ED3FF] p-3">{`> OPTIMAL PATH SECURED. ESTIMATED TTA: 12.4 DAYS.`}</div>
                    <div className="mt-8 space-y-5 w-3/4">
                      <div>
                        <div className="flex justify-between text-xs text-[#E8EDF2]/80 mb-2 tracking-widest font-bold"><span>CORRIDOR_CAPACITY</span><span>87%</span></div>
                        <div className="w-full h-[4px] bg-white/10"><div className="w-[87%] h-full bg-[#2ED3FF] shadow-[0_0_12px_#2ED3FF]"></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-[#E8EDF2]/80 mb-2 tracking-widest font-bold"><span>NETWORK_STRESS</span><span>42%</span></div>
                        <div className="w-full h-[4px] bg-white/10"><div className="w-[42%] h-full bg-white/60"></div></div>
                      </div>
                    </div>
                    <div className="mt-8 flex font-bold">
                      <span className="text-[#2ED3FF] mr-3">{`root@hpf:~#`}</span>
                      <span className="w-3 h-5 bg-[#E8EDF2] animate-pulse"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 relative flex flex-col items-center justify-center text-center px-6 border-b border-white/10 overflow-hidden z-10" style={{ backgroundColor: '#03050A' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,_rgba(46,211,255,0.08)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl reveal-on-scroll">
          <Shield className="w-20 h-20 text-[#2ED3FF] mx-auto mb-10 opacity-90" strokeWidth={1.5} />
          <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-12 leading-tight">
            {dict.partnership.title[lang]}
          </h2>
          <button className="relative group overflow-hidden bg-white text-[#03050A] px-14 py-6 font-mono-data text-sm tracking-[0.3em] font-bold uppercase transition-transform hover:scale-105 active:scale-95">
            <span className="absolute inset-0 w-full h-full bg-[#2ED3FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative z-10 flex items-center gap-3">
              {dict.partnership.cta[lang]}
              <Zap className="w-5 h-5" />
            </span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 relative z-10" style={{ backgroundColor: '#03050A' }}>
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white text-[#03050A] flex items-center justify-center font-heading font-bold text-sm">H</div>
            <div className="flex flex-col">
              <span className="font-mono-data text-sm font-bold text-white tracking-widest">HPF KZ // HQ</span>
              <span className="font-mono-data text-xs text-[#E8EDF2]/70 tracking-widest mt-1">ALMATY, KAZAKHSTAN</span>
            </div>
          </div>
          <div className="flex gap-8 text-xs font-mono-data font-bold text-[#E8EDF2]/80 tracking-[0.2em] uppercase">
            <a href="mailto:contact@hpf.kz" className="hover:text-white transition-colors">CONTACT</a>
            <a href="/about" className="hover:text-white transition-colors">ABOUT</a>
            <a href="/services" className="hover:text-white transition-colors">SERVICES</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
