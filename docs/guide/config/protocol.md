# 协议端配置

Nekro Agent 支持多种协议端连接方式，本文档将介绍如何配置不同的协议端。

## OneBot V11 协议

Nekro Agent 使用 OneBot V11 协议与各种聊天平台进行交互。以下是不同协议端的配置方法：

### NapCat (推荐)

[NapCat](https://github.com/KomeiDiSanXian/NapCat) 是一款基于 Chronocat 的跨平台协议端，支持 QQ、QQ 频道、Discord 等多种平台。

#### 配置步骤

1. 访问 Nekro Agent WebUI：`http://<您的服务器IP>:8021`
2. 进入「系统配置」→「基本配置」
3. 设置 NapCat WebUI 地址为：`http://<您的服务器IP>:6099/webui`
4. 进入「协议端」→「NapCat」→「容器日志」获取登录 Token
5. 点击「打开 WebUI」，使用 Token 登录
6. 在 NapCat WebUI 中完成账号登录（扫码或密码）
7. 在「网络配置」中添加 Websocket 客户端：
   - 添加 URL：`ws://nekro_agent:8021/onebot/v11/ws`（容器内连接）
   - 或使用 `ws://<您的服务器IP>:8021/onebot/v11/ws`（外部连接）

## 故障排除

### 连接问题

- **连接失败**：检查网络连接和防火墙设置
- **反复断连**：检查心跳配置，可能需要增加超时时间
- **鉴权失败**：检查 Access Token 是否正确设置（如有）

### 消息接收问题

- **收不到消息**：检查协议端日志，确认消息是否正常发送
- **消息格式错误**：检查是否使用了兼容的 OneBot 实现
