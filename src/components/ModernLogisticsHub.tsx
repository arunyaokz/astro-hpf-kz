import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Package, Truck, Globe2, Shield, Zap,
  MapPin, CheckCircle2, Phone, Mail, ExternalLink
} from 'lucide-react';

export default function ModernLogisticsHub() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="modern-logistics">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="noise-overlay"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        className="main-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="nav-content">
          <div className="logo-area">
            <div className="logo-icon">
              <Package size={24} strokeWidth={2.5} />
            </div>
            <span className="logo-text">HPF<span className="logo-accent">·</span>KZ</span>
          </div>
          <div className="nav-menu">
            <a href="#services">服务</a>
            <a href="#route">线路</a>
            <a href="#pricing">报价</a>
            <a href="#contact" className="nav-btn">
              联系我们
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with 3D Route Map */}
      <section className="hero-modern">
        <motion.div
          className="hero-grid"
          style={{ opacity, scale }}
        >
          <div className="hero-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="hero-tag">
                <span className="tag-dot"></span>
                中亚跨境物流专家
              </div>
              <h1 className="hero-heading">
                连接
                <span className="gradient-span">中国</span>
                与
                <span className="gradient-span">欧洲</span>
                的智能走廊
              </h1>
              <p className="hero-desc">
                通过哈萨克斯坦优化路线，12天直达欧洲核心市场。
                比海运快60%，比空运省70%成本。
              </p>
            </motion.div>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button className="primary-btn">
                <span>免费获取方案</span>
                <ArrowRight size={20} />
              </button>
              <button className="ghost-btn">
                <Phone size={18} />
                <span>+86 400-XXX-XXXX</span>
              </button>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              className="stats-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <StatItem value="24" unit="小时" label="在线响应" />
              <StatItem value="12" unit="天" label="欧洲直达" />
              <StatItem value="99.8" unit="%" label="准时率" />
            </motion.div>
          </div>

          {/* 3D Route Visualization */}
          <div className="hero-right">
            <RouteVisualization mounted={mounted} />
          </div>
        </motion.div>
      </section>

      {/* Services Section with Modern Cards */}
      <section className="services-modern" id="services">
        <div className="section-wrapper">
          <motion.div
            className="section-head"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">核心能力</span>
            <h2 className="section-title">端到端物流解决方案</h2>
          </motion.div>

          <div className="services-grid">
            <ServiceCard
              icon={<Zap />}
              title="极速通关"
              desc="阿拉木图、霍尔果斯双口岸预清关，平均6小时完成"
              color="#6366F1"
              delay={0.1}
            />
            <ServiceCard
              icon={<Globe2 />}
              title="实时追踪"
              desc="GPS + IoT传感器，每30分钟更新位置和货况"
              color="#8B5CF6"
              delay={0.2}
            />
            <ServiceCard
              icon={<Shield />}
              title="全程保险"
              desc="与中国人保合作，货值100%承保，72小时理赔"
              color="#EC4899"
              delay={0.3}
            />
            <ServiceCard
              icon={<Truck />}
              title="多式联运"
              desc="铁路+公路智能组合，成本与时效最优平衡"
              color="#10B981"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Route Map Section */}
      <section className="route-section" id="route">
        <div className="section-wrapper">
          <motion.div
            className="section-head"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">物流网络</span>
            <h2 className="section-title">覆盖中欧的运输网络</h2>
          </motion.div>

          <div className="route-showcase">
            <DetailedRouteMap />
            <RouteInfo />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-modern" id="pricing">
        <div className="section-wrapper">
          <motion.div
            className="section-head"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">透明定价</span>
            <h2 className="section-title">按需选择运输方案</h2>
          </motion.div>

          <div className="pricing-cards">
            <PricingCard
              name="标准线路"
              price="2,800"
              time="10-12天"
              features={[
                "中欧班列整柜/拼柜",
                "标准清关服务",
                "基础保险",
                "在线追踪"
              ]}
              popular
            />
            <PricingCard
              name="快速通道"
              price="4,200"
              time="7-9天"
              features={[
                "铁路+公路组合",
                "优先清关",
                "全额保险",
                "专属客服"
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-modern" id="contact">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>开始您的跨境物流之旅</h2>
          <p>2小时响应 · 24小时出方案 · 48小时发运</p>
          <div className="cta-btns">
            <button className="cta-primary">
              <Mail size={20} />
              info@hpf.kz
            </button>
            <button className="cta-secondary">
              <ExternalLink size={20} />
              预约咨询
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Package size={28} />
              <span>HPF·KZ</span>
            </div>
            <p>专业的中欧跨境物流服务商</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>服务</h4>
              <a href="#freight">国际货运</a>
              <a href="#customs">清关服务</a>
              <a href="#tracking">物流追踪</a>
            </div>
            <div>
              <h4>公司</h4>
              <a href="#about">关于我们</a>
              <a href="#contact">联系方式</a>
              <a href="#news">新闻动态</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 HPF Kazakhstan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Component: StatItem
function StatItem({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="stat-box">
      <div className="stat-num">
        {value}<span className="stat-unit">{unit}</span>
      </div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}

// Component: ServiceCard
function ServiceCard({ icon, title, desc, color, delay }: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="service-modern-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="service-icon-modern" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="service-arrow">
        <ArrowRight size={20} />
      </div>
    </motion.div>
  );
}

// Component: RouteVisualization
function RouteVisualization({ mounted }: { mounted: boolean }) {
  return (
    <div className="route-viz">
      <svg width="100%" height="100%" viewBox="0 0 600 400">
        <defs>
          <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main Route Path */}
        <motion.path
          d="M 80 200 Q 200 150, 300 200 T 520 200"
          stroke="url(#routeGlow)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={mounted ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* City Points */}
        <CityPoint x={80} y={200} name="深圳" delay={0.5} />
        <CityPoint x={200} y={150} name="乌鲁木齐" delay={1} />
        <CityPoint x={300} y={200} name="阿拉木图" delay={1.5} />
        <CityPoint x={420} y={180} name="莫斯科" delay={2} />
        <CityPoint x={520} y={200} name="华沙" delay={2.5} />
      </svg>

      {/* Animated Truck */}
      <motion.div
        className="route-truck"
        initial={{ left: "10%", top: "50%" }}
        animate={{
          left: ["10%", "35%", "50%", "70%", "87%"],
          top: ["50%", "37%", "50%", "45%", "50%"]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Truck size={24} />
      </motion.div>
    </div>
  );
}

// Component: CityPoint
function CityPoint({ x, y, name, delay }: { x: number; y: number; name: string; delay: number }) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
    >
      <circle cx={x} cy={y} r="8" fill="#6366F1" />
      <circle cx={x} cy={y} r="12" fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.3" />
      <motion.circle
        cx={x}
        cy={y}
        r="16"
        fill="none"
        stroke="#6366F1"
        strokeWidth="1"
        opacity="0.2"
        animate={{ r: [16, 24], opacity: [0.2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x={x} y={y + 30} fontSize="12" fill="#64748B" textAnchor="middle" fontWeight="600">
        {name}
      </text>
    </motion.g>
  );
}

// Component: DetailedRouteMap
function DetailedRouteMap() {
  return (
    <div className="detailed-map">
      <div className="map-grid">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="grid-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
      <div className="route-overlay">
        <div className="route-node" style={{ left: '15%', top: '60%' }}>
          <div className="node-pulse"></div>
          <span>中国 · 深圳</span>
        </div>
        <div className="route-node" style={{ left: '35%', top: '40%' }}>
          <div className="node-pulse"></div>
          <span>中国 · 乌鲁木齐</span>
        </div>
        <div className="route-node" style={{ left: '50%', top: '50%' }}>
          <div className="node-pulse primary"></div>
          <span>哈萨克斯坦 · 阿拉木图</span>
        </div>
        <div className="route-node" style={{ left: '70%', top: '35%' }}>
          <div className="node-pulse"></div>
          <span>俄罗斯 · 莫斯科</span>
        </div>
        <div className="route-node" style={{ left: '85%', top: '55%' }}>
          <div className="node-pulse"></div>
          <span>波兰 · 华沙</span>
        </div>
      </div>
    </div>
  );
}

// Component: RouteInfo
function RouteInfo() {
  return (
    <div className="route-info-panel">
      <div className="info-card">
        <div className="info-icon">
          <MapPin size={24} />
        </div>
        <div>
          <h4>5个核心节点</h4>
          <p>覆盖中国、中亚、东欧核心城市</p>
        </div>
      </div>
      <div className="info-card">
        <div className="info-icon">
          <Truck size={24} />
        </div>
        <div>
          <h4>6,800公里</h4>
          <p>优化路线，比传统路线缩短15%</p>
        </div>
      </div>
      <div className="info-card">
        <div className="info-icon">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <h4>2个海关口岸</h4>
          <p>霍尔果斯、阿拉山口双通道保障</p>
        </div>
      </div>
    </div>
  );
}

// Component: PricingCard
function PricingCard({ name, price, time, features, popular }: {
  name: string;
  price: string;
  time: string;
  features: string[];
  popular?: boolean;
}) {
  return (
    <motion.div
      className={`pricing-card-modern ${popular ? 'popular' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {popular && <div className="popular-badge">推荐</div>}
      <h3>{name}</h3>
      <div className="price-tag">
        <span className="currency">¥</span>
        <span className="amount">{price}</span>
        <span className="unit">/吨</span>
      </div>
      <div className="time-tag">
        <CheckCircle2 size={16} />
        {time} 送达
      </div>
      <ul className="feature-list">
        {features.map((f, i) => (
          <li key={i}>
            <CheckCircle2 size={18} />
            {f}
          </li>
        ))}
      </ul>
      <button className={popular ? 'price-btn-primary' : 'price-btn-secondary'}>
        立即咨询
      </button>
    </motion.div>
  );
}
