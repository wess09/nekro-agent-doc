---
title: 事件回调中的沙盒方法
description: Nekro Agent 插件沙盒方法的实现与注意事项，包括文档字符串编写、类型注解和错误处理
---

# 沙盒方法

沙盒方法是插件向 AI 提供功能的接口。通过 `mount_sandbox_method` 装饰器注册沙盒方法。需要特别注意的是，尽管名为"沙盒方法"，这些方法实际上是通过 RPC 在主服务中执行的，而不是在沙盒环境中执行：

````python
from nekro_agent.api import schemas
from nekro_agent.api.plugin import SandboxMethodType
from typing import List

@plugin.mount_sandbox_method(SandboxMethodType.TOOL, "更新表情包")
async def update_emotion(
    _ctx: schemas.AgentCtx,
    emotion_id: str,
    description: str,
    tags: List[str],
) -> str:
    """Update Emotion (更新表情包)

    Update the metadata of an existing emotion.

    Args:
        emotion_id (str): The ID of the emotion to update
        description (str): New description for the emotion
        tags (List[str]): New tags for the emotion

    Returns:
        str: The emotion ID of the updated emotion

    Example:
        ```python
        # Update emotion metadata
        updated_id = update_emotion("a1b2c3d4", description="一只超可爱的猫猫", tags=["可爱", "猫咪", "萌"])
        ```
    """
    # 实现代码...
    return emotion_id
````

:::warning
沙盒方法的文档字符串对于 AI 使用插件至关重要，应尽可能详细地说明方法用途、参数和返回值，并提供使用示例。
:::

沙盒方法开发的关键点：

1. **完整文档**：提供详细的文档字符串，包括描述、参数说明、返回值和使用示例
2. **类型注解**：为所有参数和返回值添加类型注解
3. **错误处理**：妥善处理可能的异常，提供有意义的错误消息
4. **上下文使用**：正确使用传入的上下文对象
5. **适当命名**：方法名和描述应清晰地表达功能
6. **示例代码**：提供典型的使用示例，帮助 AI 理解如何使用
7. **返回值处理**：根据方法类型选择正确的返回值类型，遵循框架对不同类型方法的处理方式 