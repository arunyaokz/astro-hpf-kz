# 官网联系点击统计（2026-11-05）

线上 Worker 版本 `d88e0ce2-dd88-4da3-9cda-974402618d6d`，基于原线上版本 `60096d5f-004f-4d03-8025-f425d93d22d3` 对应源码 `218d1b2` 构建。源代码改动同时保存在当前工作区，未提交。

公开页面点击邮件、电话、WhatsApp 链接分别记为 `email`、`phone`、`whatsapp`；通过校验的询盘表单提交尝试记为 `enquiry`。只记录阿拉木图日期、类型和次数，不保存访客标识、表单内容或联系方式。点击或提交尝试不证明对方拨通、发出邮件或发送消息。自动化请求、阻止脚本或断网都可能影响统计；无法计算去重人数。历史点击无法回溯。

数据表为官网 D1 的 `hpf_contact_clicks`，结构见 `contact-analytics-schema.sql`。查询：

```sh
npx wrangler d1 execute hpf-website-cms --remote --command "SELECT day,event,count FROM hpf_contact_clicks ORDER BY day DESC,event"
```

Cloudflare Web Analytics 已启用，查看访客需按主机筛选官网，以免混入子域名。页脚电话和 WhatsApp 当前按用户提供号码写在模板中，今后更换号码须同步修改模板及哈语页脚。

本地 Worker 模拟邮箱事件写入成功；线上模拟事件成功写入后扣除了测试的 1 次。线上主要页面和脚本返回 200；后台跳转登录（303）。桌面内置浏览器打开官网遇到 QUIC 错误，未完成真实浏览器点击验收。
