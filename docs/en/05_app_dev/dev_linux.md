---
title: Linux开发部署指南
description: Nekro Agent Linux环境下的开发部署完整指南
---

# Linux 开发环境准备

::: warning 警告
此文档仅用于开发环境，不推荐用于部署或使用。
:::

## 准备工作

开发环境要求：

- 一个可用的 Postgresql 数据库
- 安装 Python 环境 (推荐 Python 3.10)
- 安装 `poetry` (Python 依赖管理工具)
- 安装 `nb-cli` (NoneBot 脚手架)

```bash
pip install poetry
pip install nb-cli
```

## 源码部署

### 1. 克隆仓库

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. 安装依赖

```bash
cd nekro-agent
pip install poetry  # 需要提前安装 Python 环境: 推荐 Python 3.10
poetry config virtualenvs.in-project true  # 将虚拟环境安装到项目目录下 (可选)
poetry install
```

### 3. 生成配置文件

运行一次 Bot 加载插件并关闭以生成配置文件：

```bash
nb run
```

### 4. 配置必要信息

编辑配置文件 `./data/configs/nekro-agent.yaml` 配置数据库连接等信息。

```yaml
# Bot 与管理信息
SUPER_USERS: # 管理用户 QQ 号列表
  - "12345678"
BOT_QQ: "12345678" # 机器人 QQ 号 (**必填**)
ADMIN_CHAT_KEY: group_12345678 # 管理会话频道标识

# Postgresql 数据库配置
POSTGRES_HOST: 127.0.0.1
POSTGRES_PORT: 5432
POSTGRES_USER: db_username
POSTGRES_PASSWORD: db_password
POSTGRES_DATABASE: nekro_agent
```

::: info 完整配置
完整配置说明请参考 [config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)
:::

### 5. 拉取沙盒镜像

拉取用于沙盒环境的 Docker 镜像：

```bash
sudo bash sandbox.sh --pull
```

如果需要修改镜像中的依赖包，可修改 `sandbox/dockerfile` 和 `sandbox/pyproject.toml` 文件，然后使用 `sudo bash sandbox.sh --build` 重新构建镜像

### 6. 运行 Bot

::: warning 注意
由于插件工作时需要动态使用 Docker 创建沙盒执行环境以及设定容器共享目录权限等，建议将当前用户添加到 `docker` 组中，并重启 shell 以生效

```bash
sudo usermod -aG docker $USER
```

:::

```bash
nb run
# 开发调试模式下启用重载监视并排除动态扩展目录
nb run --reload --reload-excludes ext_workdir
```

### 7. OneBot 配置

使用任意 OneBot 协议客户端登录机器人并使用反向 WebSocket 连接方式，配置好连接地址：

```
ws://127.0.0.1:8021/onebot/v11/ws
```

::: tip
这里的端口可在 `.env.prod` 中配置，默认为 `8021`
:::

### 8. 调试模式

项目中包含 `.vscode/launch.json` 文件，可以直接使用 VSCode 进行调试，使用其内置的调试启动配置即可。

## 前端开发（可选）

如需开发前端页面，可按以下步骤进行：

### 1. 安装 Node.js

推荐使用 `nvm` (Node Version Manager) 来管理 Node.js 版本。

1.  安装 `nvm`:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
2.  安装完成后，根据提示将 `nvm` 的加载命令添加到你的 shell 配置文件中 (例如 `~/.bashrc`, `~/.zshrc`) 并重启终端。
3.  安装 Node.js 20:
    ```bash
    nvm install 20
    nvm use 20
    ```
    你也可以通过系统的包管理器安装，但请确保版本是 20.x。

### 2. 配置 pnpm
```bash
# 全局安装 pnpm
npm install -g pnpm

# 设置镜像加速
pnpm config set registry https://registry.npmmirror.com
```

### 3. 安装前端依赖
```bash
cd frontend

# 安装依赖
pnpm install --frozen-lockfile
```

### 4. 启动前端
```bash
cd ./frontend
pnpm dev
```

当看到如下日志时，即可在浏览器访问：
```
VITE vx.x.x  ready in xxx ms

➜  Local:   http://localhost:xxxx/ <-这里是端口号
➜  Network: use --host to expose
➜  press h + enter to show help
```
