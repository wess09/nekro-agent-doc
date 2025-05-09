---
title: Webhook 接入点
description: Nekro Agent 插件的 Webhook 实现机制，用于接收外部系统的推送通知
---

# Webhook 接入点

Webhook 接入点允许插件接收来自外部系统的推送通知，使插件能够响应外部事件并触发相应的动作。本文档详细介绍如何在插件中实现和使用 Webhook。

## Webhook 基础

Webhook 是一种让外部系统向 Nekro Agent 推送事件的机制。通过注册 Webhook 接入点，插件可以：

1. 接收来自外部系统（如 GitHub、GitLab、监控系统等）的通知
2. 处理这些通知并执行相应的操作
3. 主动向会话发送消息或触发其他动作

## 注册 Webhook

使用 `mount_webhook` 装饰器注册 Webhook 接入点：

```python
from fastapi import Request
from nekro_agent.api import core, message

@plugin.mount_webhook("/github-webhook")
async def github_webhook_handler(request: Request):
    """处理来自 GitHub 的 Webhook 推送"""
    # 获取请求头信息
    event_type = request.headers.get("X-GitHub-Event")
    delivery_id = request.headers.get("X-GitHub-Delivery")

    # 获取请求体JSON数据
    payload = await request.json()

    # 记录事件
    core.logger.info(f"收到 GitHub {event_type} 事件，ID: {delivery_id}")

    # 根据事件类型处理
    if event_type == "push":
        await handle_push_event(payload)
    elif event_type == "issues":
        await handle_issue_event(payload)

    # 返回成功响应
    return {"status": "success", "message": "事件已处理"}
```

Webhook 接入点是 FastAPI 路由处理函数，可以接收标准的 HTTP 请求参数。

## Webhook URL 组成

注册的 Webhook 可通过以下 URL 访问：

```
http(s)://<nekro-agent-host>:<port>/api/plugin/<plugin-name>/webhook/<path>
```

例如，上面示例中的 GitHub Webhook 的完整 URL 可能是：

```
https://example.com:8021/api/plugin/github-notifier/webhook/github-webhook
```

:::tip
建议在插件初始化或配置文档中清晰地说明 Webhook URL 的完整路径，方便用户正确配置外部系统。
:::

## 安全验证

出于安全考虑，Webhook 应当实施一定的验证机制，确保请求来自预期的源：

```python
@plugin.mount_webhook("/secure-webhook")
async def secure_webhook_handler(request: Request):
    """带安全验证的 Webhook 处理器"""
    # 获取请求头中的签名
    signature = request.headers.get("X-Signature")

    # 获取请求体
    body = await request.body()
    body_text = body.decode()

    # 验证签名
    if not verify_signature(body_text, signature, plugin.config.WEBHOOK_SECRET):
        core.logger.warning(f"收到无效签名的 Webhook 请求")
        return {"status": "error", "message": "签名验证失败"}, 401

    # 处理验证通过的请求
    payload = await request.json()
    # ...处理业务逻辑...

    return {"status": "success"}

def verify_signature(payload: str, signature: str, secret: str) -> bool:
    """验证 Webhook 签名"""
    import hmac
    import hashlib

    # 计算预期的签名
    expected_signature = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()

    # 比较签名是否匹配
    return hmac.compare_digest(expected_signature, signature)
```

## 处理不同 HTTP 方法

Webhook 可以处理不同的 HTTP 方法（GET、POST 等）：

```python
@plugin.mount_webhook("/status")
async def status_webhook(request: Request):
    """处理不同HTTP方法的状态检查Webhook"""
    if request.method == "GET":
        # 处理状态查询
        return {
            "status": "running",
            "version": plugin.version,
            "uptime": get_uptime()
        }

    elif request.method == "POST":
        # 处理状态更新
        payload = await request.json()
        status = payload.get("status")

        if status == "maintenance":
            # 设置维护状态
            await set_maintenance_mode(True)
            return {"message": "已切换到维护模式"}

    # 不支持的方法
    return {"error": "不支持的HTTP方法"}, 405
```

## 向会话发送通知

Webhook 处理器通常需要将接收到的事件通知到特定会话：

```python
@plugin.mount_webhook("/monitor-alert")
async def monitor_alert_handler(request: Request):
    """处理监控系统告警"""
    from nekro_agent.api import message, context

    # 获取告警内容
    alert_data = await request.json()

    # 格式化告警消息
    alert_message = f"⚠️ 系统告警\n\n" \
                   f"服务: {alert_data['service']}\n" \
                   f"级别: {alert_data['severity']}\n" \
                   f"详情: {alert_data['description']}"

    # 获取配置的目标会话
    target_chat = plugin.config.ALERT_TARGET_CHAT

    # 创建上下文对象
    _ctx = await context.create_temp_ctx(target_chat)

    # 发送告警消息
    await message.send_text(target_chat, alert_message, _ctx)

    return {"status": "success", "message": "告警已发送"}
```

