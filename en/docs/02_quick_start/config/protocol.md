---
title: Protocol Endpoint Configuration Guide
description: Detailed explanation of Nekro Agent protocol endpoint configuration, including NapCat integrated deployment and connection methods for other protocol endpoints, as well as troubleshooting
---

# Protocol Endpoint Configuration

Nekro Agent supports multiple OneBot V11 compatible protocol endpoint connection methods. This document will introduce how to configure different protocol endpoints.

## NapCat Integrated Deployment (Recommended)

[NapCat](https://github.com/NapNeko/NapCatQQ) is a modern QQNT-based Bot protocol endpoint implementation. If you used the one-click script that includes NapCat deployment, please skip directly to step 4, use Token to log in to NapCat, and configure the Websocket client according to the steps.

::: warning Warning!

1. Be sure to change NapCat default password: Public WebUI must use strong passwords (recommended 12+ characters, including numbers, letters, and symbols)
2. Be sure to use Token authentication: OneBot service must set a valid Token, avoid empty Token or weak passwords
3. For security reasons, please avoid using default ports

:::

#### Configuration Steps

::: warning Note

1. The following steps use default installation configuration as an example. If you modified ports during deployment, please replace ports 8021 and 6099 in the steps with your actual port numbers
2. If you used a cloud server for deployment, please first open ports 8021 and 6099 (or modified ports) in the cloud server's security group

:::

1. Open Nekro Agent WebUI: `http://<your service ip>:8021`
2. Log in using the account and password provided by the installation script
3. Configure NapCat:

   - By default, NapCat WebUI address should be `http://<your service ip>:6099/webui` (can be modified in "System Configuration" → "Basic Configuration")
   - In "Protocol Endpoint" → "NapCat" → "WebUI", use the Token displayed at the top of the page to log in and log in to the QQ account that needs to be used as a Bot
   - Add Websocket client in "Network Configuration":
     - Add URL: `ws://nekro_agent:8021/onebot/v11/ws` (URL uses container network communication, use this address regardless of whether ports were modified)
     - Configure OneBot access key, which is the `OneBot Access Key` displayed at the top of this page, just copy and fill it in
     - Turn on the "Enable" switch and save

After configuration is complete, please refer to the [System Configuration Guide](/en/docs/02_quick_start/config/system.html) document to continue with basic application configuration and start using

### Other Protocol Endpoints

If you used other protocol endpoints, please configure their reverse WebSocket address to: `ws://<your service ip>:8021/onebot/v11/ws` to connect to NekroAgent and start using

:::warning
Using other protocol endpoints requires you to configure the NekroAgent data mount directory yourself, otherwise you may not be able to properly send and receive images, files, and other resources
:::

## Troubleshooting

### Connection Issues

- **Connection failure**: Check network connection and firewall settings
- **Authentication failure**: Check if OneBot service access key is correctly set (obtain in NekroAgent's WebUI "Protocol Endpoint" → "NapCat" → "WebUI")

### Message Reception Issues

- **Not receiving messages**: Check logs on both ends to confirm if connection is properly established (NekroAgent system log shows `connection open`)
- **Message format error**: Check if you're using a compatible OneBot implementation