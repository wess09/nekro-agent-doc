---
title: Linux開発・デプロイメントガイド
description: Linux環境でのNekro Agentの開発とデプロイメントに関する完全ガイド
---

# Linux開発環境セットアップ

::: warning 警告
このドキュメントは開発環境専用であり、デプロイメントや使用には推奨されません。
:::

## 前提条件

開発環境要件：

- 機能するPostgreSQLデータベース
- Python環境がインストール済み（Python 3.11推奨）
- `uv`をインストール（Pythonパッケージマネージャー）
- Docker & Docker Compose

### UVのインストール

```bash
# Linux/macOS
curl -LsSf https://astral.sh/uv/install.sh | sh

# インストールを確認
uv --version
```

::: tip sudo権限について
プロジェクトがDockerを呼び出す必要があるため、一部の開発シナリオではsudo権限が必要になる場合があります。`uv`と`poe`をsudoで使用できるようにするには：

**UVとpoeをシステムパスにインストール**
```bash
# UVをシステムパスにインストール
sudo cp ~/.local/bin/uv /usr/local/bin/
sudo cp ~/.local/bin/uvx /usr/local/bin/
sudo chmod +x /usr/local/bin/uv /usr/local/bin/uvx

# poeをシステムパスにインストール（プロジェクトで依存関係をインストール後）
cd nekro-agent
uv sync --all-extras
sudo cp ~/.local/share/uv/tools/poethepoet/bin/poe /usr/local/bin/
sudo chmod +x /usr/local/bin/poe

# 新しいターミナルで確認
sudo uv --version
sudo poe --help
```

**sudoで開発サーバーを実行：**
```bash
sudo -E uv run poe dev
# または
sudo -E poe dev
```

`-E`パラメータは現在のユーザーの環境変数を保持します。
:::

## ソースコードデプロイメント

### 1. リポジトリをクローン

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. 依存関係をインストール

```bash
cd nekro-agent

# UVを使用して依存関係をインストール
uv sync
```

### 3. 設定ファイルを生成

Botを一度実行してプラグインをロードし、設定ファイルを生成するために閉じます：

```bash
uv run nb run
```

### 4. 必要な情報を設定

設定ファイル`./data/configs/nekro-agent.yaml`を編集して、データベース接続やその他の情報を設定します。

```yaml
# Botと管理情報
SUPER_USERS: # 管理者ユーザーQQ番号のリスト
  - "12345678"
BOT_QQ: "12345678" # Bot QQ番号（**必須**）
ADMIN_CHAT_KEY: group_12345678 # 管理者セッションチャネル識別子

# PostgreSQLデータベース設定
POSTGRES_HOST: 127.0.0.1
POSTGRES_PORT: 5432
POSTGRES_USER: db_username
POSTGRES_PASSWORD: db_password
POSTGRES_DATABASE: nekro_agent
```

::: info 完全な設定
完全な設定手順については、[config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)を参照してください
:::

### 5. サンドボックスイメージをプル

サンドボックス環境用のDockerイメージをプルします：

```bash
sudo bash sandbox.sh --pull
```

イメージ内の依存関係パッケージを変更する必要がある場合は、`sandbox/dockerfile`と`sandbox/pyproject.toml`ファイルを変更し、`sudo bash sandbox.sh --build`を使用してイメージを再構築できます

### 6. Botを実行

```bash
# 通常起動
uv run nb run

# 開発デバッグモードでリロード監視を有効にし、動的拡張ディレクトリを除外
uv run nb run --reload --reload-excludes ext_workdir
```

### 7. OneBot設定

任意のOneBotプロトコルクライアントを使用してBotにログインし、リバースWebSocket接続方法を使用して、接続アドレスを設定します：

```
ws://127.0.0.1:8021/onebot/v11/ws
```

::: tip
ここでのポートは`.env.prod`で設定できます。デフォルトは`8021`です
:::

### 8. デバッグモード

プロジェクトには`.vscode/launch.json`ファイルが含まれており、VSCodeの組み込みデバッグ起動設定を使用して直接デバッグできます。

## フロントエンド開発（オプション）

フロントエンドページを開発する必要がある場合は、以下の手順に従ってください：

### 1. Node.jsをインストール

`nvm`（Node Version Manager）を使用してNode.jsバージョンを管理することをお勧めします。

1.  `nvm`をインストール：
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
2.  インストール後、プロンプトに従ってシェル設定ファイル（例：`~/.bashrc`、`~/.zshrc`）に`nvm`読み込みコマンドを追加し、ターミナルを再起動します。
3.  Node.js 20をインストール：
    ```bash
    nvm install 20
    nvm use 20
    ```
    システムのパッケージマネージャーからインストールすることもできますが、バージョンが20.xであることを確認してください。

### 2. pnpmを設定
```bash
# pnpmをグローバルにインストール
npm install -g pnpm

# ミラーを設定して加速
pnpm config set registry https://registry.npmmirror.com
```

### 3. フロントエンド依存関係をインストール
```bash
cd frontend

# 依存関係をインストール
pnpm install --frozen-lockfile
```

### 4. フロントエンドを開始
```bash
cd ./frontend
pnpm dev
```

以下のログが表示されたら、ブラウザでアクセスできます：
```
VITE vx.x.x  ready in xxx ms

➜  Local:   http://localhost:xxxx/ <- これがポート番号です
➜  Network: use --host to expose
➜  press h + enter to show help
```