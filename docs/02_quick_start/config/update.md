---
title: 应用更新指南
description: Nekro Agent 应用更新的方法与步骤，包括编排更新命令和更新日志查看途径
---

# 应用更新

Nekro Agent 会定期发布更新，包括功能改进、bug 修复和安全补丁。本文档将介绍如何安全地更新您的 Nekro Agent 实例。

## 🚀 编排更新（推荐）

Nekro Agent 提供了简便的编排更新命令，当新版本发布时，你可以使用以下一键命令更新应用

::: warning 注意事项

如果使用了 Wsl 或 OrbStack 虚拟机部署，以下命令需要进入虚拟机中执行

:::

```bash
# 设置数据目录
export NEKRO_DATA_DIR=${HOME}/srv/nekro_agent
# 更新 `nekro-agent` 镜像并重启容器
cd ${NEKRO_DATA_DIR} && \
 sudo docker-compose --env-file .env pull && \
 sudo docker-compose --env-file .env down && \
 sudo docker-compose --env-file .env up --build -d
```

## 📝 更新日志

每次更新后，可以在 [GitHub Releases](https://github.com/KroMiose/nekro-agent/releases) 查看更新日志了解变更内容
