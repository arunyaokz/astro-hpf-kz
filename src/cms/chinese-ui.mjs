// EmDash 1.3.1 ships a partial zh-CN catalogue. Fill the remaining news-editing
// labels at build time, without changing installed packages or user content.
const words = {
  'Unpublish {itemLabel}':'撤下{itemLabel}','Unpublish ':'撤下','Unpublished':'未发布','Unpublished changes':'未发布的修改','Filter by date range: {rangeLabel}':'按日期范围筛选：{rangeLabel}','Filter by date range: ':'按日期范围筛选：',
  'Clear selection':'清除选择','Show options':'显示选项','Close settings':'关闭设置','Created and updated':'创建与更新时间','Drag to reorder ':'拖动以调整顺序：','URL & language':'网址与语言','Choose bylines':'选择署名','Why are bylines shown in this order?':'为什么署名按此顺序显示？','Why is this important for social sharing?':'这对社交分享有什么影响？','Why is this important for search result titles?':'这对搜索结果标题有什么影响？','Why is this important for search result summaries?':'这对搜索结果摘要有什么影响？','Why is this important for duplicate pages?':'这如何避免重复页面？','Why is this important for search visibility?':'这对搜索可见性有什么影响？','Item ':'条目 ',
  'Filter by byline':'按署名筛选','Filter by date range: Date range':'按日期范围筛选','Date range':'日期范围','Per page':'每页条数','Page size':'每页条数','First page':'第一页','Last page':'最后一页','Page number':'页码','Select all on this page':'全选本页','Select ':'选择','Showing ':'显示第 ',' of ':' 条，共 ','Add item':'添加条目','Add row':'添加一项','Move up':'上移','Move down':'下移','Remove item':'移除条目','Item':'条目',
  'How do you want to start?':'请选择初始化方式','Empty site':'空白站点','Start with the template’s content types and no content.':'保留新闻内容类型，暂不添加新闻。','Import an existing EmDash site':'导入已有的 EmDash 站点','Once setup is done, upload a .emdash package exported from another EmDash site.':'设置完成后，可上传从其他 EmDash 站点导出的 .emdash 文件。',
  'New {itemLabel}':'新建{itemLabel}','New {singularLower} name':'新建{singularLower}名称','Moving from another EmDash site?':'从其他 EmDash 站点迁入？','This site has no content yet, so you can import a .emdash package exported from another EmDash site.':'本站暂无新闻。您可直接新建新闻，也可导入其他 EmDash 站点导出的内容。','Import a site package':'导入站点文件','Dismiss import suggestion':'关闭导入提示','Draft':'草稿','Media file':'媒体文件','User':'用户','Drafts':'草稿','Media files':'媒体文件','Users':'用户','New {singularLower}':'新建{singularLower}',
  'New {singular}':'新建{singular}','New ':'新建',' name':'名称','(optional)':'（可选）',
  'Headings':'标题','Heading 1':'一级标题','Heading 2':'二级标题','Heading 3':'三级标题','Heading 4':'四级标题','Heading 5':'五级标题','Heading 6':'六级标题',
  'Insert image':'插入图片','Insert HTML':'插入 HTML','Insert video':'插入视频','Insert block':'插入内容块','Insert block below':'在下方插入内容块',
  'Insert paragraph after':'在后面插入段落','Insert paragraph before':'在前面插入段落','Align left':'左对齐','Align center':'居中对齐','Align right':'右对齐','Align justify':'两端对齐',
  'More formatting':'更多格式','Clear formatting':'清除格式','Superscript':'上标','Subscript':'下标',
  'Collapse sidebar':'收起侧栏','Expand sidebar':'展开侧栏','Switch to dark':'切换深色模式','Switch to light':'切换浅色模式',
  'Collapse block':'收起内容块','Expand block':'展开内容块','Basic blocks':'基础内容块','No blocks yet':'暂无内容块',
  'Add block':'添加内容块','Blocks':'内容块','Document':'文档','Optional caption':'图片说明（可选）','Caption':'图片说明',
  'Close image settings':'关闭图片设置','Image actions':'图片操作','About focal point':'关于图片焦点','Focal point':'图片焦点',
  'Reset crop':'重置裁剪','Create cropped copy':'创建裁剪副本','Cropped copy created.':'裁剪副本已创建。','Square':'正方形','Portrait':'竖向','Landscape':'横向',
  'EmDash does not keep the uncropped image.':'系统不会保留裁剪前的原图。','EmDash does not keep the previous image.':'系统不会保留替换前的图片。',
  'Save or discard the other changes before cropping.':'裁剪前请先保存或放弃其他更改。','Drag and drop files here':'将文件拖放到此处','Drop files to upload':'拖放文件以上传',
  'Browse files to upload':'选择要上传的文件','Add Images':'添加图片','Featured Images':'封面图片','No matching media':'没有匹配的媒体文件',
  'Could not load media.':'无法加载媒体文件。','Could not load this folder.':'无法加载此文件夹。','Folders could not be loaded.':'无法加载文件夹。',
  'New folder':'新建文件夹','Main library':'媒体库','Folders navigation':'文件夹导航','Failed to create media folder':'创建媒体文件夹失败',
  'Try another filename or clear your search.':'请尝试其他文件名，或清除搜索条件。','Media results':'媒体搜索结果','Uploaded':'已上传','Updating usage':'正在更新使用记录',
  'Content language':'内容语言','Scheduled changes':'定时更改','Schedule changes':'安排定时更改','Scheduled entries appear here with their publish time.':'定时发布的新闻及发布时间会显示在此处。',
  'First version':'首个版本','Earliest saved version':'最早保存的版本','Show older versions':'显示更早版本','Discard changes?':'放弃更改？',
  'Enter a slug.':'请输入网址标识。','Use lowercase letters, numbers, and hyphens.':'请使用小写字母、数字和连字符。','Placeholder text':'提示文字',
  'Drafts & Private':'草稿与私密内容','In trash':'已在回收站','Try a different search or collection filter.':'请尝试其他搜索词或内容筛选条件。',
  'Select a content type':'选择内容类型','Choose…':'请选择…','No exact match on this site':'本站没有完全匹配的内容','Read-only':'只读',
  'More information about Display size':'关于显示尺寸的更多说明','Tooltip text':'提示文字','List':'列表','Open':'打开','Go':'前往','Update':'更新','Copied':'已复制',
  'What is a passkey?':'什么是通行密钥？','Create passkey':'创建通行密钥','Use a security key':'使用安全密钥','Failed to fetch passkeys':'获取通行密钥失败',
  'Failed to add passkey':'添加通行密钥失败','Scan it with a nearby phone or tablet.':'请用身边的手机或平板扫描。','Site title':'网站名称','Open setup':'开始设置',
  'Click the button below to create your account:':'点击下方按钮创建账号：','Signup completion failed':'完成注册失败',
  'Failed to fetch translations':'获取翻译版本失败','Failed to duplicate content':'复制新闻失败','Could not load the calendar':'无法加载日历',
  'Previous month':'上个月','Next month':'下个月','Monthly':'每月','Minute':'分钟','Hour':'小时','One':'一个','Other':'其他','Mixed':'混合','Partial':'部分',
  'Release notes':'版本说明','Technical details':'技术详情','Warnings':'提醒','Clear stored value':'清除已保存的值','Clear completed':'清除已完成项',
  'Download backup':'下载备份','Download Backup':'下载备份','Daily automatic backups':'每日自动备份','Failed to update backup settings':'更新备份设置失败',
  'Added an image':'添加了图片','Removed an image':'移除了图片','Moved an image':'移动了图片','Added a paragraph':'添加了段落','Edited a paragraph':'编辑了段落',
  'Added a heading':'添加了标题','Added a quote':'添加了引用','Added a divider':'添加了分隔线','Added an embed':'添加了嵌入内容','Added an HTML block':'添加了 HTML 内容块',
  'Removed an HTML block':'移除了 HTML 内容块','Removed a code block':'移除了代码块','Edited a list item':'编辑了列表项','Moved a table':'移动了表格','Table inserted':'已插入表格',
  'Delete rows':'删除行','Add row below':'在下方添加行','Select table':'选择表格','Header column added':'已添加表头列','Distribute columns evenly':'均分列宽',
  'Number of posts':'新闻数量','Shown to readers in this order.':'将按此顺序展示给读者。','Search bylines…':'搜索署名…','No byline':'暂无署名','Byline credits':'作者署名',
};

