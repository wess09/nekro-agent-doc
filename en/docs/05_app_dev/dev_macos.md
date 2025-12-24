---
title: macOS Development and Deployment Guide
description: Complete guide for development and deployment of Nekro Agent in macOS environment
---

# macOS Development Environment Setup

::: warning Warning
This document is for development environment only and is not recommended for deployment or use.
:::

## Prerequisites

Development environment requirements:

- A functional PostgreSQL database
- Python environment installed (Python 3.10 recommended)
- Install `poetry` (Python dependency management tool)
- Install `nb-cli` (NoneBot scaffolding tool)
- Install OrbStack or Docker Desktop for Mac

### Install Basic Development Tools

1. Install Homebrew (if not already installed)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install Python

```bash
brew install python@3.10
```

3. Install development dependencies

```bash
pip3 install poetry
pip3 install nb-cli
```

## Source Code Deployment

### 1. Clone Repository

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. Install Dependencies

```bash
cd nekro-agent
poetry config virtualenvs.in-project true  # Install virtual environment in project directory (optional)
uv sync
```

### 3. Install PostgreSQL Database

Install via Homebrew:

```bash
brew install postgresql@15
brew services start postgresql@15
```

### 4. Database Initialization

1. Create database:

```bash
# Switch to postgres user
psql postgres

# Execute within PostgreSQL
CREATE DATABASE nekro_db;
\q
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
POSTGRES_USER: postgres  # Default username in macOS is usually the current username
POSTGRES_PASSWORD: ""    # Local development environment may have no password
POSTGRES_DATABASE: nekro_db
```

::: info Complete Configuration
For complete configuration instructions, please refer to [config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)
:::

### 7. Install Docker Environment

On macOS, we recommend using OrbStack as a container management tool, which is lighter and more performant than Docker Desktop.

#### Option 1: Install OrbStack (Recommended)

```bash
brew install --cask orbstack
```

Start the OrbStack application after installation.

#### Option 2: Install Docker Desktop for Mac

1. Visit [Docker Desktop official website](https://www.docker.com/products/docker-desktop/) to download the macOS version
2. Install and start Docker Desktop
3. Confirm Docker service is running properly: `docker info`

### 8. Pull Sandbox Image

Pull the Docker image for the sandbox environment:

```bash
# Pull image
docker pull kromiose/nekro-agent-sandbox:latest

# Verify image
docker images | grep nekro-agent-sandbox
```

### 9. Set WebUI Password

Set environment variables in macOS:

```bash
# Temporary setting (effective for current terminal session)
export NEKRO_ADMIN_PASSWORD="your_password"

# Permanent setting (requires terminal restart to take effect)
echo 'export NEKRO_ADMIN_PASSWORD="your_password"' >> ~/.zshrc  # If using zsh
# Or
echo 'export NEKRO_ADMIN_PASSWORD="your_password"' >> ~/.bash_profile  # If using bash
```

### 10. Run Bot

```bash
nb run
# Enable reload monitoring in development debug mode and exclude dynamic extension directories
nb run --reload --reload-excludes ext_workdir
```

::: warning Note
When running on macOS, if you encounter permission issues, you may need to use sudo:
```bash
sudo nb run
```
:::

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

## Using OrbStack Virtual Machine for Development (Alternative)

If you encounter compatibility issues in the native macOS environment, consider using OrbStack virtual machine for development:

### 1. Create Linux Virtual Machine

```bash
orb create ubuntu nekro-dev
```

### 2. Enter Virtual Machine

```bash
orb -m nekro-dev
```

### 3. Follow Linux Development Guide in Virtual Machine

In the virtual machine, follow the [Linux Development and Deployment Guide](/en/docs/05_app_dev/dev_linux.html) for subsequent operations.

## Frontend Development (Optional)

If you need to develop frontend pages, follow these steps:

### 1. Install Node.js
```bash
brew install node@20
```

### 2. Configure pnpm
```bash
# Install pnpm globally
npm install -g pnpm

# Set up mirror for acceleration
pnpm config set registry https://registry.npmmirror.com
```

### 3. Install Frontend Dependencies
```bash
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
