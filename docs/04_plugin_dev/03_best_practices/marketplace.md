---
title: 插件共享市场
description: Nekro Agent 插件市场的参与指南，包括项目结构、文档编写及版本管理规范
---

# 插件共享市场

开发高质量的插件并与社区共享可以极大地扩展 Nekro-Agent 的功能。以下是参与插件共享市场的最佳实践：

1. **标准化结构**：遵循标准的项目结构和命名约定

   ```
   my-plugin/
   ├── __init__.py
   ├── plugin.py
   ├── handlers.py
   ├── models.py
   └── README.md
   ```

2. **完整文档**：提供详细的安装、配置和使用说明

   - 插件功能描述
   - 安装步骤
   - 配置选项
   - 使用示例
   - 常见问题解答

3. **版本管理**：使用语义化版本控制，在插件元数据中明确标记版本

4. **依赖声明**：明确列出插件的所有依赖项及其版本要求

5. **许可协议**：选择适当的开源许可证并在项目中标明

6. **测试案例**：提供测试案例，确保功能正常且可靠

7. **配置项**：使用 `mount_config` 提供可配置选项

:::warning
在向社区共享插件前，请确保检查插件的安全性，避免敏感信息泄露，移除所有硬编码的密钥和令牌，并完成全面测试。
:::

```python
from nekro_agent.api.plugin import ConfigBase
from pydantic import Field

@plugin.mount_config()
class MyPluginConfig(ConfigBase):
    """插件配置项"""

    API_KEY: str = Field(
        default="",
        title="API密钥",
        description="第三方服务的API密钥",
        json_schema_extra={"is_secret": True},
    )

    MAX_REQUESTS: int = Field(
        default=100,
        title="最大请求数",
        description="每天允许的最大请求数",
    )
``` 