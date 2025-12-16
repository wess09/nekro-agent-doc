---
title: System API Reference
description: Core system service API reference available in Nekro Agent plugin development, including message, context, timer, core tools, and plugin and database model APIs.
---

# System API Reference

Nekro Agent provides a series of core system service APIs for plugin developers, enabling deep integration between plugins and Agent's core functionality. These APIs are typically accessed through modules in the `nekro_agent.api` package.

This reference will outline the main API modules and their common functions. For more detailed parameters, return values, and specific usage, please directly consult the Nekro Agent source code or use the IDE's intelligent prompt feature.

## 1. Core Services (`nekro_agent.api.core`)

The `core` module provides some basic and core tools and services.

*   **Logging Service (`core.logger`)**
    *   Provides standard logging functionality, supporting different levels (such as `debug`, `info`, `warning`, `error`, `success`, `critical`).
    *   Example: `core.logger.info("Plugin started")`
    *   Plugins should use this logger to record their running status and key events, facilitating debugging and monitoring.

*   **Qdrant Vector Database Client**
    *   `core.get_qdrant_client() -> Optional[QdrantClient]` (async): Get the global Qdrant client instance.
    *   `core.get_qdrant_config() -> Optional[dict]` (async): Get Qdrant connection configuration.
    *   See the [Using Vector Database](/en/docs/04_plugin_dev/03_advanced_features/3.3_vector_database.md) chapter for details.

*   **Global Configuration Access (`core.config`)**
    *   Can directly access Nekro Agent's global configuration items (defined in the Agent main configuration file).
    *   Example: `api_base = core.config.NEKRO_API_BASE` (assuming the configuration item exists)
    *   Plugins should prioritize using their own configuration system (`plugin.config`), and only use `core.config` when they truly need to access Agent's global configuration.

## 2. Message Service (`nekro_agent.api.message`)

The `message` module is responsible for handling message sending.

*   **Send Text Message (`message.send_text`)**
    *   `message.send_text(chat_key: str, text: str, ctx: AgentCtx)` (async)
    *   Send a plain text message to the specified `chat_key` (session identifier).
    *   `ctx` is required and provides sending context.

*   **Send Image Message (`message.send_image`)**
    *   `message.send_image(chat_key: str, image_path: str, ctx: AgentCtx)` (async)
    *   `image_path` can be an image URL (str) or local file path (str).
    *   `ctx` is required and provides sending context.

*   **Send File Message (`message.send_file`)**
    *   `message.send_file(chat_key: str, file_path: str, ctx: AgentCtx)` (async)
    *   Send a file. The `file_path` parameter is the same as above.
    *   `ctx` is required and provides sending context.

This API reference provides an overview. It is strongly recommended that plugin developers combine source code, IDE tools, and specific example plugins in actual development to deeply understand and use these APIs.