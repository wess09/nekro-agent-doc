---
title: 提示词注入
description: Nekro Agent 插件的提示词注入机制，通过此机制为 AI 提供额外的上下文信息
---

# 提示词注入

提示词注入允许插件为 AI 提供额外的上下文信息，影响其行为和响应。通过 `mount_prompt_inject_method` 装饰器注册提示词注入方法：

```python
from nekro_agent.api import schemas

@plugin.mount_prompt_inject_method("status_prompt")
async def status_prompt(_ctx: schemas.AgentCtx) -> str:
    """状态提示"""
    data = await store.get(chat_key=_ctx.from_chat_key, store_key="status")
    if not data:
        channel_data = ChannelData(chat_key=_ctx.from_chat_key)
    else:
        channel_data = ChannelData.model_validate_json(data)
    return channel_data.render_prompts()
```

:::tip
提示词注入是增强 AI 能力的关键，良好的提示词设计可以显著提高插件的有效性。参考[提示词工程](/docs/04_plugin_dev/03_best_practices/prompt-engineering)了解更多。
:::

提示词注入的最佳实践：

1. **简洁明了**：提供简短但信息丰富的提示
2. **相关性**：只注入与当前会话相关的信息
3. **格式一致**：保持一致的格式，便于 AI 理解
4. **动态内容**：根据当前会话状态动态生成提示内容
5. **避免冲突**：确保不同插件的提示词不会相互冲突 