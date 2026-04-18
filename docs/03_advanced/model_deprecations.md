# 模型**弃用&停用&重定向**

由于模型提供商调整 以下模型将会停用 
::: info 信息
自动重定向操作由**Google Gemini**进行**NekroAgent 官方中转**为保护用户服务**稳定性**不会主动删除对应模型

停用后 **实验版** 模型会重定向为 **正式版**

**旧版** 模型将会重定向 **新版** 模型

**注意:** 模型停用后后我们可能在没有通知您的情况下将**停用的**模型**计费**将会切换到**对应新版本模型**的**计费**

请您务必及时关注此页面
:::

::: warning 模型停用警告
更新日期 2026 年 4 月 18 日

根据 [Google Gemini API 弃用公告](https://ai.google.dev/gemini-api/docs/deprecations?hl=zh-cn) 和 [版本说明](https://ai.google.dev/gemini-api/docs/changelog?hl=zh-cn)，以下模型已宣布停用计划。表中列出的日期为模型可能退役的**最早日期**。

### 即将停用的模型 (2026年)
- **Gemini 2.5 系列**:
  - `gemini-2.5-pro`: **2026 年 6 月 17 日** 停用 (推荐: `gemini-3.1-pro-preview`)
  - `gemini-2.5-flash`: **2026 年 6 月 17 日** 停用 (推荐: `gemini-3-flash-preview`)
  - `gemini-2.5-flash-lite`: **2026 年 7 月 22 日** 停用 (推荐: `gemini-3.1-flash-lite-preview`)
  - `gemini-2.5-flash-image`: **2026 年 10 月 2 日** 停用 (推荐: `gemini-3.1-flash-image-preview`)
- **Gemini 2.0 系列**:
  - `gemini-2.0-flash / -001`: **2026 年 6 月 1 日** 停用 (推荐: `gemini-2.5-flash`)
  - `gemini-2.0-flash-lite / -001`: **2026 年 6 月 1 日** 停用 (推荐: `gemini-2.5-flash-lite`)
- **其他模型**:
  - `gemini-embedding-001`: **2026 年 7 月 14 日** 停用
  - `imagen-4.0-generate-001 / ultra / fast`: **2026 年 6 月 24 日** 停用
  - `gemini-robotics-er-1.5-preview`: **2026 年 4 月 30 日** 停用 (推荐: `gemini-robotics-er-1.6-preview`)
:::

::: danger 已停用的模型
以下模型已经关闭，请求将无法使用或会自动重定向。

| 模型名称 | 停用日期 | 推荐替代方案 |
| :--- | :--- | :--- |
| `gemini-3-pro-preview` | 2026 年 3 月 9 日 | `gemini-3.1-pro-preview` |
| `gemini-2.5-flash-lite-preview-09-2025` | 2026 年 3 月 31 日 | `gemini-3.1-flash-lite-preview` |
| `gemini-2.5-flash-preview-09-25` | 2026 年 2 月 17 日 | `gemini-3-flash-preview` |
| `imagen-4.0-generate-preview-06-06` | 2026 年 2 月 17 日 | `imagen-4.0-generate-001` |
| `gemini-2.5-flash-image-preview` | 2026 年 1 月 15 日 | `gemini-2.5-flash-image` |
| `text-embedding-004` | 2026 年 1 月 14 日 | `gemini-embedding-001` |
| `gemini-2.5-pro-preview (03-25/05-06/06-05)` | 2025 年 12 月 2 日 | `gemini-3.1-pro-preview` |
| `gemini-2.0-flash-lite-preview (-02-05)` | 2025 年 12 月 9 日 | `gemini-2.5-flash-lite` |
| `gemini-2.0-flash-live-001` | 2025 年 12 月 9 日 | `gemini-3.1-flash-live-preview` |
| `gemini-live-2.5-flash-preview` | 2025 年 12 月 9 日 | `gemini-3.1-flash-live-preview` |
| `gemini-2.5-flash-preview-05-20` | 2025 年 11 月 18 日 | `gemini-3-flash-preview` |
| `gemini-2.0-flash-preview-image-generation` | 2025 年 11 月 14 日 | `gemini-2.5-flash-image` |
| `veo-3.0-generate / fast-preview` | 2025 年 11 月 12 日 | `veo-3.1-generate-preview` |
| `imagen-3.0-generate-002` | 2025 年 11 月 10 日 | `imagen-4.0-generate-001` |
| `embedding-001 / gecko-001 / exp` | 2025 年 10 月 30 日 | `gemini-embedding-001` |

自动重定向操作由 Google Gemini 进行 NekroAgent 官方中转 为保护用户服务稳定性不会主动删除对应模型
:::

::: tip 实验性模型说明
文档中标注为 `exp`（实验版）或 `preview`（预览版）的模型为实验性模型，这些模型：
- 可能随时被更新或关闭，生命周期较短
- 建议定期关注 [Google Gemini API 版本说明](https://ai.google.dev/gemini-api/docs/changelog?hl=zh-cn) 获取最新更新
- 生产环境建议优先使用稳定版（GA）模型，或准备备用方案
- 实验性模型通常会在正式版发布后逐步关闭
- **部分预览版模型会自动重定向到稳定版**，建议直接使用稳定版模型名称
:::