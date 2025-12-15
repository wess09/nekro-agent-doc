---
title: 调试命令指南
description: Nekro Agent 调试命令指南，涵盖技术调试、系统维护、错误日志管理等高级功能，仅适用于 OneBot V11 适配器（QQ 平台）
---

# 调试命令指南

本文档介绍 Nekro Agent 的调试和系统维护命令，这些命令主要用于技术调试、性能监控、系统维护等高级操作。

::: danger 风险警告
本文档中的命令具有较高的系统权限，可能影响系统稳定性或数据安全。请确保在了解命令作用的情况下谨慎使用。
:::

::: warning 平台限制
当前所有命令仅在 OneBot V11 适配器下可用（即 QQ 平台），其他协议端暂不支持。
:::

## 权限说明

所有调试命令均要求**超级管理员**权限（在 `config.SUPER_USERS` 中配置）。

## 代码执行与调试

### exec

**功能**：在沙盒中执行 Python 代码并返回结果

**语法**：`exec <python_code>`

**权限要求**：超级管理员

**参数说明**：

- `python_code`：要执行的 Python 代码

**安全说明**：

- 代码在沙盒环境中执行
- 受到执行时间和资源限制
- 具有一定的系统资源访问权限

**使用示例**：

```
exec print("Hello World")
exec import os; print(os.getcwd())
exec 1 + 1
```

### code_log / code-log

**功能**：查看代码执行历史记录

**语法**：`code_log [index]`

**权限要求**：超级管理员

**参数说明**：

- `index`（可选）：记录索引号
  - 正数：按时间正序查看第 N 条记录
  - 负数：按时间倒序查看第 N 条记录
  - 省略：查看最新一条记录

**显示内容**：

- 执行的代码内容
- 执行结果/输出
- 执行时间信息

**使用示例**：

```
code_log        # 查看最新执行记录
code_log -2     # 查看倒数第2条记录
code_log 1      # 查看第1条记录
```

## 系统消息与调试模式

### system

**功能**：向当前聊天添加系统消息并触发 Agent

**语法**：`system <message>`

**权限要求**：超级管理员

**参数说明**：

- `message`：要添加的系统消息内容

**使用场景**：

- 调试 Agent 行为
- 注入特定的系统指令
- 测试提示词响应

**使用示例**：

```
system 请介绍一下你自己
system 当前任务：分析用户提供的数据
```

### debug_on / debug-on

**功能**：开启提示词调试模式

**语法**：`debug_on`

**权限要求**：超级管理员

**功能描述**：

- 退出角色扮演模式
- 专注于技术分析和状态报告
- 每次响应后提供额外的调试信息
- 分析当前上下文状态和设置

**调试模式特性**：

- 技术分析优先
- 显示提示词强度/弱点
- 识别潜在问题
- 提供改进建议

**使用示例**：

```
debug_on
```

### debug_off / debug-off

**功能**：关闭提示词调试模式

**语法**：`debug_off`

**权限要求**：超级管理员

**功能描述**：

- 恢复正常角色扮演模式
- 停止调试分析输出
- 忽略所有调试上下文

**使用示例**：

```
debug_off
```

## 配置管理

### conf_show / conf-show

**功能**：查看或列出系统配置

**语法**：`conf_show [config_key]`

**权限要求**：超级管理员

**参数说明**：

- `config_key`（可选）：要查看的配置项名称
- 省略时：显示所有可动态修改的配置项列表

**支持的配置类型**：

- 整数 (int)
- 浮点数 (float)
- 布尔值 (bool)
- 字符串 (str)

**使用示例**：

```
conf_show                    # 列出所有可修改配置项
conf_show AI_GENERATE_TIMEOUT # 查看AI生成超时配置
```

### conf_set / conf-set

**功能**：动态修改系统配置

**语法**：`conf_set <key>=<value>`

**权限要求**：超级管理员

**参数说明**：

- `key`：配置项名称
- `value`：新的配置值

**数据类型处理**：

- 整数/浮点数：自动类型转换
- 布尔值：支持 `true/false`, `1/0`, `yes/no`
- 字符串：直接赋值

**使用示例**：

```
conf_set AI_GENERATE_TIMEOUT=60
conf_set ENABLE_DEBUG_MODE=true
conf_set AI_COMMAND_OUTPUT_PREFIX=[Bot]
```

### conf_reload / conf-reload

**功能**：重新加载配置文件

**语法**：`conf_reload`

**权限要求**：超级管理员

**功能描述**：

- 从配置文件重新读取所有设置
- 丢弃动态修改的配置
- 恢复到文件中的配置状态

**使用示例**：

```
conf_reload
```

### conf_save / conf-save

**功能**：保存当前配置到文件

**语法**：`conf_save`

**权限要求**：超级管理员

**功能描述**：

- 将内存中的配置写入配置文件
- 持久化动态修改的设置

**使用示例**：

```
conf_save
```

## 模型测试

### model_test / model-test

**功能**：测试模型的可用性和性能

**语法**：`model_test [options] <model_names...>`

**权限要求**：超级管理员

**选项参数**：

- `-g`：将参数视为模型组名称而非模型名称
- `--stream`：使用流式模式测试
- `--use-system`：在测试中包含系统消息

**通配符支持**：

- 支持 `*` 通配符匹配多个模型/模型组
- 例如：`gpt*` 匹配所有以 "gpt" 开头的模型

**测试内容**：

- 模型响应能力
- 响应速度统计
- 成功/失败率
- 性能基准测试

**使用示例**：

```
model_test gpt-4o                    # 测试单个模型
model_test -g main_model debug_model # 测试模型组
model_test --stream gpt*             # 流式测试所有gpt模型
model_test --use-system claude*      # 包含系统消息测试
```

