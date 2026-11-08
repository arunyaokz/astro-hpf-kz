# astro-hpf-kz 项目指令

> 项目：HPF.kz 主网站
> 技术栈：Astro + TypeScript + Tailwind CSS
> 最后更新：2026-10-26

---

## 项目上下文

**用途**：HPF.kz公司官方网站，面向中国贸易商、哈国本地客户、欧洲收货方  
**语言**：中文 / 英文 / 俄文（三语并行）  
**部署**：Cloudflare Workers（wrangler.json配置）

---

## 关键文件映射

| 文件/目录 | 内容 | 修改频率 |
|-----------|------|----------|
| `src/consts.ts` | 品牌常量、服务数据、路线信息 | 高 |
| `src/content/` | 页面内容（Astro Content Collections） | 高 |
| `src/components/` | UI组件 | 中 |
| `src/pages/` | 路由和页面结构 | 低 |
| `src/styles/` | 全局样式 | 低 |
| `DESIGN_UPGRADE.md` | 设计升级记录（参考，不修改） | — |
| `COPYWRITING_UPGRADE_SUMMARY.md` | 文案升级记录（参考，不修改） | — |

---

## 任务执行规则

1. 修改内容前先读 `src/consts.ts` 确认现有数据结构
2. 所有文案修改须符合 `/_context/brand-voice.md` 规范
3. 三语内容必须同步更新，不得只改一种语言
4. 不得修改 `wrangler.json` 除非明确要求
5. 样式修改优先使用现有Tailwind类，不新增自定义CSS

---

## 设计规范（来自现有文档）

- 遵循2025国际审美，高信息密度
- 参考 `DAO_DE_JING_DESIGN_PHILOSOPHY.md` 的设计哲学
- 禁止过度装饰，功能优先

---

## 常见任务模板

**官网图文运营**：使用个人技能 `$hpf-emdash-ops`，源码在 `skills/hpf-emdash-ops/SKILL.md`。已明确为华鹏飞官网运营时，用户只给选题即可完成写作、生图、图片入库和中俄哈关联草稿；默认不发布，俄哈稿始终待真实母语校对。不要将其他项目选题自动写入本官网。新选题使用技能内通用稿件包工具，不复用首篇写死内容的样板脚本。

**更新服务内容**：先读 `src/consts.ts` → 确认数据字段 → 更新内容 → 检查三语一致性  
**新增页面**：先看 `src/pages/` 结构 → 复用现有layout → 遵循命名规范  
**修改样式**：先截图现状 → 列出变更清单 → 逐步修改 → 对比验证
