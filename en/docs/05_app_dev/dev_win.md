---
title: Windows Development and Deployment Guide
description: Complete guide for development and deployment of Nekro Agent in Windows environment
---

# Windows Development Environment Setup

::: warning Warning
This document is for development environment only and is not recommended for deployment or use.
:::

## Prerequisites

Development environment requirements:

- A functional PostgreSQL database
- Python environment installed (Python 3.10 recommended)
- Install `poetry` (Python dependency management tool)
- Install `nb-cli` (NoneBot scaffolding tool)
- Install Docker Desktop
- All command line operations are recommended to be executed in PowerShell

```bash
pip install poetry
pip install nb-cli
```

## Source Code Deployment

### 1. Clone Repository

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. Install Dependencies

```bash
cd nekro-agent
pip install poetry  # Need to install Python environment first: Python 3.10 recommended
poetry config virtualenvs.in-project true  # Install virtual environment in project directory (optional)
poetry install
```

### 3. Install PostgreSQL Database

1. Visit [PostgreSQL official website](https://www.postgresql.org/download/windows/)
2. Download the latest 15.x version installer
3. During installation:
   - Set administrator password (please remember it)
   - Keep default port 5432
   - Uncheck "Stack Builder"

### 4. Database Initialization

1. Open SQL Shell (psql) or pgAdmin
2. Execute the following SQL commands:

```sql
-- Create database
CREATE DATABASE nekro_db;
```

### 5. Generate Configuration File

Run the Bot once to load plugins and then close it to generate configuration files:

```bash
nb run
```

### 6. Configure Required Information

Edit the configuration file `./data/configs/nekro-agent.yaml` to configure database connection and other information.

```yaml
# Bot and management information
SUPER_USERS: # List of admin user QQ numbers
  - "12345678"
BOT_QQ: "12345678" # Bot QQ number (**Required**)
ADMIN_CHAT_KEY: group_12345678 # Admin session channel identifier

# PostgreSQL database configuration
POSTGRES_HOST: localhost
POSTGRES_PORT: 5432
POSTGRES_USER: postgres
POSTGRES_PASSWORD: your_password
POSTGRES_DATABASE: nekro_db
```

::: info Complete Configuration
For complete configuration instructions, please refer to [config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)
:::

### 7. Install Docker Desktop

1. Visit [Docker official website](https://www.docker.com/products/docker-desktop/)
2. Download Windows version and install
3. After startup, the whale icon in the bottom right corner indicates success
4. (Optional) Enable WSL2 backend in settings to improve performance

### 8. Pull Sandbox Image

Pull the Docker image for the sandbox environment:

```powershell
# Pull image
docker pull kromiose/nekro-agent-sandbox:latest

# Verify image
docker images | findstr "nekro-agent-sandbox"
```

### 9. Set WebUI Password

::: warning Note
Since the webui password of nekro_agent is stored in environment variables rather than database, you need to set the password in environment variables
:::

1. Open File Explorer and find "This PC", right-click on "Properties"
2. Find "Advanced system settings" and click "Environment Variables"
3. Add the following in environment variables:
   - Name: `NEKRO_ADMIN_PASSWORD`
   - Value: The password you want to set
4. Click "OK" to save settings and exit

### 10. Run Bot

```bash
nb run
# Enable reload monitoring in development debug mode and exclude dynamic extension directories
nb run --reload --reload-excludes ext_workdir
```

Or start via command line:
```bash
poetry run bot
```

### 11. OneBot Configuration

Use any OneBot protocol client to log in to the bot and use reverse WebSocket connection method, configure the connection address:

```
ws://127.0.0.1:8021/onebot/v11/ws
```

::: tip
The port here can be configured in `.env.prod`, default is `8021`
:::

### 12. Debug Mode

The project includes a `.vscode/launch.json` file, which allows you to debug directly using VSCode:

1. Open the project root directory
2. Press `F5` to start debugging
3. Observe if terminal output is normal

## Frontend Development (Optional)

If you need to develop frontend pages, follow these steps:

### 1. Install Node.js
1. Visit [Node.js official website](https://nodejs.org/)
2. Download 20.x LTS version (.msi format)
3. Check **Add to PATH** option during installation

### 2. Configure pnpm
```powershell
# Install pnpm globally
npm install -g pnpm

# Set up mirror for acceleration
pnpm config set registry https://registry.npmmirror.com
```

### 3. Install Frontend Dependencies
```powershell
cd frontend

# Install dependencies
pnpm install --frozen-lockfile
```

### 4. Start Frontend
```bash
cd ./frontend
pnpm dev
```

When you see the following log, you can access it in your browser:
```
VITE vx.x.x  ready in xxx ms

➜  Local:   http://localhost:xxxx/ <- This is the port number
➜  Network: use --host to expose
➜  press h + enter to show help
```