---
title: Windows Deployment of Nekro Agent Complete System Image
description: Detailed steps for deploying Nekro Agent on Windows systems using Complete System Image
---

# Nekro Agent Complete System Image
## Introduction
Nekro Agent complete system image, suitable for Hyper-V and VMware virtual machines.

:::info Note

The complete system image may lag behind the latest version. It is recommended to use WSL or Hyper-V deployment.

Murong Lluanyuan provides image storage service

:::


#### Download Links
Hyper-V [Virtual Machine Image](https://pan.mrly.cc/s/b1ux)
:::tip Tip
System username: nekroagent   System password: nekro

System version: Ubuntu 22.04 LTS

Update date: May 21, 2025
:::
VMware To be implemented
#### Hyper-V Import Steps
1. Download and extract the image
2. Open Hyper-V Manager, select "Import Virtual Machine"
3. Select the extracted folder, choose the NekroAgent folder
4. Select "Register the virtual machine in-place (use the existing unique ID) (R)"
5. Select "Next", then select "Finish"

:::warning Warning
Please modify the system password immediately after installation

1. Be sure to change NapCat default password: Public WebUI must use strong passwords (recommended 12+ characters, including numbers, letters, and symbols)
2. Be sure to use Token authentication: OneBot service must set a valid Token, avoid empty Token or weak passwords
3. For security reasons, please avoid using default ports

:::

#### VMware Import Steps
To be implemented