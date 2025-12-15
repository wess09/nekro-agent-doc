---
title: Plugin Editor Usage Guide
description: Introduction and usage of Nekro Agent's plugin editor, including detailed explanation of AI-assisted features and plugin generation process
---

# Plugin Editor

## Plugin Editor Introduction

The plugin editor is a tool for editing Nekro Agent plugins. It integrates AI-assisted features and presets some development knowledge of Nekro Agent plugins. It can quickly generate plugin code according to user needs or even directly complete some simple plugins, greatly improving plugin development efficiency.

## Brief Usage of Plugin Editor

1.  Click "Plugin Management-Plugin Editor" in WebUI's "Plugin Management"
2.  Create a new plugin or select an existing one
3.  Enter your requirements in "Plugin Requirements" next to the plugin editor
4.  Click "AI Generate" and wait for modification suggestions to be generated
5.  Click "Apply to Editor" and wait for the application model to complete applying the suggestions
6.  Click "Save" to save the plugin

## Using Plugins

After completing plugin editing, you can click "Enable Plugin" to enable the plugin. Subsequently, if the plugin loads normally, you can see information related to the plugin in "Plugin Management"

## AI Capability Models

The editor provides two AI capabilities: modification suggestion generation and modification suggestion application. You can find two model groups, `Plugin Code Generation Model Group` and `Plugin Code Application Model Group`, in "System Configuration" - "Basic Configuration". Configure models with appropriate capabilities for them. The specific required capabilities are as follows:

### Plugin Code Generation Model Group

The plugin code generation model group is used to generate plugin code. It is recommended to use models with strong coding and reasoning capabilities, such as `gpt-4o`, `claude-3.7-sonnet`, etc.

### Plugin Code Application Model Group

The plugin code application model group is used to apply plugin code. It is recommended to use models with fast speed and high instruction compliance, such as `gemini-2.0-flash`, etc.