## 文件上传处理

Webhook 也可以处理文件上传：

```python
@plugin.mount_webhook("/upload")
async def file_upload_handler(request: Request):
    """处理文件上传Webhook"""
    from nekro_agent.tools.path_convertor import convert_to_host_path
    import aiofiles

    # 只接受POST请求
    if request.method != "POST":
        return {"error": "仅支持POST请求"}, 405

    # 获取上传的文件
    form = await request.form()
    upload_file = form.get("file")
    if not upload_file:
        return {"error": "未找到上传文件"}, 400

    # 获取目标会话
    chat_key = form.get("chat_key")
    if not chat_key:
        return {"error": "未指定目标会话"}, 400

    # 保存文件
    filename = upload_file.filename
    content = await upload_file.read()

    # 转换为主机路径
    file_path = convert_to_host_path(f"uploads/{chat_key}/{filename}")

    # 确保目录存在
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    # 写入文件
    async with aiofiles.open(file_path, "wb") as f:
        await f.write(content)

    return {
        "status": "success",
        "filename": filename,
        "size": len(content)
    }
```

## 异步任务处理

对于耗时操作，建议在 Webhook 中启动异步任务：

```python
@plugin.mount_webhook("/long-process")
async def start_long_process(request: Request):
    """启动耗时异步处理任务"""
    import asyncio

    # 获取任务参数
    params = await request.json()
    task_id = generate_task_id()

    # 创建任务状态记录
    task_status = {
        "id": task_id,
        "status": "running",
        "start_time": time.time(),
        "params": params
    }

    # 保存任务状态
    await plugin.store.set(store_key=f"task:{task_id}", value=json.dumps(task_status))

    # 启动异步任务
    asyncio.create_task(run_long_task(task_id, params))

    return {"task_id": task_id, "status": "started"}

async def run_long_task(task_id: str, params: dict):
    """执行耗时任务"""
    try:
        # 执行实际任务处理
        result = await process_task(params)

        # 更新任务状态为完成
        task_status = json.loads(await plugin.store.get(store_key=f"task:{task_id}"))
        task_status.update({
            "status": "completed",
            "end_time": time.time(),
            "result": result
        })
    except Exception as e:
        # 更新任务状态为失败
        task_status = json.loads(await plugin.store.get(store_key=f"task:{task_id}"))
        task_status.update({
            "status": "failed",
            "end_time": time.time(),
            "error": str(e)
        })

    # 保存更新后的状态
    await plugin.store.set(store_key=f"task:{task_id}", value=json.dumps(task_status))
```

## Webhook 示例应用

### GitHub 集成示例

以下是一个完整的 GitHub Webhook 集成示例：

