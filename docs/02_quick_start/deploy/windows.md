---
title: Windows 部署 Nekro Agent
description: 在 Windows 系统上部署 Nekro Agent 的详细步骤，包括WSL2环境准备和两种部署方式的完整指南
---

# Windows 部署教程

本文档将指导您在 Windows 系统上部署 Nekro Agent。

## 🌈 环境准备

由于 Nekro Agent 基于 Docker 运行，我们需要先在 Windows 上安装 WSL2（Windows Subsystem for Linux 2）。

### 安装 WSL2

1. 以管理员身份打开 PowerShell，执行以下命令启用 WSL 功能：

```powershell
wsl --install
```

2. 重启电脑完成安装
3. 启动 Ubuntu（默认安装的发行版），设置用户名和密码
4. 确认 WSL2 安装成功：

```powershell
wsl -l -v
```

输出应显示 VERSION 为 2

### 安装 Docker Desktop（可选但推荐）

1. 访问 [Docker Desktop 官网](https://www.docker.com/products/docker-desktop/) 下载最新版本
2. 安装时确保勾选"Use WSL 2 instead of Hyper-V"选项
3. 安装完成后启动 Docker Desktop
4. 在设置中确认已启用 WSL2 集成

## 🚀 部署方式

在 WSL2 的 Ubuntu 终端中进行以下操作：

### 方式一：标准部署（推荐）

集成 Napcat 协议端的自动化部署版本，一键完成所有服务组件与协议端部署

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start_x_napcat.sh)"
```

::: warning 注意事项

- 默认安装目录：`~/srv/nekro_agent`
- 如需修改安装目录：执行 `export NEKRO_DATA_DIR=<你的目录>`
- 本地部署需放行端口：
  - 8021：NekroAgent 主服务
  - 6099：Napcat 服务
- 请注意保存安装脚本中提供的面板登陆信息，以便后续配置使用
- 如有防火墙提示，请允许访问

:::

按照提示完成部署后，按照[协议端配置](/docs/02_quick_start/config/protocol.html#napcat-集成部署-推荐)文档说明完成配置

### 方式二：核心部署

仅部署 NekroAgent 核心服务组件，需要自行配置 OneBot V11 协议端。

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start.sh)"
```

监听的协议端连接地址：`ws://<你的服务ip>:8021/onebot/v11/ws`

### 部署后配置

前往[协议端配置](/docs/02_quick_start/config/protocol)文档，根据文档说明完成配置。
