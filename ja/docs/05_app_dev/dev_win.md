---
title: Windows開発およびデプロイメントガイド
description: Windows環境でのNekro Agentの開発とデプロイメントに関する完全ガイド
---

# Windows開発環境セットアップ

::: warning 警告
このドキュメントは開発環境専用であり、デプロイメントや使用には推奨されません。
:::

## 前提条件

開発環境の要件：

- 機能するPostgreSQLデータベース
- Python環境がインストール済み（Python 3.10を推奨）
- `poetry`をインストール（Python依存関係管理ツール）
- `nb-cli`をインストール（NoneBotスキャフォールディングツール）
- Docker Desktopをインストール
- すべてのコマンドライン操作はPowerShellで実行することを推奨

```bash
pip install poetry
pip install nb-cli
```

## ソースコードデプロイメント

### 1. リポジトリのクローン

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. 依存関係のインストール

```bash
cd nekro-agent
pip install poetry  # 最初にPython環境をインストールする必要があります：Python 3.10を推奨
poetry config virtualenvs.in-project true  # プロジェクトディレクトリに仮想環境をインストール（オプション）
poetry install
```

### 3. PostgreSQLデータベースのインストール

1. [PostgreSQL公式サイト](https://www.postgresql.org/download/windows/)にアクセス
2. 最新の15.xバージョンのインストーラーをダウンロード
3. インストール中：
   - 管理者パスワードを設定（必ず記憶してください）
   - デフォルトポート5432を維持
   - "Stack Builder"のチェックを外す

### 4. データベースの初期化

1. SQL Shell (psql)またはpgAdminを開く
2. 以下のSQLコマンドを実行：

```sql
-- データベースを作成
CREATE DATABASE nekro_db;
```

### 5. 設定ファイルの生成

Botを一度実行してプラグインをロードし、その後閉じて設定ファイルを生成します：

```bash
nb run
```

### 6. 必要情報の設定

設定ファイル `./data/configs/nekro-agent.yaml` を編集して、データベース接続やその他の情報を設定します。

```yaml
# Botと管理情報
SUPER_USERS: # 管理者ユーザーQQ番号のリスト
  - "12345678"
BOT_QQ: "12345678" # Bot QQ番号（**必須**）
ADMIN_CHAT_KEY: group_12345678 # 管理者セッションチャネル識別子

# PostgreSQLデータベース設定
POSTGRES_HOST: localhost
POSTGRES_PORT: 5432
POSTGRES_USER: postgres
POSTGRES_PASSWORD: your_password
POSTGRES_DATABASE: nekro_db
```

::: info 完全な設定
完全な設定手順については、[config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)を参照してください
:::

### 7. Docker Desktopのインストール

1. [Docker公式サイト](https://www.docker.com/products/docker-desktop/)にアクセス
2. Windows版をダウンロードしてインストール
3. 起動後、右下のクジラアイコンが成功を示します
4. （オプション）設定でWSL2バックエンドを有効にしてパフォーマンスを向上

### 8. サンドボックスイメージのプル

サンドボックス環境用のDockerイメージをプルします：

```powershell
# イメージをプル
docker pull kromiose/nekro-agent-sandbox:latest

# イメージを確認
docker images | findstr "nekro-agent-sandbox"
```

### 9. WebUIパスワードの設定

::: warning 注意
nekro_agentのwebuiパスワードはデータベースではなく環境変数に保存されるため、環境変数でパスワードを設定する必要があります
:::

1. エクスプローラーを開き、「このPC」を見つけて右クリックし「プロパティ」を選択
2. 「詳細システム設定」を見つけてクリックし、「環境変数」を選択
3. 環境変数に以下を追加：
   - 名前: `NEKRO_ADMIN_PASSWORD`
   - 値: 設定したいパスワード
4. 「OK」をクリックして設定を保存して終了

### 10. Botの実行

```bash
nb run
# 開発デバッグモードでリロード監視を有効にし、動的拡張ディレクトリを除外
nb run --reload --reload-excludes ext_workdir
```

またはコマンドラインから起動：
```bash
poetry run bot
```

### 11. OneBot設定

任意のOneBotプロトコルクライアントを使用してBotにログインし、リバースWebSocket接続方法を使用して、接続アドレスを設定：

```
ws://127.0.0.1:8021/onebot/v11/ws
```

::: tip
ここのポートは`.env.prod`で設定でき、デフォルトは`8021`です
:::

### 12. デバッグモード

プロジェクトには`.vscode/launch.json`ファイルが含まれており、VSCodeを使用して直接デバッグできます：

1. プロジェクトルートディレクトリを開く
2. `F5`を押してデバッグを開始
3. ターミナル出力が正常か観察

## フロントエンド開発（オプション）

フロントエンドページを開発する必要がある場合は、以下の手順に従ってください：

### 1. Node.jsのインストール
1. [Node.js公式サイト](https://nodejs.org/)にアクセス
2. 20.x LTSバージョン（.msi形式）をダウンロード
3. インストール時に**Add to PATH**オプションをチェック

### 2. pnpmの設定
```powershell
# pnpmをグローバルにインストール
npm install -g pnpm

# 加速のためミラーを設定
pnpm config set registry https://registry.npmmirror.com
```

### 3. フロントエンド依存関係のインストール
```powershell
cd frontend

# 依存関係をインストール
pnpm install --frozen-lockfile
```

### 4. フロントエンドの起動
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