---
title: Nekro Agent 应用场景
description: Nekro Agent 真实能做什么——按用户场景分类，每条都标清楚依赖的能力和限制。
---

# 应用场景

## 它实际是什么

Nekro Agent 把一个会聊天的 AI 接到您的 QQ / Discord / Telegram / 微信 等平台上，并给这个 AI 配了一台**能动手做事的小电脑**。

> AI 看到您的消息 → 自己判断要不要"动手" → 处理完把结果（文字、图片、文件）发回到对话。

跟普通 AI 聊天工具不一样的地方是：它**不光会说，还能真的去做**——压图、改文档、查资料、生成图表、按时提醒、按您写的规则自动应答……都靠这台"小电脑"在背后干活。下面按用法分类看几个例子。

---

## 个人日常

> 这一类只要部署完 + 配好一个聊天模型组就能玩。

### 图像处理

> 截图待补 · 动图待补 → `assets/demo/dynamic/image_basic.gif`

让 AI 处理图片，不用您打开 PS / 在线工具：

- 「压到 500K 以内，再转成 jpg」
- 「裁掉这张图右下角的水印」
- 「四张图拼成 2x2 网格」
- 「批量压缩到 1080p 宽度」

**边界**：单个任务最多跑 2 分钟，发的文件别超过 10MB

### PDF 与文档处理

> 截图待补 → `assets/demo/static/pdf_extract.webp`

- 「提取这份 PDF 第 3-7 页的文字」
- 「合并这 5 个 PDF」
- 「这份扫描件帮我 OCR 一下」（中文也行）
- 「把这个 Excel 转成 Markdown 表格」

**边界**：单个文件不超过 10MB

### 信息提醒

> 动图待补 → `assets/demo/dynamic/proactive_reminder.gif`

AI **可以主动给您发消息**——不是"实时主动"，是您约好时间或条件，到点了它自动开口。

- 「每天早上 8 点给我念一遍今日新闻」
- 「下周三下午 3 点提醒我交季度报告」
- 「这个 PR 合并了通知我」（配 github 插件）
- 春节、生日、纪念日自动祝福

**前置**：需要先创建一个工作区并绑定到您的群/私聊（[工作区是什么](/docs/03_workspace/overview)）

---

## 学习与思考

### 概念图解

> 动图待补 → `assets/demo/dynamic/diagram_tcp.gif`

- 「用时序图画一下 TCP 三次握手」
- 「画一张 React 组件生命周期的流程图」
- 「这个系统的模块依赖画成图」

图直接作为附件发到对话里，您可以转给同事或保存下来。

### 数学与算法

> 截图待补 → `assets/demo/static/math_solve.webp`

- 「解这个微分方程：y'' - 4y' + 4y = 0」
- 「这个矩阵的特征值算一下」
- 「画 sin(x²) 在 [-π, π] 的图像」

::: warning 截图发题需要"看图模型"
把数学题**截图**发给 Bot 时，AI 能不能看懂图里的题，取决于您在「模型管理」里选的聊天模型**有没有开"视觉"功能**。文字题直接发文本最稳。
:::

---

## 开发与创作

### 跑脚本 / 快速原型

> 截图待补 → `assets/demo/static/quick_script.webp`

- 「写个脚本，把这个 JSON 里所有 isActive=false 的项删掉」
- 「用 pandas 算一下这份 CSV 里每个省份的人均」
- 「批量重命名这些文件，前缀加日期」

