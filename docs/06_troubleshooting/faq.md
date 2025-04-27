---
title: 常见问题解答(FAQ)
description: Nekro Agent 使用过程中的常见问题和解决方法汇总，涵盖部署、配置和功能相关的各类常见问题
---

# 常见问题解答

本文档收集了使用 Nekro Agent 过程中的常见问题和解决方法。

## 部署相关

### Q: Docker 容器无法启动

**A**: 常见原因包括：

1. 端口冲突：检查 8021 和 6099 端口是否被占用
2. 配置文件错误：检查 configs/nekro-agent.yaml 格式是否正确
3. 权限问题：确保安装目录有正确的权限

查看日志以获取详细错误信息：

```bash
docker-compose logs -f nekro_agent
```

### Q: 安装后无法访问 WebUI

**A**: 请检查：

1. 容器是否正常运行：`docker-compose ps`
2. 防火墙是否开放了 8021 端口
3. 服务器安全组设置是否允许该端口访问
4. 尝试使用不同的浏览器访问

### Q: 出现 `Cannot connect to the Docker daemon` 错误

**A**: Docker 服务未启动或用户权限问题。

```bash
# 启动 Docker 服务
sudo systemctl start docker
```

### Q: 出现 `port is already allocated` 错误

**A**: 指定的端口已被其他程序占用。

```bash
# 查看占用端口的进程
sudo lsof -i :8021

# 修改 .env 文件中的端口配置
vim .env
# 修改 NEKRO_AGENT_PORT 或 NAPCAT_PORT 为其他未占用端口
```

### Q: 出现 `Failed to pull image` 错误

**A**: 网络连接问题或 Docker Hub 访问受限。解决方法：配置 Docker 镜像加速。

### Q: 如何在同一设备上部署多个 NekroAgent 实例?

**A**: 请先使用 `export NEKRO_DATA_DIR=<你的目录>` 设置好不冲突的目录，然后运行安装脚本并按提示修改 `.env` 文件，设置合适的前缀以避免容器名冲突，设置合适的端口以避免端口冲突，继续完成部署即可

## 配置相关

### Q: 如何更改默认端口？

**A**: 编辑 `.env` 文件，修改以下变量：

```
NEKRO_AGENT_PORT=8021  # 修改为您希望的端口
NAPCAT_PORT=6099       # 如果使用 NapCat，也可以修改该端口
```

修改后需要重启服务：`docker-compose down && docker-compose up -d`

### Q: 模型 API 调用失败怎么办？

**A**: 可能的原因包括：

1. API 密钥错误：检查 API_KEY 配置
2. 网络问题：检查网络连接，一些模型供应商可能需要配置代理才能访问
3. 模型名称错误：确认 CHAT_MODEL 名称是否正确
4. 余额不足：检查 API 账户余额

## 功能相关

### Q: 为什么我的机器人无法发送 文字/图片 以外的文件内容?

**A**: 请检查你的协议实现是否支持文件发送，如果支持，请继续

由于 OneBot V11 协议的限制，发送文件时需要协议端能够直接访问到该文件的路径，因此你需要根据实际部署情况设为 NekroAgent 配置文件访问基准路径，以下是一个示例:

假设你的协议端部署在容器中，你需要先挂载 NekroAgent 的数据目录到协议端容器中，即 `${HOME}/srv/nekro_agent:/app/nekro_agent_data`，然后为 NekroAgent 配置文件访问基准路径:

```
SANDBOX_ONEBOT_SERVER_MOUNT_DIR: "/app/nekro_agent_data"
```

这样 NekroAgent 就可以访问到协议实现端的数据目录，从而发送文件内容了

### Q: AI 不响应我的消息怎么办？

**A**: 可能的原因包括：

1. 协议端连接问题：检查协议端是否正常连接
2. 消息过滤设置：检查 WebUI 中的消息忽略等设置
3. AI 响应生成失败：检查日志查看具体错误

### Q: 如何切换 AI 人设？

**A**: 在 WebUI 的「人设管理」中设置好人设信息，在「会话管理」中选择人设

### Q: 沙盒执行代码超时怎么办？

**A**: 调整沙盒执行时间限制：

```yaml
SANDBOX_RUNTIME_LIMIT: 60 # 调整为更大的值，单位为秒
```

### Q: 如何彻底卸载 Nekro Agent？

**A**: 执行以下命令：

```bash
# 停止并删除容器
cd <安装目录>
docker-compose down

# 可选：删除镜像
docker rmi kromiose/nekro-agent kromiose/napcat

# 删除挂载卷
docker volume rm nekro_agent_data
docker volume rm nekro_qdrant_data

# 删除安装目录
cd ..
rm -rf <安装目录>
```

### Q: 为什么文档站主页色彩有断层？

**A**: 火狐和其他非Chrome浏览器可能存在一些兼容性问题，成因未知

## 获取支持

如果以上方法无法解决您的问题，可以通过以下渠道获取支持：

1. 查阅 [GitHub Issues](https://github.com/KroMiose/nekro-agent/issues)
2. 加入官方 QQ 群: 636925153
3. 提交新的 Issue 描述您的问题