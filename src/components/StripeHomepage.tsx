import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Globe2, Shield, Zap } from 'lucide-react';

export default function StripeHomepage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="stripe-homepage">
      {/* Navigation */}
      <nav className="stripe-nav">
        <div className="nav-container">
          <div className="nav-logo">HPF KZ</div>
          <div className="nav-links">
            <a href="#services">服务</a>
            <a href="#solutions">解决方案</a>
            <a href="#about">关于</a>
            <a href="#contact" className="nav-cta">联系我们</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              跨境物流的
              <span className="gradient-text">现代化基础设施</span>
            </h1>
            <p className="hero-subtitle">
              为中国与欧洲之间的货物运输提供智能、可靠、快速的端到端物流解决方案
            </p>
            <div className="hero-actions">
              <button className="btn-primary">
                开始使用
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary">了解更多</button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">15+</div>
                <div className="stat-label">覆盖国家</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">24/7</div>
                <div className="stat-label">实时追踪</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">12天</div>
                <div className="stat-label">平均运输时间</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="gradient-sphere" style={{ transform: `translateY(${scrollY * 0.2}px)` }}></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>为现代物流而构建</h2>
            <p>一站式跨境物流平台，让货物运输变得简单高效</p>
          </div>
          <div className="features-grid">
            <FeatureCard
              icon={<Zap />}
              title="极速通关"
              description="专业的清关团队和完善的流程，确保货物快速通过各国海关，平均通关时间缩短40%"
            />
            <FeatureCard
              icon={<Globe2 />}
              title="全程可视化"
              description="实时追踪每一批货物的位置和状态，通过智能系统随时掌握物流动态，透明可靠"
            />
            <FeatureCard
              icon={<Shield />}
              title="安全保障"
              description="全程保险覆盖，多重安全检查，确保货物完整无损送达目的地"
            />
            <FeatureCard
              icon={<TrendingUp />}
              title="智能调度"
              description="AI驱动的路线优化系统，自动选择最优运输方案，降低成本提升效率"
            />
            <FeatureCard
              icon={<CheckCircle2 />}
              title="合规认证"
              description="持有中国、哈萨克斯坦、欧盟等多国物流资质，确保业务合法合规"
            />
            <FeatureCard
              icon={<ArrowRight />}
              title="门到门服务"
              description="提供从货物提取到最终交付的全链路服务，无需客户操心中间环节"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="section-container">
          <div className="section-header">
            <h2>简单明了的运输流程</h2>
            <p>四步完成跨境物流，让国际运输像国内快递一样简单</p>
          </div>
          <div className="process-timeline">
            <ProcessStep
              number="01"
              title="提交需求"
              description="在线提交运输需求，我们的专家团队将在2小时内响应并提供定制方案"
            />
            <ProcessStep
              number="02"
              title="货物集结"
              description="我们到您指定地点提取货物，进行专业包装和分类，准备跨境运输"
            />
            <ProcessStep
              number="03"
              title="跨境运输"
              description="通过中国-哈萨克斯坦-欧洲优化路线运输，全程监控确保安全高效"
            />
            <ProcessStep
              number="04"
              title="完成交付"
              description="货物安全送达目的地，提供签收凭证和完整的运输报告"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>准备开始您的跨境物流之旅？</h2>
          <p>立即联系我们，获取专属物流解决方案</p>
          <button className="btn-primary-large">
            免费咨询
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="stripe-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>HPF KZ</h4>
              <p>专业的跨境物流服务提供商</p>
            </div>
            <div className="footer-col">
              <h5>服务</h5>
              <a href="#international">国际货运</a>
              <a href="#customs">清关服务</a>
              <a href="#warehouse">仓储服务</a>
            </div>
            <div className="footer-col">
              <h5>公司</h5>
              <a href="#about">关于我们</a>
              <a href="#contact">联系方式</a>
              <a href="#careers">加入我们</a>
            </div>
            <div className="footer-col">
              <h5>资源</h5>
              <a href="#blog">博客</a>
              <a href="#docs">文档</a>
              <a href="#support">支持</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 HPF KZ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="process-step">
      <div className="step-number">{number}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
