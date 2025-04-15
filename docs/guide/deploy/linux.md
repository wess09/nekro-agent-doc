# Linux 部署教程

本文档将指导您在 Linux 系统上部署 Nekro Agent。

## 🚀 部署方式

### 方式一：标准部署（推荐）

集成 Napcat 协议端的自动化部署版本，一键完成所有配置。

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start_x_napcat.sh)"
```

::: warning 注意事项

- 默认安装目录：`~/srv/nekro_agent`
- 如需修改安装目录：执行 `export NEKRO_DATA_DIR=<你的目录>`
- 云服务器需放行端口：
  - 8021：NekroAgent 主服务
  - 6099：Napcat 服务

:::

#### 部署后配置

1. 访问 WebUI：`http://<你的服务ip>:8021`
2. 使用安装脚本提供的账号密码登录
3. 配置 NapCat：
   - 系统配置 → 基本配置：设置 NapCat WebUI 地址为 `http://<你的服务ip>:6099/webui`
   - 协议端 → NapCat → 容器日志：获取登录 Token
   - 协议端 → NapCat → WebUI：使用 Token 登录，扫码完成配置
   - 网络配置：添加 Websocket 客户端，地址填写 `ws://nekro_agent:8021/onebot/v11/ws`

### 方式二：简单部署

仅部署 NekroAgent 核心服务，需要自行配置 OneBot V11 协议端。

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start.sh)"
```

协议端连接地址：`ws://<你的服务ip>:8021/onebot/v11/ws`
