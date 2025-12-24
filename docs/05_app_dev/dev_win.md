---
title: Windows开发部署指南
description: Nekro Agent Windows环境下的开发部署完整指南
---

# Windows 开发环境准备

::: warning 警告
此文档仅用于开发环境，不推荐用于部署或使用。
:::

## 准备工作

开发环境要求：

- 一个可用的 Postgresql 数据库
- 安装 Python 环境 (推荐 Python 3.11)
- 安装 `uv` (Python 包管理器)
- 安装 Docker Desktop
- 所有命令行操作推荐在 PowerShell 中执行

### 安装 UV

```powershell
# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# 验证安装
uv --version
```

## 源码部署

### 1. 克隆仓库

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. 安装依赖

```bash
cd nekro-agent

# 使用 UV 安装依赖
uv sync
```

### 3. 安装 PostgreSQL 数据库

1. 访问 [PostgreSQL 官网](https://www.postgresql.org/download/windows/)
2. 下载最新 15.x 版本安装包
3. 安装时：
   - 设置管理员密码（请牢记）
   - 保持默认端口 5432
   - 取消勾选"Stack Builder"

### 4. 数据库初始化

1. 打开 SQL Shell (psql) 或 pgAdmin
2. 执行以下 SQL 命令：

```sql
-- 创建数据库
CREATE DATABASE nekro_db;
```

### 5. 生成配置文件

运行一次 Bot 加载插件并关闭以生成配置文件：

```bash
uv run nb run
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
POSTGRES_USER: postgres
POSTGRES_PASSWORD: your_password
POSTGRES_DATABASE: nekro_db
```

::: info 完整配置
完整配置说明请参考 [config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)
:::

### 7. 安装 Docker Desktop

1. 访问 [Docker 官网](https://www.docker.com/products/docker-desktop/)
2. 下载 Windows 版本并安装
3. 启动后右下角出现鲸鱼图标即成功
4. （可选）在设置中启用 WSL2 后端提升性能

### 8. 拉取沙盒镜像

拉取用于沙盒环境的 Docker 镜像：

```powershell
# 拉取稳定版本
docker pull kromiose/nekro-agent-sandbox:latest

# 或拉取预览版本（包含最新功能）
docker pull kromiose/nekro-agent-sandbox:preview

# 验证镜像
docker images | findstr "nekro-agent-sandbox"
```

### 9. 设置 WebUI 密码

::: warning 注意
由于 nekro_agent 的 webui 密码是被存放在环境变量而非数据库，需要在环境变量中设置密码
:::

1. 打开文件资源管理器找到"此电脑", 右键点击 "属性"
2. 找到"高级系统设置", 并点击"环境变量"
3. 在环境变量中添加以下内容:
   - 名称: `NEKRO_ADMIN_PASSWORD`
   - 值: 你想要设置的密码
4. 点击"确定"保存设置并退出

### 10. 运行 Bot

```bash
# 正常启动
uv run nb run

# 开发调试模式下启用重载监视并排除动态扩展目录
uv run nb run --reload --reload-excludes ext_workdir
```

或使用命令行启动：
```bash
uv run bot
```

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

## 前端开发（可选）

如需开发前端页面，可按以下步骤进行：

### 1. 安装 Node.js
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 20.x LTS 版本（.msi 格式）
3. 安装时勾选 **Add to PATH** 选项

### 2. 配置 pnpm
```powershell
# 全局安装 pnpm
npm install -g pnpm

# 设置镜像加速
pnpm config set registry https://registry.npmmirror.com
```

### 3. 安装前端依赖
```powershell
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