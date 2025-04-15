# 应用更新

Nekro Agent 会定期发布更新，包括功能改进、bug 修复和安全补丁。本文档将介绍如何安全地更新您的 Nekro Agent 实例。

## 🚀 自动更新（推荐）

Nekro Agent 提供了简便的自动更新脚本，当新版本发布时，你可以使用以下一键命令更新应用

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
