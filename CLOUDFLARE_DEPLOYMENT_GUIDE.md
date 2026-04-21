# Cloudflare Pages 部署指南

## 方式一：通过 Dashboard 手动部署

### 步骤 1：登录 Cloudflare
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 登录您的账户

### 步骤 2：创建 Pages 项目
1. 在左侧菜单选择 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Pages** 标签
4. 点击 **Connect to Git**

### 步骤 3：连接 GitHub 仓库
1. 选择 **GitHub** 作为 Git 提供商
2. 授权 Cloudflare 访问您的 GitHub 账户
3. 选择仓库：`arunyaokz/astro-hpf-kz`
4. 选择分支：`claude/upgrade-astro-011CUKou1CV2yHogHrwXkfC9`

### 步骤 4：配置构建设置

**Framework preset**: `Astro`

**构建配置**:
```
构建命令 (Build command):     npm run build
构建输出目录 (Build output):   dist
根目录 (Root directory):      /
```

**环境变量** (可选):
暂无需要，保持为空

### 步骤 5：部署
1. 点击 **Save and Deploy**
2. 等待首次部署完成（约 2-3 分钟）
3. 部署成功后，Cloudflare 会提供一个 `*.pages.dev` 域名

---

## 方式二：通过 Wrangler CLI 部署

### 前提条件
由于您在云环境中，需要先获取 Cloudflare API Token：

1. 访问 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. 点击 **Create Token**
3. 使用模板 **Edit Cloudflare Workers**
4. 复制生成的 Token

### 本地配置
```bash
# 设置环境变量
export CLOUDFLARE_API_TOKEN="your-token-here"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"

# 部署
npm run deploy
```

---

## 方式三：使用 Direct Upload（快速测试）

如果只是想快速预览，可以使用 direct upload：

```bash
# 构建项目
npm run build

# 使用 wrangler 上传（需要 API token）
npx wrangler pages deploy dist --project-name=astro-hpf-kz
```

---

## 部署后配置

### 自定义域名
1. 在 Pages 项目设置中，点击 **Custom domains**
2. 添加您的域名（例如：`hpf.kz`）
3. 按照指示配置 DNS 记录

### 环境变量
如果未来需要配置环境变量：
1. 进入项目设置 **Settings** > **Environment variables**
2. 添加需要的变量
3. 重新部署

### 自动部署
连接 GitHub 后，每次推送到指定分支都会自动触发部署。

---

## 当前项目信息

- **仓库**: `arunyaokz/astro-hpf-kz`
- **分支**: `claude/upgrade-astro-011CUKou1CV2yHogHrwXkfC9`
- **Astro 版本**: 6.1.8
- **适配器**: @astrojs/cloudflare 13.1.10
- **构建命令**: `npm run build`
- **输出目录**: `dist`

---

## 故障排查

### 构建失败
- 检查 Node.js 版本是否为 18+ 
- 查看构建日志中的错误信息
- 确认 `package.json` 中的依赖完整

### 运行时错误
- 查看 Functions 日志
- 确认环境变量配置正确
- 检查 Cloudflare Workers 兼容性

### 性能优化
- 启用 **Asset optimization**（Cloudflare 自动优化图片、CSS、JS）
- 配置 **Cache Rules**
- 使用 **Analytics** 监控性能

---

## 推荐配置

Cloudflare Pages 提供以下功能，建议启用：

✅ **Auto minify**: CSS、JavaScript、HTML  
✅ **Brotli compression**  
✅ **Always Online**  
✅ **HTTP/3 (QUIC)**  
✅ **0-RTT Connection Resumption**  

---

## 预期结果

部署成功后，您将获得：

1. **生产环境 URL**: `https://astro-hpf-kz.pages.dev`
2. **预览环境**: 每个分支/PR 都有独立预览 URL
3. **自动 HTTPS**: 免费 SSL 证书
4. **全球 CDN**: Cloudflare 全球边缘网络加速
5. **无限带宽**: 免费计划包含无限流量

---

## 下一步

部署完成后，您可以：
- 在 **Analytics** 查看访问数据
- 在 **Functions** 查看 SSR 日志
- 在 **Deployments** 查看历史部署记录
- 配置 **Access** 添加访问控制（可选）
