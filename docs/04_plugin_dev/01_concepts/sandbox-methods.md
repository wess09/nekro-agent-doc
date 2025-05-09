---
title: 沙盒方法
description: Nekro Agent 沙盒方法的类型系统和使用规范，包括工具方法、代理方法、行为方法和多模态代理方法
---

# 沙盒方法

沙盒方法是插件向 AI 提供功能的主要方式。重要的是要理解，这些方法通过 RPC 在主服务中执行，而非沙盒内部，具有以下特点：

1. **类型系统**：每个沙盒方法都有明确定义的类型，决定了 AI 如何使用该方法以及如何处理返回结果。

2. **参数规范**：方法参数必须使用类型注解，同时提供详细的文档字符串。

3. **上下文依赖**：所有沙盒方法的第一个参数必须是 `_ctx: AgentCtx`。

4. **结果处理**：方法返回的结果会被传递回 AI，根据方法类型不同，框架会有不同的处理方式。

5. **错误处理**：沙盒方法的异常会被捕获并以友好的方式返回给 AI。

:::warning
尽管名为"沙盒方法"，这些方法实际上是通过 SDK 注入沙盒中使用 RPC 在主服务中执行的方法，其运行时不是在沙盒环境中。开发时需注意这一环境差异，尤其是涉及文件路径处理时！
:::

沙盒方法类型包括：

- `SandboxMethodType.TOOL`：工具方法

  - 用途：提供特定功能的工具方法
  - 返回值：可以是任何支持 pickle 序列化的类型（字符串、数字、布尔值、列表、字典等）
  - 处理方式：返回值直接传递给发起 RPC 调用的方法，AI 生成的代码可以直接获取并处理这些返回值

- `SandboxMethodType.AGENT`：代理方法

  - 用途：提供需要 AI 进一步处理的交互功能
  - 返回值：必须为字符串类型，描述代理行为的结果
  - 处理方式：返回的字符串会被添加到迭代对话的上下文消息中并触发 AI 的再次回复

- `SandboxMethodType.BEHAVIOR`：行为方法

  - 用途：修改系统或 AI 行为
  - 返回值：必须为字符串类型，描述行为的结果
  - 处理方式：返回的字符串会被添加到聊天记录的系统消息中，但不会触发 AI 的再次回复

- `SandboxMethodType.MULTIMODAL_AGENT`：多模态代理方法
  - 用途：处理图像等多模态内容
  - 返回值：必须为包含多模态内容的 OpenAI 消息段结构
  - 处理方式：返回的多模态消息段会被添加到迭代对话的上下文消息中并触发 AI 的再次回复

```python
from nekro_agent.api.schemas import AgentCtx
from nekro_agent.api.plugin import SandboxMethodType

@plugin.mount_sandbox_method(SandboxMethodType.TOOL, "发送消息工具")
async def send_message(_ctx: AgentCtx, chat_key: str, message: str) -> bool:
    """发送一条消息到指定会话

    Args:
        chat_key (str): 会话唯一标识
        message (str): 要发送的消息内容

    Returns:
        bool: 是否发送成功
    """
    # 实现代码...
    return True
```
