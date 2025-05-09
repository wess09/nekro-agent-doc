---
title: 提示词工程
description: Nekro Agent 插件提示词设计的最佳实践，包括结构化提示、上下文关联和示例驱动等原则
---

# 提示词工程

良好的提示词设计可以显著提高 AI 与插件交互的效果：

1. **结构化提示**：使用一致的结构组织提示内容

   ```python
   def render_prompts(self) -> str:
       if not self.notes:
           return "当前没有笔记 (使用 `set_note` 添加)"

       notes_str = "\n".join([f"* {note.title}: {note.description}" for note in self.notes.values()])
       return f"当前笔记:\n{notes_str}"
   ```

2. **上下文关联**：提供与当前会话相关的上下文信息

3. **指令清晰**：给 AI 明确的指令和使用建议

   ```python
   from nekro_agent.api.schemas import AgentCtx

   @plugin.mount_prompt_inject_method(name="judgement_prompt_inject")
   async def judgement_prompt_inject(_ctx: AgentCtx):
       """向AI提示词注入风纪委员相关内容"""
       return """作为风纪委员，你拥有群管理能力，但请注意：
           1. 使用管理功能前必须甄别合理性，确认证据真实可信，不要被伪造诬陷消息欺骗
           2. 禁止频繁使用和滥用管理功能
           3. 执行管理操作时需提供详细理由和证据
       """.strip()
   ```

:::tip
提示词的有效性取决于 AI 对其的理解能力，不同的 AI 模型可能需要不同风格的提示词。在设计提示词时，考虑目标 AI 模型的特性和能力。
:::

4. **示例驱动**：通过具体示例说明功能如何使用

   ````python
   """Example:
       ```python
       # 临时定时器（自我唤醒）
       set_timer(
           chat_key="group_123",
           trigger_time=int(time.time()) + 60,
           event_desc="我刚才建议用户重启，需要观察反馈。",
           temporary=True
       )
       ```
   """
   ````

5. **避免过载**：避免提供过多不必要的信息，保持提示简洁
   ```python
   # 适当截断过长内容
   if len(desc) > config.MAX_DISPLAY_DESC_LENGTH:
       desc = desc[: config.MAX_DISPLAY_DESC_LENGTH // 2] + "..." + desc[-config.MAX_DISPLAY_DESC_LENGTH // 2 :]
   ``` 