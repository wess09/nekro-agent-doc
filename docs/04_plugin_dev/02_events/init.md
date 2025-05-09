---
title: 初始化
description: Nekro Agent 插件的初始化过程，包括资源准备、状态初始化与外部系统连接
---

# 初始化

插件初始化是在插件首次加载时执行的操作，用于设置必要的环境、资源和状态。通过 `mount_init_method` 装饰器来注册初始化方法：

```python
from nekro_agent.api import core

@plugin.mount_init_method()
async def init_vector_db():
    """初始化表情包向量数据库"""
    # 获取Qdrant客户端
    client = await core.get_qdrant_client()
    collection_name = plugin.get_vector_collection_name()

    # 检查集合是否存在
    collections = await client.get_collections()
    collection_names = [collection.name for collection in collections.collections]

    if collection_name not in collection_names:
        core.logger.info(f"正在创建表情包向量数据库集合: {collection_name}")
        # 创建集合
        await client.create_collection(
            collection_name=collection_name,
            vectors_config=qdrant_models.VectorParams(
                size=emotion_config.EMBEDDING_DIMENSION,
                distance=qdrant_models.Distance.COSINE,
            ),
        )
        core.logger.success(f"表情包向量数据库集合 {collection_name} 创建成功")
```

:::warning
初始化方法应当处理可能的错误情况（如上例中的客户端获取失败），确保即使初始化失败，插件仍能正常加载。
:::

初始化方法的主要用途：

1. **资源准备**：创建或连接数据库、初始化文件系统等
2. **状态初始化**：设置初始状态、加载配置等
3. **外部系统连接**：建立与外部服务的连接
4. **验证环境**：检查必要的依赖和环境变量 