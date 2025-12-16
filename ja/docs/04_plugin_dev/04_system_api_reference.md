---
title: システムAPIリファレンス
description: Nekro Agentプラグイン開発で利用可能なコアシステムサービスAPIリファレンス。メッセージ、コンテキスト、タイマー、コアツール、プラグイン、データベースモデルAPIを含みます。
---

# システムAPIリファレンス

Nekro Agentは、プラグイン開発者のために一連のコアシステムサービスAPIを提供しており、プラグインとAgentのコア機能との深い統合を可能にします。これらのAPIは通常、`nekro_agent.api`パッケージ内のモジュールを通じてアクセスされます。

このリファレンスでは、主要なAPIモジュールとその一般的な機能を概説します。より詳細なパラメータ、戻り値、具体的な使用方法については、Nekro Agentのソースコードを直接参照するか、IDEのインテリジェントプロンプト機能を使用してください。

## 1. コアサービス (`nekro_agent.api.core`)

`core`モジュールは、基本的でコアなツールとサービスを提供します。

*   **ロギングサービス (`core.logger`)**
    *   標準的なロギング機能を提供し、異なるレベル（`debug`、`info`、`warning`、`error`、`success`、`critical`など）をサポートします。
    *   例: `core.logger.info("プラグインが開始されました")`
    *   プラグインはこのロガーを使用して実行ステータスと重要なイベントを記録し、デバッグと監視を容易にする必要があります。

*   **Qdrantベクトルデータベースクライアント**
    *   `core.get_qdrant_client() -> Optional[QdrantClient]` (非同期): グローバルQdrantクライアントインスタンスを取得します。
    *   `core.get_qdrant_config() -> Optional[dict]` (非同期): Qdrant接続設定を取得します。
    *   詳細については、[ベクトルデータベースの使用](/ja/docs/04_plugin_dev/03_advanced_features/3.3_vector_database.md)の章を参照してください。

*   **グローバル設定アクセス (`core.config`)**
    *   Nekro Agentのグローバル設定項目（Agentメイン設定ファイルで定義）に直接アクセスできます。
    *   例: `api_base = core.config.NEKRO_API_BASE`（設定項目が存在すると仮定）
    *   プラグインはまず自身の設定システム（`plugin.config`）を使用し、本当にAgentのグローバル設定にアクセスする必要がある場合にのみ`core.config`を使用する必要があります。

## 2. メッセージサービス (`nekro_agent.api.message`)

`message`モジュールはメッセージ送信の処理を担当します。

*   **テキストメッセージ送信 (`message.send_text`)**
    *   `message.send_text(chat_key: str, text: str, ctx: AgentCtx)` (非同期)
    *   指定された`chat_key`（セッション識別子）にプレーンテキストメッセージを送信します。
    *   `ctx`は必須で、送信コンテキストを提供します。

*   **画像メッセージ送信 (`message.send_image`)**
    *   `message.send_image(chat_key: str, image_path: str, ctx: AgentCtx)` (非同期)
    *   `image_path`は画像URL（文字列）またはローカルファイルパス（文字列）です。
    *   `ctx`は必須で、送信コンテキストを提供します。

*   **ファイルメッセージ送信 (`message.send_file`)**
    *   `message.send_file(chat_key: str, file_path: str, ctx: AgentCtx)` (非同期)
    *   ファイルを送信します。`file_path`パラメータは上記と同じです。
    *   `ctx`は必須で、送信コンテキストを提供します。

このAPIリファレンスは概要を提供します。プラグイン開発者は、実際の開発でこれらのAPIを深く理解して使用するために、ソースコード、IDEツール、具体的なサンプルプラグインを組み合わせることを強くお勧めします。