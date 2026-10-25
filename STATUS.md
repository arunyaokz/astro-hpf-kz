# HPF.kz 官网状态

更新：2026-10-25（Asia/Almaty）

- 官网源码在 `/Users/arunyao/Developer/HPFKZ/website`，独立仓库 `arunyaokz/astro-hpf-kz`。
- 生产基准源码来自 `origin/codex/services-page` 的 `abf88a5`；`main` 旧于生产，不能直接覆盖。
- 本地分支 `codex/website-astro-update`：已接入并部署 EmDash 1.3.1 官网内容管理（新闻、服务介绍、路线网络、公司介绍）。Astro 7.4.2、Cloudflare 适配器14.4.1、MDX8.1.1、Wrangler4.152.0；Node>=22.23.4，本次用24.16.0。
- 后台 https://hpf.kz/_emdash/admin/ ，名称“华鹏飞 · 官网管理”，默认简体中文；新增三类页面栏目默认打开中文版本。
- **老板已自行完成登记**：`yao@hpf.kz` / YAO，管理员（role50）。使用通行密钥登录，没有独立密码。未代建或注册生产测试账号。
- 公开新闻列表：`/news/`、`/zh/news/`、`/ru/news/`；详情按语言与 slug 动态渲染。保存草稿、发布/撤回、定时发布、富文本及封面图由 EmDash 提供。翻译版本需要编辑人员自行录入与母语校对，没有接翻译模型。
- 新闻、服务介绍、路线网络、公司介绍与后台按请求渲染；其他官网页面保持静态预渲染。新增三语新闻导航；修正新闻详情 canonical 与语言链接。
- 官网专用 D1：`hpf-website-cms`（2ec63897-0d36-49a5-9ad2-0ac742f884fa）；R2：`hpf-website-media`；定时任务每分钟执行。密钥保存在 Cloudflare Secrets，受保护本地备份在被 Git 忽略的 `ops/production-snapshot/credentials/`。
- 本地完整验证通过：草稿匿名404→发布可见→撤回404、语言隔离、匿名创建401、图片上传及匿名读取。测试内容已清理。构建、TypeScript、发布模拟均通过；原有11项业务事实提醒仍待确认。
- 6个历史 CSS/JS 地址在生产已逐个恢复200。构建 postbuild 保留历史资源及依赖，防止旧HTML缓存继续404。线上中文首页浏览器检查：无失败图片、无400以上资源请求，新闻链接正确。
- 最终生产版本：`684d9474-a64b-433a-b241-c5351b10f1f0`，2026-10-25 发布。
- 发布详情、检查记录见 `ops/production-check.json`；使用说明见 `ops/EmDash新闻后台使用说明.md`。
- 当前改动尚未推送远端。正式后台高级插件等非新闻页面未逐屏完成中文验收。

## 官网页面接入（2026-10-25）

- 新增内容类型：`service_pages`（服务介绍）、`route_pages`（路线网络）、`company_pages`（公司介绍），各3个中英俄版本，共9条。翻译版本已关联；原正文、网址和版式原样迁移。
- 中文表单可编辑标题、说明、清单、路线节点、地图地名、使命愿景、法人展示资料、页面内联系表单文字与业务邮箱；首屏图片可从媒体库替换。现有结构的条目数量保持不变，清单文本每行一项。首页摘要和全站共用页脚仍使用原配置，不属于这三类内页的正文。
- 保存草稿不改变公开内容；支持签名预览、发布和定时发布。公开页面只读取对应语言的已发布版本；撤回后不再回退到代码旧文案。
- 发布策略会校验固定网址、完整结构及重复路线/服务类型。原始事实核验状态保留，没有把未核验信息自动标记为已核验。
- 已通过9页正文往返与迁移前后线上对比、本地草稿隔离/预览/发布/匿名写入保护、重复路线类型拒绝发布。线上路线图从中线切至北线成功，无失败图片或资源；新闻3入口及历史6资源均正常。
- 生产结构通过已登录管理员会话执行增量内容API创建；修改 seed 本身不会更新已有数据库。只新增模型和页面，未覆盖新闻或账号。迁移前可恢复时间点和72张原始表快照保存在被Git忽略的 `ops/production-snapshot/corporate-before/`。全文索引因D1整库导出限制跳过，可由原始内容重建。
- 数据源与中文字段模型：`src/cms/page-model.mjs`；首次导入文件：`src/cms/corporate-import.json`；运行时查询：`src/cms/pages.ts`；发布校验：`src/cms/page-policy.mjs`。
- 新验证脚本：`scripts/verify-corporate-local.py`（本地，结束后恢复测试前文案）、`scripts/verify-corporate-production.py`（只读线上，使用迁移前私有快照比较）。记录：`ops/corporate-production-check.json`。
- 使用说明：`ops/EmDash官网页面使用说明.md`。俄语仍为现有公开译文，此次未新增或自动重译对外文案。

## 本地运行与维护

`npm ci` 后 `npm run dev`（默认4321）。本地测试可使用官方 dev-bypass；生产 dev-bypass 返回403，禁止模拟生产用户登录。

回归：`python3 scripts/verify-news-local.py`、`python3 scripts/verify-media-local.py`；发布前 `npm run check`，通过后 `npm run deploy`。本地回归脚本固定使用 localhost，不要改到生产。

改绑定后重新运行 `npm run cf-typegen`。`emdash doctor` 的 data.db 缺失不适用于本项目D1部署，scheduler wiring 已通过。
