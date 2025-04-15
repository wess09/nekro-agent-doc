# 常见错误与处理

本文档收集了使用 Nekro Agent 过程中可能遇到的常见错误及其解决方法。

## 部署错误

### Docker 相关错误

#### 错误：`Cannot connect to the Docker daemon`

**原因**：Docker 服务未启动或用户权限问题。

**解决方法**：

```bash
# 启动 Docker 服务
sudo systemctl start docker
```

#### 错误：`port is already allocated`

**原因**：指定的端口已被其他程序占用。

**解决方法**：

```bash
# 查看占用端口的进程
sudo lsof -i :8021

# 修改 .env 文件中的端口配置
nano .env
# 修改 NEKRO_AGENT_PORT=8021 为其他未占用端口
```

### 网络相关错误

#### 错误：`Failed to pull image`

**原因**：网络连接问题或 Docker Hub 访问受限。

**解决方法**：配置 Docker 镜像加速

## 获取支持

如果以上方法无法解决您的问题，可以通过以下渠道获取支持：

1. 查阅 [GitHub Issues](https://github.com/KroMiose/nekro-agent/issues)
2. 加入官方 QQ 群: 636925153
3. 提交新的 Issue 描述您的问题
