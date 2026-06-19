# Kami Reader — Obsidian 主题

[English](./README.md) | 简体中文

> **灵感来源于 [tw93/kami](https://github.com/tw93/kami)。本项目与 tw93 无关联、
> 未受其背书。所有视觉设计 token 均溯源至原 kami 项目（MIT 许可）；本仓库
> 是 kami 设计系统在 Obsidian 端的衍生适配。**

> 最后更新：2026-06-19 · Last updated: 2026-06-19

把 [tw93/kami](https://github.com/tw93/kami) 的印刷级排版系统——暖米纸底色、
油墨蓝点缀、衬线主导的层级、暖调中性灰——搬到 Obsidian 编辑器上。

> 当前状态：**Phase 1 —— 个人使用阶段，验证视觉迁移是否成立。**
> 尚未提交到 Obsidian Theme Gallery。

---

## 视觉语言

对齐 [kami v1.1.0](https://kami.tw93.fun/index-zh.html) 规范。

| Token | 浅色 | 深色 | 用途 |
|---|---|---|---|
| Parchment / Deep Dark | `#f5f4ed` | `#141413` | 笔记主背景 |
| Ivory / Dark Ivory | `#faf9f5` | `#1a1917` | 侧栏、卡片表面 |
| Warm Sand | `#e8e6dc` | `#353330` | 边框、分割线 |
| Dark Surface / Warm Ivory | `#30302e` | `#e8e3d2` | 正文文字 |
| Ink Blue / Ink Light | `#1B365D` | `#2D5A8A` | 强调色：标题、链接、选区、CTA |
| Olive | `#504e49` | `#b4b09e` | 引用块、说明文字 |
| Warm Highlight | `#f3e3a8` | `#5a4a1f` | `==高亮==` 标记 |
| Tag Tint | `#E4ECF5` | `#E4ECF5` | 标签背景（实色，禁止 rgba） |

所有中性灰都带 yellow-brown 暖调底色（无冷蓝灰）——浅色、深色皆然。油墨蓝
是唯一强调色——印刷设计里"≤5% 面积"的克制原则在编辑器场景有所放宽，但精神
不变：只承担语义功能，绝不当装饰用。

---

## 字体系统

```css
--font-text-theme: "Charter", "Georgia",
                   "LXGW WenKai Screen", "LXGW WenKai",
                   "Source Han Serif SC", "Noto Serif CJK SC",
                   "Songti SC", "STSong", "SimSun", serif;
```

- **Charter** — 英文衬线。macOS 自带（`/System/Library/Fonts/Charter.ttc`），
  无需安装。其他平台 fallback 到 Georgia。这也是 kami 原版为英文指定的字体。
- **LXGW WenKai Screen** — 中文楷书，OFL 1.1。Screen 版专为低 DPI 屏幕优化，
  缩小了与 kami 原版 仓耳今楷02（商用需付费）之间的气质差距。
- **JetBrains Mono** — 代码字体，OFL 1.1。
- **Inter** — UI / 界面字体，OFL 1.1。

### 可选字体安装

只有 LXGW WenKai Screen 需要手动装。不装的话，中文 fallback 到
`Songti SC`（macOS）/ `SimSun`（Windows）——能读，但丢了楷书的书卷气。

- **LXGW WenKai Screen** — https://github.com/lxgw/LxgwWenKai-Screen/releases
  （下载 `LXGWWenKaiScreen-Regular.ttf` + `Bold.ttf`，双击安装）
- JetBrains Mono（可选，代码已 fallback 到 SF Mono / Cascadia）：
  https://www.jetbrains.com/lp/mono/

---

## 安装（macOS Sequoia + App Store 版 Obsidian）

> ⚠️ **为什么这不是常见的"把文件夹丢进 themes/"那种安装方式。**
>
> App Store 版 Obsidian 跑在沙盒里。macOS Sequoia 15+ 会给所有从终端用 `cp`
> 创建的文件打上 `com.apple.provenance` 属性，沙盒据此拒绝把这些文件当作
> 主题资源加载——Obsidian 静默跳过这个主题文件夹，回退到上次成功加载的主题。
> `xattr -cr` 也清不掉 `com.apple.provenance`（受 SIP 保护）。
>
> 绕过方案：把 kami 作为 **CSS snippet** 发布（不是主题），通过 Obsidian 自己
> 的 Vault API 从 DevTools console 注入。`app.vault` 写入的文件 provenance 是
> Obsidian 本身，沙盒正常放行。

### 一次性配置

1. 确认 Settings → Appearance → Themes 设为 **Default**（不要保留其他主题；
   其他主题的 `body.<name>-theme` class 选择器特异性高于 kami 的
   `body.theme-light`，会压制 kami 的样式）。
2. 在本仓库目录下，生成注入脚本：
   ```bash
   ./sync.sh
   ```
3. 打开生成的 `inject-kami-snippet.js`，`Cmd+A` 全选，`Cmd+C` 复制。
4. 在 Obsidian 里：`Cmd+Option+I` → Console 标签 → `Cmd+V` 粘贴 → 回车。
   看到提示 `✓ kami.css created (... chars)` 即成功。
5. Settings → Appearance → 滑到底部 **CSS Snippets** → 开启 **kami** 开关。

### 改 CSS 后的迭代流程

```bash
# 编辑 theme.css 后：
./sync.sh
# 重新复制 inject-kami-snippet.js 全部内容 → 粘贴到 Obsidian Console。
# 然后在 CSS Snippets 里把 kami 开关关掉 → 再开启，强制重新加载新内容。
```

修改后的 snippet **不会**自动热重载——Obsidian 只在启动时读一次 snippet
文件。通过 `app.vault.modify` 重新注入后，需要在 Settings → Appearance →
CSS Snippets 把 kami 开关 toggle 一次才能拉到新内容。

---

## 覆盖范围

Phase 1 目标是完整的视觉覆盖：

- ✅ 基础色板（60+ 变量，浅色 + 深色双套）
- ✅ **深色模式** —— Deep Dark `#141413` + Ink Light `#2D5A8A`，保留同样的
  yellow-brown 暖调底色和单色克制原则
- ✅ Reading View：标题、正文、列表（em-dash 短横线 marker）、表格、引用块
  （2pt 油墨蓝实线 + olive 文字，无背景）、代码、frontmatter、嵌入块
- ✅ Editing View（CodeMirror 6）：语法 token、光标、选区、当前行高亮、
  格式化符号
- ✅ UI 外壳：标题栏、标签页、功能区、文件管理器、状态栏、命令面板、设置
  面板、modal、菜单、toggle、checkbox、滚动条
- ✅ 尊重系统的 reduced-motion 偏好

未覆盖（暂缓）：
- PDF 导出样式（kami 本身是印刷优先；这是 Phase 1.5 候选）
- Style Settings 插件 schema（Phase 2 —— 让用户可调色温、字体、对比度）
- 插件特化样式（Dataview、Templater、Excalidraw）—— 遇到再说

---

## Phase 2 —— 发布

仅当 Phase 1 一周 dogfooding 确认视觉迁移成立后才触发。

Phase 2 工作：
1. **解决终端用户的沙盒安装问题。** Vault-API 注入流程只对开发者本人有效。
   终端用户在 App Store 版 Obsidian 上会遇到同样的 provenance 墙。备选方案：
   - 把 snippet 工作流文档化作为安装路径（笨但能用）。
   - 提交到 Theme Gallery，验证 Obsidian 自己的下载器写出的文件 provenance
     是否正确（大概率是 —— Obsidian 自己写的文件它自己认）。
   - 做成 community plugin，让 plugin 自己注入 CSS。
2. 把硬编码的字体名暴露成 Style Settings 可配置项。
3. 写 `data-theme.json` Style Settings schema。
4. 截图集（浅色 reading view、editing view、命令面板、设置面板）。
5. 提 PR 到 `obsidianmd/obsidian-releases` → `community-css.json`。
6. 可选：把 LXGW WenKai Screen Regular 子集化到常用 3500 字 + 打包成
   woff2（约 1MB），让用户开箱即用原版视觉。

---

## 设计决策

1. **基于 Obsidian Default 派生，不是 Minimal。** Minimal 自带设计语言，
   把 parchment 注入进去会产生视觉撕裂。Minimal 还用 `body.minimal-theme`
   class 选择器（特异性 0,1,1）压制 kami 旧版的 `:root`（0,0,1）。Default
   没有这种 class。
2. **变量定义在 `body.theme-light` / `body.theme-dark` 上，不是 `:root`。**
   Obsidian 内置 app.css 把基础变量定义在 `.theme-light` / `.theme-dark`
   （特异性 0,1,0）下。`:root`（0,0,1）层叠不过它们；`body.theme-light`
   （0,1,1）才行。
3. **英文用 Charter，不是 Newsreader。** kami v1.1.0 明确指定 Charter；
   它也是 macOS 自带，省了装字体这一步。
4. **标签背景用实色 `#E4ECF5`，绝不用 rgba。** kami 明确禁止 rgba 标签
   背景（PDF 导出时 WeasyPrint 有双层矩形 bug）。
5. **阴影只用 ring shadow 和 whisper shadow，绝不用硬投影。** kami 规范；
   硬投影在印刷品和屏幕上都显得过重。
6. **列表 marker 用 em-dash 短横线，不用圆点。** kami Dash List ——
   "短横线代替圆点，更书卷气"。
7. **引用块：2pt 油墨蓝实线 + olive 文字，无背景，不 italic。** 克制优于装饰。
8. **中文用 LXGW WenKai Screen，不是思源宋体。** kami 原版 仓耳今楷02 是
   楷书；思源宋体是印刷宋体。楷书保留 kami 标志性的手写温度。
9. **不用合成粗体。** kami 禁止 fake bold；标题只用 500/600 实际字重。
10. **Phase 1 以 snippet 形式发布，不是主题。** 绕过 macOS Sequoia 沙盒；
    详见"安装"章节。

---

## Phase 1 需要验证的脆弱假设

1. **parchment 背景在屏幕长时间编辑场景下舒适。** 如果一周后你下意识切回
   更冷调的浅色或深色主题，视觉迁移失败。Pivot 方案："Kami-Lite" —— 保留
   油墨蓝 accent，把 parchment 换成 ivory `#faf9f5` 或近白色。
2. **楷书在 16px 屏幕正文尺寸下，长时间写作不累。** LXGW WenKai 的 Screen
   版专门处理这一点，但真正的验证需要一周 dogfooding。如果楷书让人疲劳，
   通过 CSS 变量切回思源宋体即可。

---

## 文件结构

```
kami-obsidian/
├── manifest.json              # Phase 2 Theme Gallery 提交所需的元数据
├── theme.css                  # 所有 kami 样式的唯一源文件
├── sync.sh                    # 从 theme.css 重新生成 inject-kami-snippet.js
├── inject-kami-snippet.js     # sync.sh 的产物 —— 粘贴到 Obsidian Console 用
├── README.md                  # 英文文档
└── README.zh-CN.md            # 本文件
```

`inject-kami-snippet.js` 是**构建产物**，不是源文件。任何 `theme.css` 改动后
跑 `./sync.sh` 重新生成即可。

---

## 致谢

- 视觉系统与设计 token：[tw93/kami](https://github.com/tw93/kami) —— MIT
- 字体：Charter（OFL，macOS 自带）、LXGW WenKai（OFL）、JetBrains Mono（OFL）、
  Inter（OFL）
