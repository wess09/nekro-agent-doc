---
title: macOS開発・デプロイメントガイド
description: macOS環境でのNekro Agentの開発とデプロイメントに関する完全ガイド
---

# macOS開発環境セットアップ

::: warning 警告
このドキュメントは開発環境専用であり、デプロイメントや使用には推奨されません。
:::

## 前提条件

開発環境要件：

- 機能するPostgreSQLデータベース
- Python環境がインストール済み（Python 3.10推奨）
- `poetry`をインストール（Python依存関係管理ツール）
- `nb-cli`をインストール（NoneBotスキャフォールディングツール）
- Mac用のOrbStackまたはDocker Desktopをインストール

### 基本的な開発ツールをインストール

1. Homebrewをインストール（まだインストールしていない場合）

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Pythonをインストール

```bash
brew install python@3.10
```

3. 開発依存関係をインストール

```bash
pip3 install poetry
pip3 install nb-cli
```

## ソースコードデプロイメント

### 1. リポジトリをクローン

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. 依存関係をインストール

```bash
cd nekro-agent
poetry config virtualenvs.in-project true  # プロジェクトディレクトリに仮想環境をインストール（オプション）
uv sync
```

### 3. PostgreSQLデータベースをインストール

Homebrew経由でインストール：

```bash
brew install postgresql@15
brew services start postgresql@15
```

### 4. データベース初期化

1. データベースを作成：

```bash
# postgresユーザーに切り替え
psql postgres

# PostgreSQL内で実行
CREATE DATABASE nekro_db;
\q
```

### 5. 設定ファイルを生成

Botを一度実行してプラグインをロードし、設定ファイルを生成するために閉じます：

```bash
nb run
```

### 6. 必要な情報を設定

設定ファイル`./data/configs/nekro-agent.yaml`を編集して、データベース接続やその他の情報を設定します。

```yaml
# Botと管理情報
SUPER_USERS: # 管理者ユーザーQQ番号のリスト
  - "12345678"
BOT_QQ: "12345678" # Bot QQ番号（**必須**）
ADMIN_CHAT_KEY: group_12345678 # 管理者セッションチャネル識別子

# PostgreSQLデータベース設定
POSTGRES_HOST: localhost
POSTGRES_PORT: 5432
POSTGRES_USER: postgres  # macOSのデフォルトユーザー名は通常現在のユーザー名
POSTGRES_PASSWORD: ""    # ローカル開発環境ではパスワードがない場合がある
POSTGRES_DATABASE: nekro_db
```

::: info 完全な設定
完全な設定手順については、[config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)を参照してください
:::

### 7. Docker環境をインストール

macOSでは、コンテナ管理ツールとしてOrbStackを使用することをお勧めします。これはDocker Desktopよりも軽量で高性能です。

#### オプション1: OrbStackをインストール（推奨）

```bash
brew install --cask orbstack
```

インストール後にOrbStackアプリケーションを起動します。

#### オプション2: Docker Desktop for Macをインストール

1. [Docker Desktop公式サイト](https://www.docker.com/products/docker-desktop/)にアクセスしてmacOS版をダウンロード
2. Docker Desktopをインストールして起動
3. Dockerサービスが正常に実行されていることを確認：`docker info`

### 8. サンドボックスイメージをプル

サンドボックス環境用のDockerイメージをプルします：

```bash
# イメージをプル
docker pull kromiose/nekro-agent-sandbox:latest

# イメージを確認
docker images | grep nekro-agent-sandbox
```

### 9. WebUIパスワードを設定

macOSで環境変数を設定：

```bash
# 一時的な設定（現在のターミナルセッションで有効）
export NEKRO_ADMIN_PASSWORD="your_password"

# 永続的な設定（ターミナルの再起動が必要）
echo 'export NEKRO_ADMIN_PASSWORD="your_password"' >> ~/.zshrc  # zshを使用している場合
# または
echo 'export NEKRO_ADMIN_PASSWORD="your_password"' >> ~/.bash_profile  # bashを使用している場合
```

### 10. Botを実行

```bash
nb run
# 開発デバッグモードでリロード監視を有効にし、動的拡張ディレクトリを除外
nb run --reload --reload-excludes ext_workdir
```

::: warning 注意
macOSで実行する場合、権限の問題が発生した場合は、sudoを使用する必要がある場合があります：
```bash
sudo nb run
```
:::

### 11. OneBot設定

任意のOneBotプロトコルクライアントを使用してBotにログインし、リバースWebSocket接続方法を使用して、接続アドレスを設定します：

```
ws://127.0.0.1:8021/onebot/v11/ws
```

::: tip
ここでのポートは`.env.prod`で設定できます。デフォルトは`8021`です
:::

### 12. デバッグモード

プロジェクトには`.vscode/launch.json`ファイルが含まれており、VSCodeを使用して直接デバッグできます：

1. プロジェクトルートディレクトリを開く
2. `F5`を押してデバッグを開始
3. ターミナル出力が正常かどうかを観察

## OrbStack仮想マシンを使用した開発（代替案）

ネイティブのmacOS環境で互換性の問題が発生した場合は、OrbStack仮想マシンを使用して開発することを検討してください：

### 1. Linux仮想マシンを作成

```bash
orb create ubuntu nekro-dev
```

### 2. 仮想マシンに入る

```bash
orb -m nekro-dev
```

### 3. 仮想マシンでLinux開発ガイドに従う

仮想マシン内で、[Linux開発・デプロイメントガイド](/ja/docs/05_app_dev/dev_linux.html)に従って後続の操作を実行します。

## フロントエンド開発（オプション）

フロントエンドページを開発する必要がある場合は、以下の手順に従ってください：

### 1. Node.jsをインストール
```bash
brew install node@20
```

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