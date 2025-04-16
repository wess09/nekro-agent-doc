# 协议端配置

Nekro Agent 支持多种协议端连接方式，本文档将介绍如何配置不同的协议端。

## OneBot V11 协议

Nekro Agent 使用 OneBot V11 协议与各种聊天平台进行交互。以下是不同协议端的配置方法：

### NapCat (推荐)

[NapCatQQQQ](https://github.com/NapNeko/NapCatQQ) NapCatQQ 是现代化的基于 NTQQ 的 Bot 协议端实现，如果你使用了包含 NapCat 部署的一键脚本，请直接跳转至第 4 步，使用 Token 登录 NapCat 按照步骤配置好 Websocket 客户端即可

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

:::warning

如果你在部署过程中修改了 NekroAgent 的应用端口号，请将上述步骤中的 8021 端口替换为实际端口号

:::

### 其他协议端

如果你使用了其他协议端，请将其反向 WebSocket 地址配置为：`ws://nekro_agent:8021/onebot/v11/ws`，即可连接 NekroAgent 开始使用

:::warning

使用其他协议端需要自行配置 NekroAgent 数据挂载目录，否则可能无法正常收发图片、文件等资源

:::

## 故障排除

### 连接问题

- **连接失败**：检查网络连接和防火墙设置
- **鉴权失败**：检查 OneBot 服务访问密钥是否正确设置（在 NekroAgent 的 WebUI 中 「协议端」→「NapCat」→「WebUI」获取）

### 消息接收问题

- **收不到消息**：检查两端日志，确认是否正确建立连接（NekroAgent 系统日志中显示 `connection open` 字样）
- **消息格式错误**：检查是否使用了兼容的 OneBot 实现
