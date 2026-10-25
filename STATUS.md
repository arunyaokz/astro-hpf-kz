# HPF.kz 官网状态

更新：2026-10-25（Asia/Almaty）

- 官网源码在 `/Users/arunyao/Developer/HPFKZ/website`，独立仓库 `arunyaokz/astro-hpf-kz`。
- 生产基准源码来自 `origin/codex/services-page` 的 `abf88a5`；`main` 旧于生产，不能直接覆盖。
- 本地分支 `codex/website-astro-update`：已接入并部署 EmDash 1.3.1 新闻管理。Astro 7.4.2、Cloudflare 适配器14.4.1、MDX8.1.1、Wrangler4.152.0；Node>=22.23.4，本次用24.16.0。
- 后台 https://hpf.kz/_emdash/admin/ ，默认简体中文，新闻编辑和初始化相关缺失译文另有本地补充。
- **老板已自行完成登记**：`yao@hpf.kz` / YAO，管理员（role50）。使用通行密钥登录，没有独立密码。未代建或注册生产测试账号。
- 公开新闻列表：`/news/`、`/zh/news/`、`/ru/news/`；详情按语言与 slug 动态渲染。保存草稿、发布/撤回、定时发布、富文本及封面图由 EmDash 提供。翻译版本需要编辑人员自行录入与母语校对，没有接翻译模型。
- 仅新闻与后台按请求渲染，原有官网页面保持静态预渲染。新增三语新闻导航；修正新闻详情 canonical 与语言链接。
- 官网专用 D1：`hpf-website-cms`（2ec63897-0d36-49a5-9ad2-0ac742f884fa）；R2：`hpf-website-media`；定时任务每分钟执行。密钥保存在 Cloudflare Secrets，受保护本地备份在被 Git 忽略的 `ops/production-snapshot/credentials/`。
- 本地完整验证通过：草稿匿名404→发布可见→撤回404、语言隔离、匿名创建401、图片上传及匿名读取。测试内容已清理。构建、TypeScript、发布模拟均通过；原有11项业务事实提醒仍待确认。
- 6个历史 CSS/JS 地址在生产已逐个恢复200。构建 postbuild 保留历史资源及依赖，防止旧HTML缓存继续404。线上中文首页浏览器检查：无失败图片、无400以上资源请求，新闻链接正确。
- 最终生产版本：`f1f6310c-beac-4a18-863f-7ed2cf4ae825`，2026-10-25 发布。
- 发布详情、检查记录见 `ops/production-check.json`；使用说明见 `ops/EmDash新闻后台使用说明.md`。
- 当前改动尚未推送远端。正式后台高级插件等非新闻页面未逐屏完成中文验收。

## 本地运行与维护

`npm ci` 后 `npm run dev`（默认4321）。本地测试可使用官方 dev-bypass；生产 dev-bypass 返回403，禁止模拟生产用户登录。

回归：`python3 scripts/verify-news-local.py`、`python3 scripts/verify-media-local.py`；发布前 `npm run check`，通过后 `npm run deploy`。本地回归脚本固定使用 localhost，不要改到生产。

改绑定后重新运行 `npm run cf-typegen`。`emdash doctor` 的 data.db 缺失不适用于本项目D1部署，scheduler wiring 已通过。
