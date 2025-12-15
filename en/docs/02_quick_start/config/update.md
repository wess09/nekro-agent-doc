---
title: Application Update Guide
description: Methods and steps for updating Nekro Agent application, including orchestration update commands and ways to view update logs
---

# Application Update

Nekro Agent regularly releases updates, including feature improvements, bug fixes, and security patches. This document will introduce how to safely update your Nekro Agent instance.

## 🚀 Orchestration Update (Recommended)

Nekro Agent provides convenient orchestration update commands. When a new version is released, you can use the following one-click command to update the application

::: warning Notes

If you used Wsl or OrbStack virtual machine deployment, the following commands need to be executed inside the virtual machine

:::

### Enter Data Directory

```bash
# If you modified the data directory, please set it according to the actual situation
export NEKRO_DATA_DIR=${HOME}/srv/nekro_agent && \
cd ${NEKRO_DATA_DIR}
```

### Update Only Nekro Agent and Sandbox Images (Recommended)

```bash
sudo docker pull kromiose/nekro-agent-sandbox:latest && \
sudo docker-compose --env-file .env pull nekro_agent && \
sudo docker-compose --env-file .env up --build -d nekro_agent
```

### Update All Images and Restart Containers (If you need to update NapCat or other data support services at the same time)

> This command will update the `nekro-agent` image and all dependent images, which may cause the Bot to go offline and require re-login

```bash
sudo docker pull kromiose/nekro-agent-sandbox:latest && \
sudo docker-compose --env-file .env pull && \
sudo docker-compose --env-file .env up --build -d
```

## 📝 Update Logs

After each update, you can check the [GitHub Releases](https://github.com/KroMiose/nekro-agent/releases) to view the update logs and understand the changes