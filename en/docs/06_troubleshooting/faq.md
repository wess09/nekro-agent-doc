---
title: Frequently Asked Questions (FAQ)
description: Collection of common issues and solutions during Nekro Agent usage, covering various common problems related to deployment, configuration, and functionality
---

# Frequently Asked Questions

This document collects common issues and solutions encountered during the use of Nekro Agent.

## Deployment Related

### Q: Docker container fails to start

**A**: Common reasons include:

1. Port conflicts: Check if ports 8021 and 6099 are occupied
2. Configuration file errors: Check if the configs/nekro-agent.yaml format is correct
3. Permission issues: Ensure the installation directory has correct permissions

View logs for detailed error information:

```bash
docker-compose logs -f nekro_agent
```

### Q: Cannot access WebUI after installation

**A**: Please check:

1. If the container is running normally: `docker-compose ps`
2. If the firewall has opened port 8021
3. If the server security group settings allow access to this port
4. Try accessing with a different browser

### Q: Getting `Cannot connect to the Docker daemon` error

**A**: Docker service is not started or there's a user permission issue.

```bash
# Start Docker service
sudo systemctl start docker
```

### Q: Getting `port is already allocated` error

**A**: The specified port is already occupied by another program.

```bash
# View process occupying the port
sudo lsof -i :8021

# Modify port configuration in .env file
vim .env
# Change NEKRO_AGENT_PORT or NAPCAT_PORT to other unoccupied ports
```

### Q: Getting `Failed to pull image` error

**A**: Network connection issues or restricted Docker Hub access. Solution: Configure Docker image acceleration.

### Q: How to deploy multiple NekroAgent instances on the same device?

**A**: First use `export NEKRO_DATA_DIR=<your_directory>` to set non-conflicting directories, then run the installation script and modify the `.env` file as prompted, set appropriate prefixes to avoid container name conflicts, set appropriate ports to avoid port conflicts, and continue to complete the deployment.

## Configuration Related

### Q: How to change default ports?

**A**: Edit the `.env` file and modify the following variables:

```
NEKRO_AGENT_PORT=8021  # Change to your desired port
NAPCAT_PORT=6099       # If using NapCat, you can also modify this port
```

After modification, you need to restart the service: `docker-compose down && docker-compose up -d`

### Q: What to do when model API calls fail?

**A**: Possible reasons include:

1. API key error: Check API_KEY configuration
2. Network issues: Check network connection, some model providers may require proxy configuration to access
3. Model name error: Confirm if CHAT_MODEL name is correct
4. Insufficient balance: Check API account balance

## Functionality Related

### Q: Why can't my bot send file content other than text/images?

**A**: Please check if your protocol implementation supports file sending. If it does, please continue.

Due to limitations of the OneBot V11 protocol, when sending files, the protocol endpoint needs to be able to directly access the file path. Therefore, you need to set the file access base path for NekroAgent configuration according to your actual deployment situation. Here's an example:

Assuming your protocol endpoint is deployed in a container, you first need to mount NekroAgent's data directory to the protocol endpoint container, i.e., `${HOME}/srv/nekro_agent:/app/nekro_agent_data`, then configure the file access base path for NekroAgent:

```
SANDBOX_ONEBOT_SERVER_MOUNT_DIR: "/app/nekro_agent_data"
```

This way, NekroAgent can access the protocol endpoint's data directory and thus send file content.

### Q: What to do when AI doesn't respond to my messages?

**A**: Possible reasons include:

1. Protocol endpoint connection issues: Check if the protocol endpoint is properly connected
2. Message filtering settings: Check message ignoring settings in WebUI
3. AI response generation failure: Check logs for specific errors

### Q: How to switch AI personas?

**A**: Set up persona information in "Persona Management" in WebUI, then select the persona in "Session Management"

### Q: What to do when sandbox code execution times out?

**A**: Adjust sandbox execution time limit:

```yaml
SANDBOX_RUNTIME_LIMIT: 60 # Adjust to a larger value, unit is seconds
```

### Q: How to completely uninstall Nekro Agent?

**A**: Execute the following commands:

```bash
# Stop and delete containers
cd <your_installation_directory>
sudo docker-compose down

# Delete mounted volumes (if instance prefix was set during installation, the following mounted volumes need to have the corresponding prefix added)
sudo docker volume rm nekro_postgres_data
sudo docker volume rm nekro_qdrant_data

# Optional: Delete images
sudo docker rmi kromiose/nekro-agent kromiose/nekro-agent-sandbox

# Delete installation directory
cd ..
rm -rf <installation_directory>
```

## Getting Support

If the above methods cannot solve your problem, you can get support through the following channels:

1. Check [GitHub Issues](https://github.com/KroMiose/nekro-agent/issues)
2. Join official QQ group: 636925153
3. Submit a new Issue describing your problem