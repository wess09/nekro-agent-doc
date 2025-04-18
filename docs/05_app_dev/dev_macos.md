---
title: macOS开发部署指南
description: Nekro Agent macOS环境下的开发部署完整指南
---

# macOS 开发环境准备

::: warning 警告
此文档仅用于开发环境，不推荐用于部署或使用。
:::

## 准备工作

开发环境要求：

- 一个可用的 Postgresql 数据库
- 安装 Python 环境 (推荐 Python 3.10)
- 安装 `poetry` (Python 依赖管理工具)
- 安装 `nb-cli` (NoneBot 脚手架)
- 安装 OrbStack 或 Docker Desktop for Mac

### 安装基础开发工具

1. 安装 Homebrew (如果尚未安装)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. 安装 Python

```bash
brew install python@3.10
```

3. 安装开发依赖

```bash
pip3 install poetry
pip3 install nb-cli
```

## 源码部署

### 1. 克隆仓库

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. 安装依赖

```bash
cd nekro-agent
poetry config virtualenvs.in-project true  # 将虚拟环境安装到项目目录下 (可选)
poetry install
```

### 3. 安装 PostgreSQL 数据库

通过 Homebrew 安装：

```bash
brew install postgresql@15
brew services start postgresql@15
```

### 4. 数据库初始化

1. 创建数据库：

```bash
# 切换到 postgres 用户
psql postgres

# 在 PostgreSQL 内执行
CREATE DATABASE nekro_db;
\q
```

### 5. 生成配置文件

运行一次 Bot 加载插件并关闭以生成配置文件：

```bash
nb run
```

### 6. 配置必要信息

编辑配置文件 `./data/configs/nekro-agent.yaml` 配置数据库连接等信息。

```yaml
# Bot 与管理信息
SUPER_USERS: # 管理用户 QQ 号列表
  - "12345678"
BOT_QQ: "12345678" # 机器人 QQ 号 (**必填**)
ADMIN_CHAT_KEY: group_12345678 # 管理会话频道标识

# Postgresql 数据库配置
POSTGRES_HOST: localhost
POSTGRES_PORT: 5432
POSTGRES_USER: postgres  # macOS下默认用户名通常为当前用户名
POSTGRES_PASSWORD: ""    # 本地开发环境可能无密码
POSTGRES_DATABASE: nekro_db
```

::: info 完整配置
完整配置说明请参考 [config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)
:::

### 7. 安装 Docker 环境

在 macOS 上，我们推荐使用 OrbStack 作为容器管理工具，它比 Docker Desktop 更轻量且性能更好。

#### 方法一：安装 OrbStack（推荐）

```bash
brew install --cask orbstack
```

安装完成后启动 OrbStack 应用。

#### 方法二：安装 Docker Desktop for Mac

1. 访问 [Docker Desktop 官网](https://www.docker.com/products/docker-desktop/) 下载 macOS 版本
2. 安装并启动 Docker Desktop
3. 确认 Docker 服务正常运行：`docker info`

### 8. 拉取沙盒镜像

拉取用于沙盒环境的 Docker 镜像：

```bash
# 拉取镜像
docker pull kromiose/nekro-agent-sandbox:latest

# 验证镜像
docker images | grep nekro-agent-sandbox
```

### 9. 设置 WebUI 密码

在 macOS 中设置环境变量：

```bash
# 临时设置（当前终端会话有效）
export NEKRO_ADMIN_PASSWORD="your_password"

# 永久设置（需要重启终端生效）
echo 'export NEKRO_ADMIN_PASSWORD="your_password"' >> ~/.zshrc  # 如果使用zsh
# 或
echo 'export NEKRO_ADMIN_PASSWORD="your_password"' >> ~/.bash_profile  # 如果使用bash
```

### 10. 运行 Bot

```bash
nb run
# 开发调试模式下启用重载监视并排除动态扩展目录
nb run --reload --reload-excludes ext_workdir
```

::: warning 注意
在 macOS 上运行时，如果遇到权限问题，可能需要使用 sudo：
```bash
sudo nb run
```
:::

### 11. OneBot 配置

使用任意 OneBot 协议客户端登录机器人并使用反向 WebSocket 连接方式，配置好连接地址：

```
ws://127.0.0.1:8021/onebot/v11/ws
```

::: tip
这里的端口可在 `.env.prod` 中配置，默认为 `8021`
:::

### 12. 调试模式

项目中包含 `.vscode/launch.json` 文件，可以直接使用 VSCode 进行调试：

1. 打开项目根目录
2. 按 `F5` 启动调试
3. 观察终端输出是否正常

## 使用 OrbStack 虚拟机开发（替代方案）

如果在 macOS 原生环境中遇到兼容性问题，可以考虑使用 OrbStack 虚拟机进行开发：

### 1. 创建 Linux 虚拟机

```bash
orb create ubuntu nekro-dev
```

### 2. 进入虚拟机

```bash
orb -m nekro-dev
```

### 3. 在虚拟机中按照 Linux 开发指南进行操作

在虚拟机中按照 [Linux 开发部署指南](/docs/05_app_dev/dev_linux.html) 进行后续操作。

## 前端开发（可选）

如需开发前端页面，可按以下步骤进行：

### 1. 安装 Node.js
```bash
brew install node@20
```

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
pnpm install
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