export default function chineseUI() {
  return {
    name: 'hpf-chinese-news-admin', enforce: 'pre',
    transform(code, id) {
      if (id.includes('/@cloudflare/kumo/dist/chunks/') && id.endsWith('.js')) {
        const translated = code.replace(/"(?:\\.|[^"\\])*"/g, literal => { try { const original=JSON.parse(literal); return words[original] ? JSON.stringify(words[original]) : literal; } catch { return literal; } });
        return translated === code ? undefined : { code: translated, map: null };
      }
      if (!id.includes('/@emdash-cms/admin/dist/') || !id.endsWith('.js')) return;
      let result = code;
      if (code.includes('src/locales/zh-CN/messages.mjs')) {
        result = code.replace(/JSON\.parse\(("(?:\\.|[^"\\])*")\)/, (_, literal) => {
          const catalogue = JSON.parse(JSON.parse(literal));
          const translate = value => typeof value === 'string' ? (words[value] ?? value) : Array.isArray(value) ? value.map(translate) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translate(item)])) : value;
          return JSON.stringify(Object.fromEntries(Object.entries(catalogue).map(([key,value]) => [key,translate(value)])));
        });
      } else if (!id.includes('/messages-')) {
        result = code.replace(/(\bmessage:\s*)("(?:\\.|[^"\\])*")/g, (match, prefix, literal) => {
          const original = JSON.parse(literal);
          return words[original] ? prefix + JSON.stringify(words[original]) : match;
        });
      }
      return result === code ? undefined : { code: result, map: null };
    },
  };
}
