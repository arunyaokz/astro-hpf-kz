# EmDash 与 Codex 图文草稿流程

## 可复用运营技能（2026-10-26）

使用 `$hpf-emdash-ops`（华鹏飞三语图文运营）。在已明确的华鹏飞官网运营上下文中，以后只提供选题即可：Codex 负责查资料、中文写作、内置生图、中俄哈翻译、图片入库和三语关联草稿，默认不发布，俄哈稿待本地母语校对。其他项目的选题不自动写入本官网。

技能源码：`skills/hpf-emdash-ops/SKILL.md`；个人安装位置：`~/.codex/skills/hpf-emdash-ops/`。新的通用入库工具为该技能的 `scripts/draft-bundle.mjs`，按每篇 `bundle.json` 读取标题、摘要、来源、三语正文与图片，不再写死首篇内容。它记录回执和待确认写入、检查同名内容及并发锁，遇到冲突停止，不发布、不覆盖现有文章。格式与恢复规则见技能中的 `references/bundle-format.md`。

原有 `scripts/emdash-draft-workflow.mjs` 保留为下方首篇样板，不作为新选题通用入口。

## 连接

站点：`https://hpf.kz`；连接名：`hpf-emdash`；MCP：`https://hpf.kz/_emdash/api/mcp`。

已通过 Codex 官方 CLI 添加，并由姚总在浏览器批准 OAuth。凭据由 Codex 管理，不保存在网站源码、脚本或草稿文件中。授权范围：内容读写、媒体读写、内容模型只读；没有站点管理、数据库模型修改或整站导出权限。内容写权限本身包含更多操作，本批脚本额外限制为草稿，不提供发布、定时发布、删除和修改站点设置的调用入口。

后续会话可直接使用 `hpf-emdash` 的 MCP 工具；如果当前会话尚未刷新工具列表，可使用项目内的桥接脚本。该脚本调用 Codex App Server 官方接口，只建立内存中的临时工具会话，不运行另一个模型、不保存新的聊天。依赖当前 Codex CLI 的实验接口，CLI 升级后应重新验证。

## 每篇图文

1. 确定读者和选题，查阅一手来源，区分事实、公司说法与编辑建议。
2. 写中文原稿，准备俄文和哈文译稿；未人工校对前始终保持 `native_reviewed=false`。
3. 使用 Codex 内置生图，保存图片原件及完整提示词；明确 AI 插画与真实公司资产的区别。
4. 读取 `news` 字段模型，上传封面，使用返回的媒体 ID 绑定三语稿件。
5. 建立中文草稿，再以 `translationOf` 建立俄哈版本；正文由 MCP 将 Markdown 转为富文本。
6. 回读三份稿件，检查语言、正文、封面、校对状态、未发布/未定时状态及翻译关联。
7. 匿名读取图片并比对文件摘要；匿名访问草稿必须404；最后在中文后台查看实际编辑页。

## 历史首篇样板

目录：`ops/editorial/middle-corridor-shipping-checklist-20261025/`。其中 `zh.md`、`ru.md`、`kk.md` 为三语原稿；`cover.png` 为生成封面；`image-prompt.txt` 保存完整生图提示词；`receipt.json` 为实际媒体、草稿及验证回执。

执行草稿入库与验证：

```sh
node scripts/emdash-draft-workflow.mjs ops/editorial/middle-corridor-shipping-checklist-20261025
```

使用 Node 24 或项目要求的兼容版本。脚本保存每步回执，重跑会复用已创建的媒体和草稿，不覆盖已发布内容；同批稿件重试前仍应核对回执。它是本篇样板的可重复执行程序，选题、摘要与语言文案写在脚本及稿件文件内；扩展到新的选题需要替换这些内容，不能把它当成任意文章的通用生成器。

读取新闻模型：

```sh
printf '{"slug":"news"}\n' > /tmp/hpf-news-schema-input.json
node scripts/emdash-mcp.mjs schema_get_collection /tmp/hpf-news-schema-input.json
```

若授权过期，使用 `codex mcp login hpf-emdash` 重新登录。不要将 token 粘贴进聊天或源码。

## 哈语边界

CMS 需要在 Astro 语言配置中启用 `kk` 才能保存关联的哈语草稿。启用 CMS 语言不等于哈语官网已上线；公开哈语导航、布局和新闻详情页不属于本次任务。俄哈文必须真实完成本地母语校对后才可改为已校对。文章发布是后续单独操作。
