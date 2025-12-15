---
title: Plugin Core Concepts
description: Deep dive into the core components of Nekro Agent plugins, including plugin instances, lifecycle, sandbox methods, configuration, storage, and prompt injection.
---

# Plugin Core Concepts

In the previous chapter, you have successfully created and run a simple plugin. This chapter will take you deep into the various core concepts that constitute Nekro Agent plugins. Mastering these concepts is the foundation for developing more complex and powerful plugins.

We will explore the following topics in sequence:

1.  **[Plugin Instance and Lifecycle](./02_plugin_basics/2.1_plugin_instance.md)**: Learn how to define a plugin (`NekroPlugin`) and the complete lifecycle events from loading to unloading.
2.  **[Sandbox Methods Explained](./02_plugin_basics/2.2_sandbox_methods.md)**: Deep understanding of sandbox methods—the main interface through which plugins provide functionality to AI, including their different types and implementation specifications.
3.  **[Plugin Configuration](./02_plugin_basics/2.3_configuration.md)**: Learn how to add user-customizable configuration items for your plugin and manage them through WebUI.
4.  **[Data Storage](./02_plugin_basics/2.4_storage.md)**: Learn how to use plugin storage to persist data, whether session-related or global.
5.  **[Prompt Injection](./02_plugin_basics/2.5_prompt_injection.md)**: Explore how to influence AI behavior and provide contextual information by injecting prompts.
6.  **[Agent Context (AgentCtx)](./02_plugin_basics/2.6_agent_context.md)**: Deep dive into the core context object in plugin development, including file system, message sending, configuration access, and other functionalities.

Let's get started one by one!