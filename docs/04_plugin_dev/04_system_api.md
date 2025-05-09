---
title: 系统 API
description: Nekro Agent 系统 API 的使用指南，包括核心服务、消息服务、上下文服务等完整 API 介绍
---

# 系统 API

Nekro-Agent 提供了丰富的系统 API，插件可以利用这些 API 扩展功能。本文档将系统地介绍这些 API 的使用方法。

## 通用 API 导入

```python
from nekro_agent.api import context, core, message, plugin, schemas, timer, user
```

## 核心服务 API

核心服务 API 提供了基础功能访问，包括日志记录、配置访问和数据库连接等。

```python
from nekro_agent.api import core

# 日志记录
core.logger.info("操作信息")
core.logger.error("错误信息")
core.logger.warning("警告信息")
core.logger.success("成功信息")
core.logger.debug("调试信息")

# 获取机器人实例
bot = core.get_bot()

# 配置访问
model_config = core.config.MODEL_GROUPS["default"]

# 向量数据库
qdrant_client = await core.get_qdrant_client()
qdrant_config = core.get_qdrant_config()
```

## 消息服务 API

消息服务 API 用于发送各种类型的消息，包括文本、图片和文件等。

```python
from nekro_agent.api import message

# 发送文本消息
await message.send_text(chat_key, text_content, _ctx)

# 发送图片消息
await message.send_image(chat_key, image_path, _ctx)

# 发送文件
await message.send_file(chat_key, file_path, _ctx)

# 从URL下载文件
file_path = await message.download_from_url(url, _ctx)
```

:::warning
在使用消息服务 API 时，特别是发送图片或文件，务必确保路径处理正确。参考[文件交互](/docs/04_plugin_dev/03_best_practices/file-interaction)了解更多关于路径处理的最佳实践。
:::

## 上下文服务 API

上下文服务 API 提供了会话上下文的管理功能，帮助插件获取会话信息。

```python
from nekro_agent.api import context

# 获取会话类型
chat_type = context.get_chat_type(chat_key)

# 获取会话 ID
chat_id = context.get_chat_id(chat_key)

# 解析会话标识
chat_type, chat_id = context.parse_chat_key(chat_key)

# 获取用户名称
user_name = context.get_user_name(chat_key, user_id)
```

## 定时器服务 API

定时器服务 API 允许插件设置定时任务，实现延时执行和定时提醒功能。

```python
from nekro_agent.api import timer

# 设置定时器
await timer.set_timer(chat_key, trigger_time, event_desc)

# 设置临时定时器
await timer.set_temp_timer(chat_key, trigger_time, event_desc)

# 清除定时器
await timer.clear_timers(chat_key, temporary=True)

# 获取定时器列表
timers = await timer.get_timers(chat_key)
```

:::tip
定时器是一个强大的功能，可以让插件实现定时提醒、延迟执行等功能。临时定时器在会话重置后会自动清除，适合实现临时性任务。
:::

## 插件 API

插件 API 用于定义和管理插件本身，包括插件基类、沙盒方法类型和配置基类等。

```python
from nekro_agent.api.plugin import ConfigBase, NekroPlugin, SandboxMethodType

# 插件基类
plugin = NekroPlugin(
    name="插件名称",
    module_name="plugin_name",
    description="插件描述",
    version="0.1.0",
    author="作者",
    url="https://github.com/author/plugin",
)

# 沙盒方法类型
sandbox_type = SandboxMethodType.TOOL

# 配置基类
class MyConfig(ConfigBase):
    pass
```

## 数据库模型 API

数据库模型 API 提供了直接访问数据库的能力，用于保存和检索持久化数据。

```python
from nekro_agent.models.db_chat_channel import DBChatChannel
from nekro_agent.models.db_chat_message import DBChatMessage

# 获取会话频道
channel = await DBChatChannel.get_or_none(chat_key=chat_key)

# 获取聊天消息
messages = await DBChatMessage.filter(chat_key=chat_key).limit(10).all()
```