## 错误日志管理

### log_err_list / log-err-list / log_err_ls / log-err-ls

**功能**：查看错误日志列表

**语法**：`log_err_list [options]`

**权限要求**：超级管理员

**选项参数**：

- `-p <页码>`：指定页码（默认：1）
- `-s <每页数量>`：每页显示数量（默认：10，最大：50）
- `-a` / `--all`：查看日志目录中的所有文件而非缓存列表

**显示内容**：

- 错误日志文件列表
- 文件修改时间
- 日志编号（用于其他命令引用）

**使用示例**：

```
log_err_list                # 查看最近错误日志
log_err_list -p 2 -s 5     # 查看第2页，每页5条
log_err_list -a            # 查看所有日志文件
```

### log_chat_test / log-chat-test

**功能**：使用错误日志中的对话内容测试 LLM 请求

**语法**：`log_chat_test <log_index_or_filename> [options]`

**权限要求**：超级管理员

**参数说明**：

- `log_index_or_filename`：日志索引号或文件名

**选项参数**：

- `-g <模型组名>`：指定使用的模型组（默认：主模型组）
- `--stream` / `-s`：使用流式模式

**日志匹配规则**：

1. 尝试作为索引号解析
2. 在缓存列表中按文件名匹配
3. 在日志目录中直接查找文件
4. 自动添加 `.json` 后缀重试

**测试内容**：

- 重现错误日志中的请求
- 测试模型响应能力
- 性能基准测试
- 错误复现分析

**使用示例**：

```
log_chat_test 1                      # 测试第1条日志
log_chat_test error_20241201.json    # 测试指定日志文件
log_chat_test 2 -g debug_model       # 使用调试模型组测试
log_chat_test 3 --stream             # 流式模式测试
```

## 系统维护

### clear_sandbox_cache / clear-sandbox-cache / na_csc / na-csc

**功能**：清理沙盒环境的缓存目录

**语法**：`clear_sandbox_cache`

**权限要求**：超级管理员

**清理内容**：

- pip 缓存目录
- 沙盒包目录
- 临时文件和目录

**显示信息**：

- 清理的文件数量
- 释放的磁盘空间
- 清理操作状态

**使用示例**：

```
clear_sandbox_cache
```

### github_stars_check / github-stars-check

**功能**：检查用户是否已 Star 官方 GitHub 仓库

**语法**：`github_stars_check`

**权限要求**：超级管理员

**显示内容**：

- Star 状态总览
- 已 Star 的仓库列表
- 未 Star 的仓库列表

**使用示例**：

```
github_stars_check
```

## 高风险命令

::: danger 危险操作
以下命令具有极高的系统风险，可能导致数据丢失或系统不稳定。请在完全了解后果的情况下使用。
:::

### docker_restart / docker-restart

**功能**：重启 Docker 容器

**语法**：`docker_restart [container_name]`

**权限要求**：超级管理员 + Docker 环境

**参数说明**：

- `container_name`（可选）：容器名称（默认：nekro_agent）

**限制条件**：

- 仅在 Docker 环境中可用
- 需要 Docker 操作权限

**使用示例**：

```
docker_restart                # 重启默认容器
docker_restart my_container   # 重启指定容器
```

### docker_logs / docker-logs

**功能**：查看 Docker 容器日志

**语法**：`docker_logs [container_name]`

**权限要求**：超级管理员 + Docker 环境

**参数说明**：

- `container_name`（可选）：容器名称（默认：nekro_agent）

**显示内容**：

- 容器的最近 100 行日志
- 运行状态信息

**使用示例**：

```
docker_logs                   # 查看默认容器日志
docker_logs my_container      # 查看指定容器日志
```

### sh

**功能**：执行 Shell 命令

**语法**：`sh <command>`

**权限要求**：超级管理员

**参数说明**：

- `command`：要执行的 Shell 命令

**安全风险**：

- 具有完整的系统访问权限
- 可能影响系统稳定性
- 命令执行结果不可撤销

**使用示例**：

```
sh ls -la                     # 列出文件
sh df -h                      # 查看磁盘使用情况
sh ps aux | grep python       # 查看Python进程
```

### nekro_db_reset / nekro-db-reset

**功能**：重置数据库

**语法**：`nekro_db_reset [-y] [table_name]`

**权限要求**：超级管理员

**参数说明**：

- `-y`：确认执行重置操作
- `table_name`（可选）：指定要重置的数据表

**安全机制**：

- 需要在 1 分钟内两次执行确认
- 第一次执行仅显示警告
- 第二次执行需要 `-y` 参数确认

**数据影响**：

- 完全清空指定数据表或整个数据库
- 操作不可撤销
- 会丢失所有相关数据

**使用示例**：

```
nekro_db_reset                # 第一次执行，显示警告
nekro_db_reset -y             # 确认重置整个数据库
nekro_db_reset -y chat_messages # 重置指定数据表
```

## 安全建议

1. **权限控制**：确保只有可信的用户拥有超级管理员权限
2. **操作记录**：重要操作前建议备份相关数据
3. **测试环境**：在生产环境外先测试高风险命令
4. **监控日志**：定期检查命令执行日志，监控异常操作
5. **配置备份**：重要配置修改前先使用 `conf_save` 备份

::: tip 获取帮助

- 使用 `na_help` 命令查看命令概览
- 查看 [基础命令指南](/docs/zh/03_advanced/commands_basic) 了解日常管理功能
- 访问 [GitHub 项目](https://github.com/KroMiose/nekro-agent) 报告问题
  :::