**边界**：单个任务最多跑 2 分钟；同时最多 4 个任务在跑。要跑更久或更复杂的，见下面 [长任务 / GitHub 协作](#长任务-github-协作)。

### 小工具 / 玩具 H5

- 「做一个 2048 的 HTML，单文件，能在手机上玩」
- 「写一个倒计时网页，标题我能自定义」
- 「做个抽签器，输入名单后随机抽」

输出是一个 `.html` 文件，作为附件发到对话——您下载下来直接双击在浏览器里打开就能玩。

### 长任务 / GitHub 协作

> 动图待补 → `assets/demo/dynamic/cc_github_pr.gif`

如果任务要跑很久（超过 2 分钟），或者要操作代码仓库，就需要 **Claude Code 沙盒**——专门给 AI 配的"长跑工作间"，里面装了 git、GitHub 命令行工具，可以读写文件、跨多轮对话推进同一个任务：

- 「克隆这个仓库，看一下 #42 这个 issue 描述，写补丁后提 PR」
- 「把这份 100MB 的日志按天切分，生成每日错误统计报告」
- 「在我的 dotfiles 仓库里加一个 zsh 别名，提交并推送」

**前置**：需要单独配一个"CC 模型组"（在模型管理里），细节看下面跳转。

→ 看 [Claude Code 沙盒](/docs/03_workspace/claude_code_sandbox)

---

## 群聊与社群

### 群内问答 / 闲聊

最朴素的玩法。Bot 在群里等 `@` 或关键词触发，被叫到了就回话。

- 知识答疑、做客服
- 配上人设玩"赛博群友"
- 配多人设、多频道独立人设让不同群的 Bot 有不同性格

**怎么触发**：默认是 `@` 机器人或私聊（不同平台/适配器可调）。多数情况下不会插嘴打扰群里正常聊天。

→ 看 [人设技巧](/docs/03_advanced/persona_tips) · [会话独立人设](/docs/03_advanced/session_persona)

### 定时播报

> 动图待补 → `assets/demo/dynamic/daily_broadcast.gif`

- 早上 9 点群里发今日资讯
- 每周一发上周项目进展
- 节假日自动祝福（不用您手动转发了）

**前置**：定时器属于工作区，需要先创建工作区并绑定到目标群/频道。

→ 看 [工作区定时器](/docs/03_workspace/timers)

### Webhook 通知

GitHub / GitLab / Sentry / 监控系统 → 配 webhook → 群里立刻看到摘要：

- 「新 PR #42 by @kromiose，主要改动在 adapter 层」
- 「生产环境告警：数据库连接池满了」

GitHub 是内置插件开箱即用；其他系统需要少量配置。

### 直播间互动

接 B 站直播间，弹幕和礼物消息推到 NA，AI 可以"陪播"。

**边界**：**只能接收弹幕，不能发送弹幕**（B 站直播间不开放回写）。AI 的回复会发到您绑定的群里，不会发到直播间。

---

## 长期项目协作

> 这一类的共同点：跨多次对话、跨多天、需要"AI 记得之前说过什么"。

### 知识库问答

> 截图待补 → `assets/demo/static/kb_search.webp`

把团队文档、产品手册、FAQ 上传到工作区知识库。任何成员在群里问问题，AI 自动检索知识库后回答。

- 「我们的请假流程是怎样的」 → 引用员工手册
- 「这个 API 的鉴权头怎么填」 → 引用 API 文档

**前置**：上传后需要等几秒到几分钟做索引；问答时 AI 会自动检索、不用您手动指定查哪份文档。

→ 看 [知识库](/docs/03_workspace/knowledge_base)

### 长期记忆

让 AI 真的"认识"群友、项目、上下文。聊天内容自动沉淀为长期记忆，下次问到关联话题 AI 会主动回忆：

- 「上次说要在 v2 里加的那个功能呢」 → AI 知道您说的是哪个
- 「他生日是哪天来着」 → AI 之前记过

**前置**：记忆系统在工作区里启用即可，AI 会自动整理；您不用手动告诉它"记住这个"。

→ 看 [记忆系统](/docs/03_workspace/memory_system)

### 项目跟进 + 周报

> 动图待补 → `assets/demo/dynamic/project_weekly.gif`

工作区里讨论项目进展 → 知识库存需求文档 → 记忆系统记每次决定 → 定时器每周一让 AI 生成上周纪要。

把"项目助手"做成一个工作区的组合，比单独配一堆插件简单很多。

---

## 接入与扩展

> 这一类适合开发者。如果您只是用，可以跳过。

### MCP 接入外部工具

让 AI 调用您自己的服务——数据库查询、内部 API、监控系统。需要先启用 Claude Code 沙盒（MCP 服务跑在里面）。

→ 看 [MCP 服务管理](/docs/03_workspace/mcp_management)

### 自定义 Webhook

外部系统主动推消息给 NA，触发 Bot 行为：

- 监控告警进来 → Bot 在群里通知
- CI 完成 → Bot 总结成功/失败

→ 看 [Webhooks 插件开发](/docs/04_plugin_dev/03_advanced_features/3.1_webhooks)

### 写插件

NA 的 Python 插件系统，可以加自定义工具、提示词注入、定时任务、命令。十几行 Python 就能让 AI 多一种能力。

→ 看 [插件开发](/docs/04_plugin_dev/00_introduction)

### 自建适配器

想接入官方没支持的平台（自家 IM、内部系统）？继承 `BaseAdapter` 实现几个方法即可。

## 场景投稿

这页里那么多「截图待补」「动图待补」位—— 都在等您：

1. 您实际用 NA 做了什么有趣的事？点 [应用场景投稿](https://github.com/KroMiose/nekro-agent-doc/issues/new?template=scenario_template.yml) 提交模板
2. 带上**对话截图 / 录屏 / GIF** 上传到 issue，我们会整理到这页对应位置
3. 优质场景的功能需求**未来可能被产品化深度支持**

也欢迎加入 [QQ 交流群](https://jq.qq.com/?_wv=1027&k=71t9iCT7) 跟其他用户交流。

<style scoped>
img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 16px auto;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
  background-color: var(--vp-c-bg-soft);
}

.dark img {
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
  border-color: rgba(255, 255, 255, 0.08);
}

/* 占位提示：用 blockquote 表示，跟正文区分开 */
blockquote {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand);
  padding: 10px 18px;
  margin: 14px 0;
  border-radius: 0 8px 8px 0;
  font-size: 0.92em;
  color: var(--vp-c-text-2);
}

blockquote p {
  margin: 4px 0;
}

blockquote p:first-child {
  margin-top: 0;
}

blockquote p:last-child {
  margin-bottom: 0;
}
</style>