```python
import hmac
import hashlib
import json
from fastapi import Request
from nekro_agent.api import core, message, context

@plugin.mount_config()
class GitHubPluginConfig(ConfigBase):
    """GitHub插件配置"""

    WEBHOOK_SECRET: str = Field(
        default="",
        title="Webhook密钥",
        description="GitHub Webhook的密钥，用于验证请求",
        json_schema_extra={"is_secret": True},
    )

    NOTIFICATION_CHAT: str = Field(
        default="",
        title="通知会话",
        description="接收GitHub通知的会话",
    )

@plugin.mount_webhook("/github")
async def github_webhook(request: Request):
    """处理GitHub Webhook请求"""
    # 验证签名
    signature = request.headers.get("X-Hub-Signature-256", "")
    if not signature.startswith("sha256="):
        return {"error": "无效的签名格式"}, 400

    # 读取请求体
    body = await request.body()
    body_text = body.decode()

    # 计算签名
    secret = plugin.config.WEBHOOK_SECRET
    if not secret:
        core.logger.warning("未配置GitHub Webhook密钥，跳过签名验证")
    else:
        expected_signature = "sha256=" + hmac.new(
            secret.encode(),
            body.decode(),
            hashlib.sha256
        ).hexdigest()

        # 比较签名
        if not hmac.compare_digest(expected_signature, signature):
            core.logger.warning("GitHub Webhook签名验证失败")
            return {"error": "签名验证失败"}, 401

    # 解析事件类型
    event_type = request.headers.get("X-GitHub-Event", "ping")

    # 解析JSON数据
    try:
        payload = json.loads(body_text)
    except json.JSONDecodeError:
        return {"error": "无效的JSON数据"}, 400

    # 处理不同类型的事件
    notification = None

    if event_type == "ping":
        return {"message": "Pong!"}

    elif event_type == "push":
        repo_name = payload.get("repository", {}).get("full_name", "未知仓库")
        branch = payload.get("ref", "").replace("refs/heads/", "")
        pusher = payload.get("pusher", {}).get("name", "未知用户")
        commits = payload.get("commits", [])
        commit_count = len(commits)

        notification = f"📦 GitHub推送通知\n\n" \
                      f"仓库: {repo_name}\n" \
                      f"分支: {branch}\n" \
                      f"推送者: {pusher}\n" \
                      f"提交数: {commit_count}\n\n"

        # 添加提交信息
        if commits:
            notification += "最近提交:\n"
            for commit in commits[:3]:  # 最多显示3条
                message = commit.get("message", "").split("\n")[0][:40]
                author = commit.get("author", {}).get("name", "未知")
                notification += f"- {message} (by {author})\n"

            if commit_count > 3:
                notification += f"...以及其他 {commit_count - 3} 条提交"

    elif event_type == "issues":
        repo_name = payload.get("repository", {}).get("full_name", "未知仓库")
        issue = payload.get("issue", {})
        issue_num = issue.get("number", "?")
        issue_title = issue.get("title", "未知问题")
        issue_url = issue.get("html_url", "#")
        action = payload.get("action", "未知操作")
        user = payload.get("sender", {}).get("login", "未知用户")

        notification = f"🐛 GitHub Issue通知\n\n" \
                      f"仓库: {repo_name}\n" \
                      f"动作: {user} {action}了issue\n" \
                      f"Issue: #{issue_num} {issue_title}\n" \
                      f"链接: {issue_url}"

    # 其他事件类型...

    # 发送通知
    if notification and plugin.config.NOTIFICATION_CHAT:
        chat_key = plugin.config.NOTIFICATION_CHAT
        _ctx = await context.create_temp_ctx(chat_key)
        await message.send_text(chat_key, notification, _ctx)

    return {"status": "success", "event": event_type}
```

### 监控系统集成示例

以下是一个监控系统告警 Webhook 的例子：

```python
@plugin.mount_config()
class MonitorPluginConfig(ConfigBase):
    """监控插件配置"""

    ALERT_CHAT: str = Field(
        default="",
        title="告警会话",
        description="接收监控告警的会话",
    )

    API_TOKEN: str = Field(
        default="",
        title="API令牌",
        description="访问监控API的令牌",
        json_schema_extra={"is_secret": True},
    )

@plugin.mount_webhook("/monitor/alert")
async def monitor_alert(request: Request):
    """处理监控系统告警"""
    # 验证令牌
    auth_header = request.headers.get("Authorization", "")
    expected_token = f"Bearer {plugin.config.API_TOKEN}"

    if not plugin.config.API_TOKEN or auth_header != expected_token:
        return {"error": "未授权访问"}, 401

    # 获取告警数据
    alert_data = await request.json()

    # 基本验证
    if "service" not in alert_data or "level" not in alert_data:
        return {"error": "缺少必要字段"}, 400

    # 格式化告警消息
    service = alert_data["service"]
    level = alert_data["level"]
    message = alert_data.get("message", "无详细信息")
    timestamp = alert_data.get("timestamp", time.time())
    time_str = datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S")

    # 根据级别设置表情图标
    level_icons = {
        "critical": "🔴",
        "error": "🟠",
        "warning": "🟡",
        "info": "🔵"
    }
    icon = level_icons.get(level.lower(), "⚠️")

    # 构建告警消息
    alert_message = f"{icon} **监控告警** | {level.upper()}\n\n" \
                   f"**服务**: {service}\n" \
                   f"**时间**: {time_str}\n" \
                   f"**详情**: {message}\n"

    # 添加指标数据
    if "metrics" in alert_data:
        alert_message += "\n**指标数据**:\n"
        for metric, value in alert_data["metrics"].items():
            alert_message += f"- {metric}: {value}\n"

    # 发送告警通知
    if plugin.config.ALERT_CHAT:
        chat_key = plugin.config.ALERT_CHAT
        _ctx = await context.create_temp_ctx(chat_key)
        await message.send_text(chat_key, alert_message, _ctx)

    return {"status": "success", "message": "告警已处理"}
```

:::warning
Webhook 是公开的 HTTP 接入点，确保实施适当的安全措施，包括请求验证、访问控制和输入验证，以防止未授权访问和滥用。
:::
