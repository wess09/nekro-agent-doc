---
title: macOS 部署 Nekro Agent
description: 在macOS系统上部署 Nekro Agent 的完整指南，使用 OrbStack 作为容器管理工具，包含环境准备和两种部署方式的详细步骤
---

# MacOS 部署教程

本文档将指导您在 MacOS 系统上部署 Nekro Agent。

## 🌈 环境准备

由于 Nekro Agent 基于 Docker 运行，我们推荐使用 OrbStack 作为 MacOS 上的容器管理工具，并通过其虚拟机功能进行部署。

### 安装 OrbStack

#### 方法一：使用 Homebrew 安装（推荐）

```bash
brew install --cask orbstack
```

#### 方法二：直接下载安装

1. 访问 [OrbStack 官网](https://orbstack.dev/) 下载最新版本
2. 安装完成后启动 OrbStack 应用
3. 确认 OrbStack 正常运行（状态栏应显示 OrbStack 图标）

### 创建并使用 OrbStack 虚拟机

1. 打开 OrbStack 应用
2. 点击"Create Machine"创建一个新的 Linux 虚拟机（推荐选择 Ubuntu）
3. 或使用命令行创建：

```bash
orb create ubuntu my-machine
```

### 在 OrbStack 中使用虚拟机

OrbStack 提供了简单的方式进入虚拟机和执行命令：

- 直接输入 `orb` 命令进入默认虚拟机的终端
- 使用 `orb -m <虚拟机名称>` 进入指定虚拟机
- 使用 `orb <命令>` 在默认虚拟机中执行命令
- 使用 `orb -m <虚拟机名称> <命令>` 在指定虚拟机中执行命令

例如：

```bash
# 进入默认虚拟机
orb

# 进入名为 ubuntu 的虚拟机
orb -m ubuntu

# 在默认虚拟机中执行 ls 命令
orb ls

# 在 ubuntu 虚拟机中执行 ls 命令
orb -m ubuntu ls
```

## 🚀 部署方式（在 OrbStack 虚拟机中）

在进入 OrbStack 虚拟机后执行以下操作：

### 方式一：标准部署（推荐）

集成 Napcat 协议端的自动化部署版本，一键完成所有服务组件与协议端部署

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start_x_napcat.sh)"
```

如果部署过程出现网络问题无法正确下载脚本，可使用国内 GitCode 加速部署命令：

> 注意: GitCode 加速的部署方式依赖于 GitCode 同步速度，可能无法及时同步最新版本，如有条件尽量使用 Github 脚本部署

```bash
sudo -E bash -c "$(curl -fsSL https://raw.gitcode.com/gh_mirrors/ne/nekro-agent/raw/main/docker/quick_start_x_napcat.sh)" - -g
```

::: warning 注意事项

- 默认安装目录：`~/srv/nekro_agent`
- 如需修改安装目录：执行 `export NEKRO_DATA_DIR=<你的目录>`
- 本地部署需放行端口：
  - 8021：NekroAgent 主服务
  - 6099：Napcat 服务
- 请注意保存安装脚本中提供的面板登陆信息，以便后续配置使用

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
