# 快速开始

欢迎使用 Nekro Agent！本文档将帮助您快速开始使用这个强大的 AI 代理系统。

## 部署选择

根据您的操作系统选择合适的部署方式：

- [Linux 部署教程](/docs/guide/deploy/linux) - 适用于各类 Linux 发行版
- [Windows 部署教程](/docs/guide/deploy/windows) - 适用于 Windows 10/11 系统
- [MacOS 部署教程](/docs/guide/deploy/macos) - 适用于 MacOS 系统

## 基本配置

成功部署后，您需要完成以下基本配置：

1. **协议端配置**：连接到您选择的聊天平台
2. **模型配置**：设置 AI 模型及 API 密钥
3. **系统配置**：设置基本系统参数和用户权限

详细配置说明请参考以下文档：

- [协议端配置](/docs/guide/config/protocol)
- [系统配置](/docs/guide/config/system)
- [应用更新](/docs/guide/config/update)

## 首次使用

### 访问管理界面

完成部署后，您可以通过以下地址访问管理界面：

- `http://<您的服务器IP>:8021` (远程访问)
- `http://localhost:8021` (本地访问)

### 登录管理界面

首次登录时，请使用部署过程中生成的管理员账户和密码进行登录

### 基本使用流程

1. **连接协议端**：完成协议端配置并确认连接状态
2. **设置人设**：配置 AI 的基本人设和行为模式
3. **测试对话**：通过您选择的平台与 AI 进行对话测试
4. **扩展功能**：按需启用所需的扩展功能

## 下一步

完成基础配置后，您可以探索更多高级功能：

- [模型组配置](/docs/advanced/model-config) - 配置多种模型组合
- [人设技巧](/docs/advanced/persona-tips) - 优化 AI 人设
- [插件使用](/docs/advanced/plugin-principles) - 使用功能插件扩展能力

## 快速参考

### 常用管理命令

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f nekro_agent

# 重启服务
docker-compose restart nekro_agent
```

### 常用聊天指令

```
/help - 显示帮助信息
/reset - 重置当前会话
/system - 显示系统状态
/reload - 重新加载配置
```
