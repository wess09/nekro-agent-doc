---
title: 文件交互
description: Nekro Agent 插件的文件处理机制及路径转换，以及数据序列化相关注意事项
---

# 文件交互

插件经常需要读写文件，这是一个特别需要注意的环节，因为沙盒环境和插件执行环境（主服务进程）是完全不同的：

1. **路径转换**：必须使用提供的路径转换工具确保正确访问文件

   ```python
   from nekro_agent.tools.path_convertor import (
       convert_to_container_path,
       convert_to_host_path,
       is_url_path,
   )
   ```

2. **路径处理原则**：

   - 不要直接返回文件路径，因为沙盒和主服务的路径结构不同
   - 沙盒中的路径（如 `/app/uploads/file.jpg`）在主服务中不存在
   - 主服务中的路径（如 `/data/uploads/chat_key/file.jpg`）在沙盒中不可访问
   - 始终使用转换函数来处理路径

3. **正确的文件路径转换**：

   ```python
   # 错误示例 - 直接返回路径
   def get_file_path(_ctx, filename):
       return f"/app/uploads/{filename}"  # 这在主服务中不存在!

   # 正确示例 - 使用转换函数
   def get_file_path(_ctx, filename):
       host_path = convert_filename_to_access_path(filename, _ctx.from_chat_key)
       # 进行操作后返回合适的数据，而不是返回路径
       return process_file(host_path)
   ```

:::warning
错误的路径处理是插件开发中最常见的问题之一，可能导致文件无法访问、数据丢失或安全问题。务必遵循路径转换规则。
:::

4. **路径位置理解**：

   - `PathLocation.UPLOADS`：用户上传文件目录，路径格式为 `/app/uploads/` (沙盒) 或 `$USER_UPLOAD_DIR/chat_key/` (主机)
   - `PathLocation.SHARED`：沙盒与主机共享目录，路径格式为 `/app/shared/` (沙盒) 或 `$SANDBOX_SHARED_HOST_DIR/container_key/` (主机)

5. **异步文件操作**：使用异步文件操作库避免阻塞

   ```python
   import aiofiles

   async with aiofiles.open(file_path, "rb") as f:
       content = await f.read()
   ```

6. **插件目录**：使用插件专有目录存储插件相关文件
   ```python
   plugin_dir = plugin.get_plugin_path()
   storage_dir = plugin_dir / "data"
   storage_dir.mkdir(parents=True, exist_ok=True)
   ```

## 数据序列化与交互

由于沙盒环境和插件之间通过 RPC 使用 pickle 进行数据序列化与反序列化，这带来了一些限制和注意事项：

1. **数据类型限制**：

   - 只支持可序列化的数据类型（基本类型、列表、字典、元组等）
   - 复杂对象（如文件句柄、网络连接等）不能直接传递
   - 自定义类实例需要实现 `__getstate__` 和 `__setstate__` 方法才能正确序列化

2. **序列化安全**：

   - 避免传递过大的数据，会导致性能问题
   - 框架对序列化大小有限制，超出限制会导致错误
   - 对于大型数据，考虑存储在文件中并传递引用

:::tip
对于大型数据传输，使用文件系统作为中介是一种常见的解决方案。先将数据写入文件，再传递文件引用，可以避免序列化大数据的问题。
:::

3. **处理非序列化对象**：

   ```python
   # 错误示例
   def process_data(_ctx):
       connection = create_database_connection()
       return connection  # 不可序列化的对象!

   # 正确示例
   def process_data(_ctx):
       connection = create_database_connection()
       data = connection.fetch_data()
       connection.close()
       return data  # 返回可序列化的数据
   ```

4. **建议实践**：
   - 尽量使用简单的数据结构（字符串、数字、布尔值、列表、字典）
   - 对于复杂结构，转换为可序列化的格式（如 JSON 字符串）
   - 使用 Pydantic 模型进行数据验证和序列化
   - 对于大型二进制数据，先保存到文件系统，再传递文件引用 