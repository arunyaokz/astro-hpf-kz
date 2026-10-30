# 运输产品（`products`）使用说明

2026-10-30 新增。hpf.kz 作为 Horiza 的商户独立站：HPF 在 Horiza 里把运输服务当产品维护（如中国至欧洲 TIR、电池危险品、冷链），同步到官网「运输产品」栏目。官网仍是宣传站，不是货代系统。

## 网址

| 页面 | 英文 | 中文 | 俄文 |
|---|---|---|---|
| 产品列表 | `/products/` | `/zh/products/` | `/ru/products/` |
| 产品详情 | `/products/<网址名>/` | `/zh/products/<网址名>/` | `/ru/products/<网址名>/` |

- 只显示本语言已发布的条目；草稿和其他语言互不串。
- 没填价格或询价标记为 `quote` 时显示「按需报价」。
- 「询价」按钮跳到公司介绍页的联系表单，并把产品名填进「货物」一栏（访客可改）。
- 顶部导航还没有「运输产品」入口：上线后在后台「顶部导航」里加一项（链接 `/products/`，中俄分别 `/zh/products/`、`/ru/products/`）。

## 字段

| 字段 | 谁维护 | 说明 |
|---|---|---|
| 产品名称、产品简介、价格、币种 | Horiza 同步 | 在 Horiza 改；官网后台改了会被下次同步覆盖 |
| 产品编号、产品版本、版本指纹、询价标记 | Horiza 同步 | 勿改；Horiza 靠它们认出自己管的条目 |
| 服务范围、服务区域 / 线路、时效、计价方式 | Horiza 同步 | 服务类产品发布前在 Horiza 填写并核对依据 |
| 产品分类、服务要点、产品图片、译文已校对 | 官网后台 | Horiza 不碰 |

没有「产品版本」的条目是人在官网后台手建的，Horiza 永远不改它。

## 和 Horiza 怎么接（现状）

- Horiza 后台同步模块已在本机对官网跑通：建草稿 → 人确认 → 发布，详情页显示服务资料和价格（`scripts/verify-horiza-sync-local.mts`）。
- 原来卡在 Horiza 的两处已在 Horiza 分支 `feat/emdash-site-locale`（提交 `957a39ab`，工作区 `~/Developer/horiza/cfos-emdash-locale-20261030`）改好，未合并、未发布：
  1. **多语言**：同步只读写指定语言（hpf.kz 定为英文）；按条目编号发布，中俄译稿不会被碰到。改前官网一有译稿就因「同名产品重复」停止。
  2. **按需报价**：网站经人核对「按需报价」显示无误后放行。改前一律拒写。
  还要在 Horiza 网站卡片上加「网站语言」和「询价展示已核对」两个设置，接到同步里，才能在后台用上。
- 中文、俄文版本暂由人在官网后台录入（翻译版本关联到同步来的条目），俄文须母语者校对。

## 上线步骤（需老板）

1. 生产结构：在已登录管理员的后台浏览器里，用 `scripts/corporate-browser-migration.mjs` 的 `migrateCorporateCollection` 读入 `src/cms/product-import.json` 的集合定义，只新增、不改已有内容。
2. `npm run check` 通过后 `npm run deploy`。
3. 后台「设置 → 安全」里给 Horiza 建令牌（权限：内容读写、媒体读写、结构只读），由老板粘进 Horiza 的网站卡片，AI 不经手。
4. Horiza 里补齐 3 个服务的真实时效和计价方式、发布产品，再「同步为草稿」→ 官网后台看草稿 →「审批并发布」。

## 回归

- `python3 scripts/verify-products-local.py`：结构、三语列表与详情、草稿隔离、按需报价、价格显示、匿名写入拒绝；测试条目自动删除。
- `HORIZA_OS=<Horiza 代码目录> node scripts/verify-horiza-sync-local.mts`：用 Horiza 同步模块写本机站点（英文、询价已核对），检查中文译稿不被改动；本机令牌和测试产品自动删除。只连 localhost。用 Horiza 现有 main 跑，询价和译稿两项会失败。
