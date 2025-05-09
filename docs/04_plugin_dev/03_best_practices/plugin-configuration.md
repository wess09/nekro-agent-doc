---
title: 插件配置
description: Nekro Agent 插件配置系统的详细说明，包括配置的注册、访问与更新
---

# 插件配置

插件配置是一种强大的功能，允许插件开发者定义可由用户自定义的配置项，并提供友好的 WebUI 界面进行管理。本文档详细介绍插件配置的注册、使用和最佳实践。

## 配置的注册

插件配置通过继承 `ConfigBase` 类并使用 `mount_config` 装饰器注册：

```python
from nekro_agent.api.plugin import ConfigBase
from pydantic import Field

@plugin.mount_config()
class MyPluginConfig(ConfigBase):
    """插件配置类"""

    API_KEY: str = Field(
        default="",
        title="API密钥",
        description="第三方服务的API密钥",
        json_schema_extra={"is_secret": True},
    )

    MAX_CACHE_SIZE: int = Field(
        default=100,
        title="最大缓存大小",
        description="插件缓存的最大条目数",
    )

    ENABLE_FEATURE: bool = Field(
        default=True,
        title="启用特性",
        description="是否启用某项特性功能",
    )
```

## 配置的访问

注册配置后，可以通过插件的 `config` 属性访问配置项：

```python
@plugin.mount_sandbox_method(SandboxMethodType.TOOL, "获取天气")
async def get_weather(_ctx: AgentCtx, city: str) -> str:
    """获取指定城市的天气信息

    Args:
        city (str): 城市名称

    Returns:
        str: 天气信息
    """
    # 访问配置项
    api_key = plugin.config.API_KEY

    # 使用API密钥调用天气服务
    weather_data = await call_weather_api(city, api_key)

    return weather_data
```

## 配置字段类型

插件配置支持多种数据类型，每种类型在 WebUI 中都有对应的输入控件：

| 数据类型       | 说明     | WebUI 控件           |
| -------------- | -------- | -------------------- |
| `str`          | 字符串   | 文本输入框           |
| `int`          | 整数     | 数字输入框           |
| `float`        | 浮点数   | 数字输入框(带小数)   |
| `bool`         | 布尔值   | 开关                 |
| `List[str]`    | 列表     | 多行输入或列表编辑器 |
| `Literal[...]` | 枚举选项 | 下拉选择框           |

## Field 参数说明

使用 `Field` 定义配置项时，可以设置多种参数来控制配置的行为和显示：

```python
PARAMETER: type = Field(
    default=default_value,  # 默认值
    title="显示名称",  # WebUI中显示的名称
    description="详细说明",  # 配置项的详细说明
    json_schema_extra={  # 额外的控制参数
        "is_secret": True,  # 是否为敏感数据(密码/密钥)
        "is_hidden": False,  # 是否在WebUI中隐藏
        "is_textarea": False,  # 是否使用多行文本框
        "placeholder": "示例值",  # 输入框占位文本
        "required": False,  # 是否必填
        "ref_model_groups": False,  # 是否引用模型组列表
    },
)
```

### 常用参数说明

- **default**: 配置项的默认值
- **title**: WebUI 中显示的配置项名称
- **description**: 配置项的详细说明，支持使用 HTML 链接等
- **json_schema_extra**: 额外的控制参数
  - **is_secret**: 标记为敏感数据，会在 UI 中以密码形式显示并在日志中屏蔽
  - **is_hidden**: 在 WebUI 中隐藏此配置项
  - **is_textarea**: 使用多行文本框而非单行输入框
  - **placeholder**: 输入框的占位文本
  - **required**: 标记此字段为必填项
  - **ref_model_groups**: 引用系统中的模型组列表作为选项

## 配置验证

配置类基于 Pydantic，可以添加验证器来确保配置的有效性：

```python
from pydantic import field_validator

@plugin.mount_config()
class MyPluginConfig(ConfigBase):
    PORT: int = Field(default=8080, title="端口号")

    @field_validator("PORT")
    def validate_port(cls, value):
        if not (1024 <= value <= 65535):
            raise ValueError("端口号必须在1024-65535之间")
        return value
```

## 配置示例

以下是一个完整的插件配置示例，展示了各种配置类型和用法：

```python
from typing import Dict, List, Literal, Optional
from pydantic import Field, field_validator
from nekro_agent.api.plugin import ConfigBase

@plugin.mount_config()
class WeatherPluginConfig(ConfigBase):
    """天气插件配置"""

    # 基本设置
    API_KEY: str = Field(
        default="",
        title="API密钥",
        description="天气服务API密钥，可从官网获取",
        json_schema_extra={"is_secret": True}
    )

    DEFAULT_CITY: str = Field(
        default="北京",
        title="默认城市",
        description="未指定城市时使用的默认城市"
    )

    # 高级设置
    TEMPERATURE_UNIT: Literal["celsius", "fahrenheit"] = Field(
        default="celsius",
        title="温度单位",
        description="显示温度的单位"
    )

    CACHE_DURATION: int = Field(
        default=30,
        title="缓存时长(分钟)",
        description="天气数据的缓存有效期"
    )

    FAVORITE_CITIES: List[str] = Field(
        default=["北京", "上海", "广州", "深圳"],
        title="收藏的城市",
        description="快速查询的城市列表"
    )

    # 特性开关
    ENABLE_FORECAST: bool = Field(
        default=True,
        title="启用天气预报",
        description="是否显示未来几天的天气预报"
    )

    FORECAST_DAYS: int = Field(
        default=5,
        title="预报天数",
        description="天气预报的天数"
    )
```

## 最佳实践

1. **合理默认值**: 提供合理的默认配置，让插件即使在未配置的情况下也能基本运行
2. **详细描述**: 为每个配置项提供清晰的描述，解释其作用和预期值
3. **类型标注**: 总是使用类型标注，确保配置值类型正确
4. **敏感数据保护**: 对 API 密钥等敏感信息使用`is_secret`标记
5. **优雅降级**: 当配置不完整时，提供降级方案而不是简单报错
