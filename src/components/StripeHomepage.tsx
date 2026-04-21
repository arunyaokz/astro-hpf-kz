import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, CheckCircle2, TrendingUp, Globe2, Shield, Zap,
  Package, Truck, MapPin, Clock, Users, Award, BarChart3,
  ChevronRight, PlayCircle, Star, Building2, FileText, Phone
} from 'lucide-react';

export default function StripeHomepage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="stripe-homepage">
      {/* Navigation */}
      <nav className="stripe-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <Package size={28} />
            <span>HPF KZ</span>
          </div>
          <div className="nav-links">
            <a href="#services">服务</a>
            <a href="#solutions">解决方案</a>
            <a href="#pricing">价格</a>
            <a href="#cases">案例</a>
            <a href="#about">关于</a>
            <a href="#contact" className="nav-cta">联系我们</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Award size={16} />
              <span>中亚地区领先的跨境物流服务商</span>
            </div>
            <h1 className="hero-title">
              连接中国与欧洲的
              <span className="gradient-text">智能物流枢纽</span>
            </h1>
            <p className="hero-subtitle">
              通过哈萨克斯坦中转，我们为您提供最优化的跨境运输解决方案。
              平均运输时间仅需 12 天，比传统海运快 60%，比空运节省 70% 成本。
            </p>
            <div className="hero-actions">
              <button className="btn-primary">
                免费获取报价
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary">
                <PlayCircle size={20} />
                观看介绍视频
              </button>
            </div>

            {/* Live Stats */}
            <div className="hero-stats">
              <StatCard icon={<Package />} value="10,000+" label="月均货量（吨）" trend="+23%" />
              <StatCard icon={<Truck />} value="15+" label="覆盖国家" trend="+3" />
              <StatCard icon={<Clock />} value="12天" label="平均运输时间" trend="-2天" />
              <StatCard icon={<Users />} value="500+" label="企业客户" trend="+156" />
            </div>
          </div>

          {/* Interactive Map Visualization */}
          <div className="hero-visual">
            <div className="map-container">
              <div className="gradient-sphere" style={{ transform: `translateY(${scrollY * 0.2}px)` }}></div>
              <div className="route-lines">
                <svg width="100%" height="100%" viewBox="0 0 500 400">
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#635BFF" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#7928CA" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 50 200 Q 150 150, 250 200 T 450 200"
                    stroke="url(#routeGradient)"
                    strokeWidth="3"
                    fill="none"
                    className="animated-route"
                  />
                </svg>
                <div className="route-point" style={{ left: '10%', top: '50%' }}>
                  <div className="pulse-dot"></div>
                  <span>中国</span>
                </div>
                <div className="route-point" style={{ left: '50%', top: '50%' }}>
                  <div className="pulse-dot"></div>
                  <span>哈萨克斯坦</span>
                </div>
                <div className="route-point" style={{ left: '90%', top: '50%' }}>
                  <div className="pulse-dot"></div>
                  <span>欧洲</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section" id="trust" data-animate>
        <div className="section-container">
          <div className="trust-logos">
            <div className="trust-item">
              <Shield size={32} />
              <span>ISO 9001 认证</span>
            </div>
            <div className="trust-item">
              <Award size={32} />
              <span>中国海关 AEO 认证</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={32} />
              <span>欧盟 EORI 注册</span>
            </div>
            <div className="trust-item">
              <Star size={32} />
              <span>4.9/5.0 客户评分</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Enhanced */}
      <section className="features-section" id="services" data-animate>
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">核心服务</span>
            <h2>为您的业务量身定制的物流解决方案</h2>
            <p>从货物提取到最终交付，我们提供全链路、可追踪、高效率的跨境物流服务</p>
          </div>
          <div className="features-grid-enhanced">
            <ServiceCard
              icon={<Zap />}
              title="极速清关"
              description="专业清关团队 7×24 小时待命，平均通关时间仅需 6 小时"
              features={['电子化报关', '预清关服务', '关税优化咨询']}
              color="#635BFF"
            />
            <ServiceCard
              icon={<Globe2 />}
              title="全程可视化追踪"
              description="实时 GPS 追踪，智能预警系统，让您随时掌握货物动态"
              features={['实时位置更新', '温湿度监控', '异常自动告警']}
              color="#7928CA"
            />
            <ServiceCard
              icon={<Shield />}
              title="全程保险保障"
              description="与国际知名保险公司合作，提供全额货物保险"
              features={['全额保价', '快速理赔', '专属客服']}
              color="#00D4FF"
            />
            <ServiceCard
              icon={<Truck />}
              title="多式联运"
              description="公路、铁路、航空灵活组合，找到最优成本效率平衡点"
              features={['中欧班列', '公路运输', '空运加急']}
              color="#10B981"
            />
            <ServiceCard
              icon={<Package />}
              title="仓储服务"
              description="在中国、哈萨克斯坦、欧洲设有仓储中心，支持分拨配送"
              features={['温控仓库', '保税仓储', '库存管理']}
              color="#F59E0B"
            />
            <ServiceCard
              icon={<FileText />}
              title="单证服务"
              description="专业的单证团队处理各类进出口文件，确保合规无忧"
              features={['原产地证', '商检单', 'CO/FORM E']}
              color="#EF4444"
            />
          </div>
        </div>
      </section>

      {/* Live Tracking Demo */}
      <section className="tracking-section" id="tracking" data-animate>
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">技术创新</span>
            <h2>实时追踪系统演示</h2>
            <p>体验我们的智能物流管理平台</p>
          </div>
          <div className="tracking-demo">
            <div className="tracking-sidebar">
              <h3>当前在途货物</h3>
              <div className="tracking-list">
                <TrackingItem id="HPF-2026-0421-001" status="运输中" progress={65} location="阿拉木图" />
                <TrackingItem id="HPF-2026-0421-002" status="清关中" progress={85} location="杜伊斯堡" />
                <TrackingItem id="HPF-2026-0420-098" status="已送达" progress={100} location="华沙" />
              </div>
            </div>
            <div className="tracking-map">
              <div className="map-placeholder">
                <MapPin size={48} />
                <p>实时物流地图</p>
                <div className="map-stats">
                  <div><BarChart3 size={16} /> 当前在途：24 票</div>
                  <div><Clock size={16} /> 平均速度：850 km/天</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="pricing-section" id="pricing" data-animate>
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">透明定价</span>
            <h2>选择适合您的运输方案</h2>
            <p>灵活的定价模式，按需选择</p>
          </div>
          <div className="pricing-tabs">
            <button
              className={`tab ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => setActiveTab(0)}
            >
              <Truck size={20} />
              公路运输
            </button>
            <button
              className={`tab ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => setActiveTab(1)}
            >
              <TrendingUp size={20} />
              铁路运输
            </button>
            <button
              className={`tab ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => setActiveTab(2)}
            >
              <Zap size={20} />
              空运加急
            </button>
          </div>
          <div className="pricing-content">
            {activeTab === 0 && (
              <PricingCard
                title="公路运输"
                price="¥1,200"
                unit="/ 吨"
                time="14-16 天"
                features={[
                  '适合大宗货物',
                  '灵活的装卸时间',
                  '门到门服务',
                  '实时 GPS 追踪',
                  '货物保险'
                ]}
              />
            )}
            {activeTab === 1 && (
              <PricingCard
                title="铁路运输（中欧班列）"
                price="¥2,800"
                unit="/ 吨"
                time="10-12 天"
                features={[
                  '最佳性价比',
                  '准时准点',
                  '大批量优惠',
                  '整柜 / 拼柜可选',
                  '海关协助'
                ]}
                recommended
              />
            )}
            {activeTab === 2 && (
              <PricingCard
                title="空运加急"
                price="¥8,500"
                unit="/ 吨"
                time="3-5 天"
                features={[
                  '最快时效',
                  '适合高价值货物',
                  '专人监管',
                  '特殊物品运输',
                  '全程冷链可选'
                ]}
              />
            )}
          </div>
        </div>
      </section>

      {/* Customer Cases */}
      <section className="cases-section" id="cases" data-animate>
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">客户案例</span>
            <h2>他们都信赖我们</h2>
            <p>来自不同行业的成功案例</p>
          </div>
          <div className="cases-grid">
            <CaseCard
              company="某电商平台"
              industry="跨境电商"
              challenge="旺季时需要将大批货物快速运往欧洲"
              solution="使用我们的铁路 + 公路组合方案，时效稳定，成本降低 35%"
              result="月均运量从 50 吨增长到 300 吨"
            />
            <CaseCard
              company="某制造企业"
              industry="机械制造"
              challenge="大型设备运输，对时效和安全性要求极高"
              solution="定制化运输方案，配备专业装卸设备和全程保险"
              result="100% 准时送达，零损坏记录"
            />
            <CaseCard
              company="某快消品牌"
              industry="食品饮料"
              challenge="需要温控运输，保证产品新鲜度"
              solution="全程冷链运输 + 快速清关，确保产品品质"
              result="货损率降低至 0.1%，客户满意度 99%"
            />
          </div>
        </div>
      </section>

      {/* Process Section - Enhanced */}
      <section className="process-section" id="process" data-animate>
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">服务流程</span>
            <h2>四步完成跨境物流</h2>
            <p>简单高效的操作流程，让国际运输像国内快递一样简单</p>
          </div>
          <div className="process-timeline-enhanced">
            <ProcessStepEnhanced
              number="01"
              title="需求对接"
              description="在线提交或电话咨询，我们的专家团队将在 2 小时内响应"
              details={['货物信息评估', '路线方案设计', '报价单生成']}
              icon={<Phone />}
            />
            <ProcessStepEnhanced
              number="02"
              title="货物揽收"
              description="上门提货，专业包装，准备跨境运输所需的各类单证"
              details={['免费上门提货', '专业包装加固', '单证准备齐全']}
              icon={<Package />}
            />
            <ProcessStepEnhanced
              number="03"
              title="跨境运输"
              description="通过优化的中欧路线运输，全程实时追踪，智能预警"
              details={['多点实时更新', 'GPS 轨迹查询', '异常自动通知']}
              icon={<Truck />}
            />
            <ProcessStepEnhanced
              number="04"
              title="送达交付"
              description="目的地清关、配送到门，提供完整的运输报告和签收凭证"
              details={['协助目的地清关', '最后一公里配送', '电子签收单']}
              icon={<CheckCircle2 />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>准备开始您的跨境物流之旅？</h2>
            <p>立即联系我们，获取专属物流解决方案和优惠报价</p>
            <div className="cta-features">
              <div><CheckCircle2 size={20} /> 2 小时快速响应</div>
              <div><CheckCircle2 size={20} /> 免费方案设计</div>
              <div><CheckCircle2 size={20} /> 首单立减 5%</div>
            </div>
            <div className="cta-actions">
              <button className="btn-primary-large">
                免费咨询
                <ArrowRight size={24} />
              </button>
              <button className="btn-secondary-large">
                <Phone size={20} />
                400-XXX-XXXX
              </button>
            </div>
          </div>
          <div className="cta-visual">
            <div className="floating-card">
              <Building2 size={32} />
              <h4>企业客户</h4>
              <p>专属客户经理</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="stripe-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col-main">
              <div className="footer-logo">
                <Package size={32} />
                <span>HPF KZ</span>
              </div>
              <p>专业的跨境物流服务提供商，连接中国与欧洲的智能物流枢纽</p>
              <div className="footer-contact">
                <div><Phone size={16} /> 400-XXX-XXXX</div>
                <div><Globe2 size={16} /> info@hpf.kz</div>
              </div>
            </div>
            <div className="footer-col">
              <h5>核心服务</h5>
              <a href="#international">国际货运</a>
              <a href="#customs">清关服务</a>
              <a href="#warehouse">仓储服务</a>
              <a href="#tracking">物流追踪</a>
            </div>
            <div className="footer-col">
              <h5>解决方案</h5>
              <a href="#ecommerce">跨境电商</a>
              <a href="#manufacturing">制造业</a>
              <a href="#retail">零售业</a>
              <a href="#fmcg">快消品</a>
            </div>
            <div className="footer-col">
              <h5>公司</h5>
              <a href="#about">关于我们</a>
              <a href="#team">团队介绍</a>
              <a href="#news">新闻动态</a>
              <a href="#careers">加入我们</a>
            </div>
            <div className="footer-col">
              <h5>资源</h5>
              <a href="#blog">博客</a>
              <a href="#docs">帮助中心</a>
              <a href="#api">API 文档</a>
              <a href="#support">客户支持</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 HPF KZ. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">隐私政策</a>
              <a href="#terms">服务条款</a>
              <a href="#cookies">Cookie 设置</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component: StatCard
function StatCard({ icon, value, label, trend }: { icon: React.ReactNode; value: string; label: string; trend: string }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-data">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        <div className="stat-trend">{trend}</div>
      </div>
    </div>
  );
}

// Component: ServiceCard
function ServiceCard({ icon, title, description, features, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
}) {
  return (
    <div className="service-card">
      <div className="service-icon" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="service-features">
        {features.map((feature, i) => (
          <li key={i}>
            <CheckCircle2 size={16} />
            {feature}
          </li>
        ))}
      </ul>
      <button className="service-cta">
        了解详情 <ChevronRight size={16} />
      </button>
    </div>
  );
}

// Component: TrackingItem
function TrackingItem({ id, status, progress, location }: {
  id: string;
  status: string;
  progress: number;
  location: string;
}) {
  return (
    <div className="tracking-item">
      <div className="tracking-header">
        <span className="tracking-id">{id}</span>
        <span className={`tracking-status status-${status}`}>{status}</span>
      </div>
      <div className="tracking-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{progress}%</span>
      </div>
      <div className="tracking-location">
        <MapPin size={14} />
        {location}
      </div>
    </div>
  );
}

// Component: PricingCard
function PricingCard({ title, price, unit, time, features, recommended }: {
  title: string;
  price: string;
  unit: string;
  time: string;
  features: string[];
  recommended?: boolean;
}) {
  return (
    <div className={`pricing-card ${recommended ? 'recommended' : ''}`}>
      {recommended && <div className="pricing-badge">推荐方案</div>}
      <h3>{title}</h3>
      <div className="pricing-price">
        <span className="price-value">{price}</span>
        <span className="price-unit">{unit}</span>
      </div>
      <div className="pricing-time">
        <Clock size={16} />
        运输时效：{time}
      </div>
      <ul className="pricing-features">
        {features.map((feature, i) => (
          <li key={i}>
            <CheckCircle2 size={18} />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`pricing-button ${recommended ? 'primary' : 'secondary'}`}>
        获取报价 <ArrowRight size={18} />
      </button>
    </div>
  );
}

// Component: CaseCard
function CaseCard({ company, industry, challenge, solution, result }: {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
}) {
  return (
    <div className="case-card">
      <div className="case-header">
        <Building2 size={24} />
        <div>
          <h4>{company}</h4>
          <span className="case-industry">{industry}</span>
        </div>
      </div>
      <div className="case-content">
        <div className="case-section">
          <h5>挑战</h5>
          <p>{challenge}</p>
        </div>
        <div className="case-section">
          <h5>方案</h5>
          <p>{solution}</p>
        </div>
        <div className="case-section highlight">
          <h5>成果</h5>
          <p>{result}</p>
        </div>
      </div>
    </div>
  );
}

// Component: ProcessStepEnhanced
function ProcessStepEnhanced({ number, title, description, details, icon }: {
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}) {
  return (
    <div className="process-step-enhanced">
      <div className="step-icon-wrapper">
        <div className="step-icon">{icon}</div>
        <div className="step-number">{number}</div>
      </div>
      <div className="step-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className="step-details">
          {details.map((detail, i) => (
            <li key={i}>
              <CheckCircle2 size={14} />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
