---
title: 插件类型
description: Nekro Agent 插件的分类系统，包括计算类、动作类、迭代类、推送类和综合类插件及其关联的沙盒方法类型
---

# 插件类型

根据功能特性和交互方式，Nekro-Agent 插件可以分为以下几种类型：

## 计算类插件

计算类插件主要扩展 AI 的计算能力，提供直接的数据处理和分析功能。

**特点：**

- AI 可以直接调用并使用返回的数据
- 通常不需要额外的交互循环
- 计算结果可直接用于 AI 后续响应

**常见使用场景：**

- 数学计算与统计分析
- 文本处理（翻译、摘要、关键词提取等）
- 数据格式转换
- 外部 API 数据调用（天气、汇率等）

**相关沙盒方法类型：**

- 主要使用 `SandboxMethodType.TOOL` 类型，因为这类方法返回的数据可以直接被 AI 使用

**示例：**

```python
@plugin.mount_sandbox_method(SandboxMethodType.TOOL, "翻译文本")
async def translate_text(_ctx: AgentCtx, text: str, target_lang: str) -> str:
    """将文本翻译成目标语言

    Args:
        text (str): 需要翻译的文本
        target_lang (str): 目标语言代码(如 'en', 'ja', 'fr')

    Returns:
        str: 翻译后的文本
    """
    # 实现翻译逻辑...
    return translated_text
```

## 动作类插件

动作类插件用于执行特定操作，通常不需要 AI 对结果进行复杂处理，只需反馈执行结果让 AI 知晓。

**特点：**

- 专注于执行具体操作
- 返回操作执行的状态或简单结果
- 不会触发 AI 的自动回复

**常见使用场景：**

- 发送消息或文件
- 系统控制操作（关机、重启、调整设置等）
- 数据库操作（增删改查）
- 定时任务管理

**相关沙盒方法类型：**

- 主要使用 `SandboxMethodType.BEHAVIOR` 类型，结果会添加到系统消息但不触发 AI 再次回复

**示例：**

```python
@plugin.mount_sandbox_method(SandboxMethodType.BEHAVIOR, "设置定时器")
async def set_reminder(_ctx: AgentCtx, chat_key: str, time_seconds: int, message: str) -> str:
    """设置一个定时提醒

    Args:
        chat_key (str): 会话标识
        time_seconds (int): 延迟时间（秒）
        message (str): 提醒消息

    Returns:
        str: 设置结果描述
    """
    # 设置定时器逻辑...
    return f"已设置提醒，将在 {time_seconds} 秒后发送消息：{message}"
```

## 迭代类插件

迭代类插件提供信息或交互功能，需要 AI 进一步处理结果并生成新的响应。

**特点：**

- 返回需要 AI 处理的信息
- 触发 AI 生成新的回复
- 常用于提供上下文信息或交互式功能

**常见使用场景：**

- 网络搜索
- 内容推荐
- 信息检索
- 上下文分析
- 多模态内容处理（图像、音频等）

**相关沙盒方法类型：**

- 主要使用 `SandboxMethodType.AGENT` 类型，返回字符串会触发 AI 再次回复
- 或 `SandboxMethodType.MULTIMODAL_AGENT` 类型，处理图像等多模态内容

**示例：**

```python
@plugin.mount_sandbox_method(SandboxMethodType.AGENT, "搜索网络")
async def search_web(_ctx: AgentCtx, query: str) -> str:
    """搜索网络信息

    Args:
        query (str): 搜索查询

    Returns:
        str: 搜索结果摘要，将触发AI进行解析和回复
    """
    # 执行搜索并获取结果...
    return f"以下是关于'{query}'的搜索结果：\n\n{search_results}"
```

:::warning
迭代类插件可能会导致多轮对话，需要注意避免信息过载或无限循环问题。
:::

## 推送类插件

推送类插件为外部系统提供信息推送触发服务，通常通过挂载 webhook 接入点实现。

**特点：**

- 通过 webhook 接收外部系统的推送
- 可触发主动消息发送
- 实现系统间的事件通知

**常见使用场景：**

- GitHub 提交通知
- 服务器监控告警
- 订阅内容更新推送
- 第三方服务状态变更通知

**相关实现方式：**

- 使用 `mount_webhook` 装饰器注册 webhook 接入点
- 可能需要配合使用各种沙盒方法类型来处理推送内容

**示例：**

```python
@plugin.mount_webhook("/github-webhook")
async def handle_github_webhook(request: Request):
    """处理来自GitHub的Webhook推送"""
    data = await request.json()
    event_type = request.headers.get("X-GitHub-Event", "")

    # 处理不同类型的事件...
    if event_type == "push":
        # 处理推送事件
        await notify_push_event(data)

    return {"status": "success"}
```

:::warning
推送类插件需要考虑安全验证，确保只处理来自可信来源的请求。
:::

## 综合类插件

综合类插件集成了上述多种能力，提供全面的功能集合。

**特点：**

- 组合多种插件类型的特性
- 提供一系列相关功能
- 通常有复杂的内部状态管理

**常见使用场景：**

- 项目管理（结合任务计算、动作执行和信息推送）
- AI 辅助创作（结合内容生成、格式处理和文件操作）
- 智能助手（结合信息检索、行为控制和定时提醒）
- 异步任务管理（结合动作类提示词注入能力等）

**相关沙盒方法类型：**

- 使用多种沙盒方法类型，根据具体功能需求选择

## 与沙盒方法类型的关系

插件类型与沙盒方法类型有密切的关系，但不是一一对应的。同一个插件可以包含多种类型的沙盒方法：

| 插件类型 | 主要使用的沙盒方法类型或功能  | 典型用例                           |
| -------- | ----------------------------- | ---------------------------------- |
| 计算类   | `TOOL`                        | 直接返回数据供 AI 使用             |
| 动作类   | `BEHAVIOR`                    | 执行操作并反馈结果，不触发 AI 回复 |
| 迭代类   | `AGENT` 或 `MULTIMODAL_AGENT` | 提供信息并触发 AI 再次回复         |
| 推送类   | 挂载 webhook 接入点           | 接收外部系统推送并处理             |
| 综合类   | 多种类型组合使用              | 提供全面的功能集合                 |

在实际开发中，应根据功能需求选择合适的插件类型和沙盒方法类型，为用户提供流畅的交互体验。
