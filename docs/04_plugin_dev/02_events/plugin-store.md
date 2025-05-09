---
title: 插件存储
description: Nekro Agent 插件存储系统的使用指南，包括简单的键值存储和数据序列化
---

# 插件存储

插件存储系统提供了简单的键值(KV)存储能力，让插件能够保存和访问持久化数据。每个插件拥有独立的存储空间，避免不同插件之间的数据冲突。

## 存储系统概述

插件存储系统支持以下功能：

1. **会话特定数据**：存储与特定会话相关的数据
2. **全局数据**：存储与会话无关的全局数据
3. **键值存储**：简单的键值对存储模式
4. **数据隔离**：每个插件的数据完全独立

## 存储 API 基础

插件存储 API 可通过 `plugin.store` 属性访问：

```python
from nekro_agent.api.schemas import AgentCtx

@plugin.mount_sandbox_method(SandboxMethodType.TOOL, "保存用户偏好")
async def save_preference(_ctx: AgentCtx, key: str, value: str) -> bool:
    """保存用户偏好设置"""
    try:
        # 保存数据到当前会话的存储中
        await plugin.store.set(chat_key=_ctx.from_chat_key, store_key=key, value=value)
        return True
    except Exception as e:
        core.logger.error(f"保存偏好设置失败: {e}")
        return False
```

## 核心存储方法

存储 API 提供以下核心方法：

### 设置数据

```python
# 会话特定数据
await plugin.store.set(chat_key="group_123456", store_key="user_pref", value="数据内容")

# 全局数据（不指定chat_key）
await plugin.store.set(store_key="global_setting", value="全局数据")
```

### 获取数据

```python
# 获取会话特定数据
data = await plugin.store.get(chat_key="group_123456", store_key="user_pref")

# 获取全局数据
global_data = await plugin.store.get(store_key="global_setting")

# 获取数据并提供默认值
data = await plugin.store.get(chat_key="group_123456", store_key="non_existent", default="默认值")
```

### 删除数据

```python
# 删除会话特定数据
await plugin.store.delete(chat_key="group_123456", store_key="user_pref")

# 删除全局数据
await plugin.store.delete(store_key="global_setting")
```

### 检查数据是否存在

```python
# 检查会话特定数据是否存在
exists = await plugin.store.exists(chat_key="group_123456", store_key="user_pref")

# 检查全局数据是否存在
global_exists = await plugin.store.exists(store_key="global_setting")
```

## 使用Pydantic模型存储结构化数据

Nekro Agent 插件存储系统本质上是一个简单的KV存储，但结合Pydantic模型，可以方便地存储结构化数据：

```python
from pydantic import BaseModel
from typing import Dict, Optional

# 定义数据模型
class Note(BaseModel):
    title: str
    content: str
    created_at: int

class ChannelData(BaseModel):
    notes: Dict[str, Note] = {}

# 保存结构化数据
@plugin.mount_sandbox_method(SandboxMethodType.BEHAVIOR, "保存笔记")
async def save_note(_ctx: AgentCtx, title: str, content: str) -> bool:
    """保存一条笔记"""
    import time
    
    # 获取现有数据
    data = await plugin.store.get(chat_key=_ctx.from_chat_key, store_key="notes")
    
    # 解析为模型或创建新模型
    channel_data = ChannelData.model_validate_json(data) if data else ChannelData()
    
    # 更新数据
    channel_data.notes[title] = Note(
        title=title,
        content=content,
        created_at=int(time.time())
    )
    
    # 序列化并保存
    await plugin.store.set(
        chat_key=_ctx.from_chat_key,
        store_key="notes",
        value=channel_data.model_dump_json()
    )
    
    return True

# 获取结构化数据
@plugin.mount_sandbox_method(SandboxMethodType.TOOL, "获取笔记")
async def get_note(_ctx: AgentCtx, title: str) -> str:
    """获取一条笔记"""
    # 获取数据
    data = await plugin.store.get(chat_key=_ctx.from_chat_key, store_key="notes")
    if not data:
        return "没有找到任何笔记"
    
    # 解析为模型
    channel_data = ChannelData.model_validate_json(data)
    
    # 查找笔记
    note = channel_data.notes.get(title)
    if not note:
        return f"没有找到标题为 '{title}' 的笔记"
    
    return note.content
```

## 真实案例：笔记系统插件

以下是Nekro Agent内置笔记系统插件的简化版本，展示了如何使用存储API：

```python
@plugin.mount_sandbox_method(SandboxMethodType.BEHAVIOR, "设置状态笔记")
async def set_note(_ctx: schemas.AgentCtx, chat_key: str, title: str, description: str, duration: int = 0) -> bool:
    """设置一条笔记"""
    # 获取现有数据
    data = await store.get(chat_key=chat_key, store_key="note")
    # 解析为模型或创建新模型
    channel_data = ChannelNoteData.model_validate_json(data) if data else ChannelNoteData()
    # 创建并更新笔记
    await channel_data.update_note(
        Note.create(title=title, description=description, duration=duration),
    )
    # 序列化并保存
    await store.set(chat_key=chat_key, store_key="note", value=channel_data.model_dump_json())
    return True

@plugin.mount_sandbox_method(SandboxMethodType.TOOL, "获取状态笔记")
async def get_note(_ctx: schemas.AgentCtx, chat_key: str, title: str) -> str:
    """获取一条笔记内容"""
    # 获取数据
    data = await store.get(chat_key=chat_key, store_key="note")
    # 解析为模型
    channel_data = ChannelNoteData.model_validate_json(data) if data else ChannelNoteData()
    # 获取笔记
    note = channel_data.get_note(title, fuzzy=True)
    return note.description if note else ""

@plugin.mount_sandbox_method(SandboxMethodType.BEHAVIOR, "移除状态笔记")
async def remove_note(_ctx: schemas.AgentCtx, chat_key: str, title: str) -> str:
    """移除一条笔记"""
    # 获取数据
    data = await store.get(chat_key=chat_key, store_key="note")
    # 解析为模型
    channel_data = ChannelNoteData.model_validate_json(data) if data else ChannelNoteData()
    # 移除笔记
    success = await channel_data.remove_note(title, fuzzy=True)
    # 保存更新
    await store.set(chat_key=chat_key, store_key="note", value=channel_data.model_dump_json())
    
    if success:
        return f"Note `{title}` removed"
    raise ValueError(f"Note `{title}` not found. Make sure the spelling is correct!")
```

## 最佳实践

1. **使用明确的键名**: 为避免混淆，使用清晰且有描述性的键名
2. **结构化数据**: 使用Pydantic模型对复杂数据进行结构化管理
3. **定期清理**: 及时清理不再需要的数据，避免数据积累
4. **错误处理**: 妥善处理数据不存在或格式错误的情况
5. **版本兼容**: 在更新插件时，考虑数据结构变化的兼容性处理

你可以在[Nekro Agent官方仓库](https://github.com/KroMiose/nekro-agent)查看更多插件示例，了解插件存储的实际使用方式。
