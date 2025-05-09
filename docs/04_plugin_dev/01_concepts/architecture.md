---
title: 通信架构
description: Nekro Agent 插件系统的通信架构设计，包括插件注册、事件驱动模型及RPC执行机制
---

# 通信架构

Nekro-Agent 插件系统基于模块化架构设计，允许开发者通过插件扩展核心功能。插件与主系统之间的通信主要通过以下方式实现：

1. **插件注册机制**：每个插件通过 `NekroPlugin` 类进行初始化和注册，建立与核心系统的连接。

2. **事件驱动模型**：插件可以注册各种事件回调函数，响应系统事件并执行自定义操作。

3. **RPC 执行机制**：插件方法通过 RPC（远程过程调用）机制在主服务中执行，而不是在沙盒环境中。沙盒环境只是调用这些方法，但实际执行发生在主服务进程中。

4. **上下文传递**：所有插件方法都会接收 `AgentCtx` 参数，包含当前会话的上下文信息。

5. **存储接口**：插件可以通过 `store` 对象进行数据持久化存储。

:::warning
插件在开发时需注意 RPC 执行机制带来的环境差异，方法虽在沙盒中调用，但实际执行在主服务进程。
:::

示例：插件初始化与通信结构

```python
from nekro_agent.api.plugin import NekroPlugin

# 创建插件实例
plugin = NekroPlugin(
    name="示例插件",
    module_name="example",
    description="这是一个示例插件",
    version="0.1.0",
    author="YourName",
    url="https://github.com/yourusername/nekro-agent",
)

# 获取插件存储对象
store = plugin.store
```
