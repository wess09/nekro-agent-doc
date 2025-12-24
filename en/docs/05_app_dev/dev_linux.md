---
title: Linux Development and Deployment Guide
description: Complete guide for development and deployment of Nekro Agent in Linux environment
---

# Linux Development Environment Setup

::: warning Warning
This document is for development environment only and is not recommended for deployment or use.
:::

## Prerequisites

Development environment requirements:

- A functional PostgreSQL database
- Python environment installed (Python 3.11 recommended)
- Install `uv` (Python package manager)
- Docker & Docker Compose

### Install UV

```bash
# Linux/macOS
curl -LsSf https://astral.sh/uv/install.sh | sh

# Verify installation
uv --version
```

::: tip About sudo permissions
Due to the project's need to call Docker, some development scenarios may require sudo permissions. To ensure `uv` and `poe` are available under sudo:

**Install UV and poe to system path**
```bash
# Install UV to system path
sudo cp ~/.local/bin/uv /usr/local/bin/
sudo cp ~/.local/bin/uvx /usr/local/bin/
sudo chmod +x /usr/local/bin/uv /usr/local/bin/uvx

# Install poe to system path (after installing dependencies in the project)
cd nekro-agent
uv sync --all-extras
sudo cp ~/.local/share/uv/tools/poethepoet/bin/poe /usr/local/bin/
sudo chmod +x /usr/local/bin/poe

# Verify in a new terminal
sudo uv --version
sudo poe --help
```

**Run development server with sudo:**
```bash
sudo -E uv run poe dev
# or
sudo -E poe dev
```

The `-E` parameter preserves the current user's environment variables.
:::

## Source Code Deployment

### 1. Clone Repository

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. Install Dependencies

```bash
cd nekro-agent

# Install dependencies using UV
uv sync
```

### 3. Generate Configuration File

Run the Bot once to load plugins and then close it to generate configuration files:

```bash
uv run nb run
```

### 4. Configure Required Information

Edit the configuration file `./data/configs/nekro-agent.yaml` to configure database connection and other information.

```yaml
# Bot and management information
SUPER_USERS: # List of admin user QQ numbers
  - "12345678"
BOT_QQ: "12345678" # Bot QQ number (**Required**)
ADMIN_CHAT_KEY: group_12345678 # Admin session channel identifier

# PostgreSQL database configuration
POSTGRES_HOST: 127.0.0.1
POSTGRES_PORT: 5432
POSTGRES_USER: db_username
POSTGRES_PASSWORD: db_password
POSTGRES_DATABASE: nekro_agent
```

::: info Complete Configuration
For complete configuration instructions, please refer to [config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)
:::

### 5. Pull Sandbox Image

Pull the Docker image for the sandbox environment:

```bash
sudo bash sandbox.sh --pull
```

If you need to modify dependency packages in the image, you can modify the `sandbox/dockerfile` and `sandbox/pyproject.toml` files, then use `sudo bash sandbox.sh --build` to rebuild the image

### 6. Run Bot

```bash
# Normal startup
uv run nb run

# Enable reload monitoring in development debug mode and exclude dynamic extension directories
uv run nb run --reload --reload-excludes ext_workdir
```

### 7. OneBot Configuration

Use any OneBot protocol client to log in to the bot and use reverse WebSocket connection method, configure the connection address:

```
ws://127.0.0.1:8021/onebot/v11/ws
```

::: tip
The port here can be configured in `.env.prod`, default is `8021`
:::

### 8. Debug Mode

The project includes a `.vscode/launch.json` file, which allows you to debug directly using VSCode with its built-in debug launch configuration.

## Frontend Development (Optional)

If you need to develop frontend pages, follow these steps:

### 1. Install Node.js

It is recommended to use `nvm` (Node Version Manager) to manage Node.js versions.

1.  Install `nvm`:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
2.  After installation, add the `nvm` loading command to your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`) according to the prompts and restart the terminal.
3.  Install Node.js 20:
    ```bash
    nvm install 20
    nvm use 20
    ```
    You can also install through your system's package manager, but ensure the version is 20.x.

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
