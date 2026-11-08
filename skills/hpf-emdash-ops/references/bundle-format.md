# 稿件包格式

`bundle.json` 是文章元数据，不含 token 或图片 base64。所有文件与它放在同一稿件目录，文件名可以自定义；路径必须在该目录内。slug 使用无日期的唯一英文短名，目录日期使用 Asia/Almaty 当天日期。

```json
{
  "version": 1,
  "topic": "阿拉木图仓储分拨如何衔接跨境运输",
  "slug": "almaty-warehouse-cross-border-handover",
  "category": "行业分析",
  "verificationStatus": "分析观点",
  "authorName": "HPF.kz",
  "sources": ["https://example.org/source-actually-read"],
  "image": {
    "file": "cover.png",
    "promptFile": "image-prompt.txt",
    "contentType": "image/png"
  },
  "entries": {
    "zh": {"file": "zh.md", "description": "本篇中文摘要。", "alt": "本篇封面中文描述。", "caption": "AI 概念插画，非真实现场或 HPF 自有资产照片。"},
    "ru": {"file": "ru.md", "description": "Краткое содержание статьи.", "alt": "Описание обложки.", "caption": "Концептуальная иллюстрация ИИ, не фотография реального объекта или активов HPF."},
    "kk": {"file": "kk.md", "description": "Мақаланың қысқаша мазмұны.", "alt": "Мұқабаның сипаттамасы.", "caption": "ЖИ жасаған тұжырымдамалық иллюстрация, нақты нысанның немесе HPF активтерінің фотосуреті емес."}
  }
}
```

这是格式示例。真实文章必须替换题目、摘要、图像描述、来源与正文，不得把示例网址当作核验来源。每个 Markdown 文件第一行为本语言 `# 标题`，其余为正文；不需要 YAML frontmatter。来源链接必须在三份正文中保留。图像说明与末尾 AI 初译待校对说明使用各语言自然表达。

- 当前分类：公司动态、路线动态、市场观察、行业分析；以实时 schema 为准。
- 核验状态：待核验、公司一手信息、公开来源已核验、分析观点。实务建议一般用“分析观点”；“公司一手信息”需真实公司资料/确认，“公开来源已核验”需正文事实受来源支持。一般文章须有来源。没有外部来源的内部确认稿可用 `sources: []`，同时明确 `sourceNote` 记录用户提供的事实依据，并选择“公司一手信息”或“分析观点”；不能据此虚构确认。
- `image.contentType` 支持 PNG、JPEG、WebP，并核对实际文件头。保留原图，不需为本流程额外加工。
- `description` 用于摘要和 SEO；不为凑长度牺牲准确性。三语正文内容应一致，标题不用逐词直译。
- 正文比对覆盖普通 Markdown 标题、段落、列表和链接。复杂表格、自定义嵌入等可能需要另行适配比对；校验失败不能直接跳过并声称完成。

## 执行

用实际技能所在目录替换 `$SKILL_DIR`，并使用完整稿件包路径：

```sh
node "$SKILL_DIR/scripts/draft-bundle.mjs" /完整路径/bundle.json --validate-only
node "$SKILL_DIR/scripts/draft-bundle.mjs" /完整路径/bundle.json
```

Node 24 已在此项目验证。原生 MCP 可用时直接查 schema/内容；这个程序用于免打印 base64 的文件上传、关联和回执。桥接脚本使用本机 `codex` CLI 与已有 `hpf-emdash` OAuth，不要求 OpenAI API key；生图由当前 Codex 会话内置工具先完成。

脚本仅对固定 `https://hpf.kz` 的 `news` 集合写入，不接受目标网站、发布状态或其他集合参数。它只创建草稿，不修改现有条目。保存的 `receipt.json` 包含稿件指纹、媒体ID、三稿ID、三语后台链接及各项回读结果。

## 重试与恢复

- 每次写入前保存 pending 标记，成功后立即保存返回ID。不得同时运行同一个稿件包；程序持有目录锁。
- 中途失败后沿用原包和回执。已知ID的草稿先回读，内容/状态不符就停止，不自动覆盖。
- 某次创建的响应丢失：远端可能已有同slug稿件。脚本会停止，使用原生 `content_get` / `content_list` 核对原稿全部字段、封面和翻译组后才能手动回填对应ID；不要删除该稿件或另建一组。无法证实时报告待确认，不宣称完成。
- 图片上传调用按文件内容去重，但遇到 pending 且无回执仍先查看媒体库，确认文件/ID；不盲目新增上传。
- 原包发生变化时不复用旧回执。若只是纠错更新旧稿件，作为明确的更新任务读取 `_rev` 后使用原生工具操作，仍保持草稿；本创建程序不会覆盖它。
- 拒绝同名但不在回执中的稿件，即便它是草稿；不自动认领他人内容。并行创建冲突也不能靠改写已存在内容解决。
- 锁文件残留时先确认原进程已退出，再删除本篇 `.draft-bundle.lock`；不要删除其他任务的锁。
