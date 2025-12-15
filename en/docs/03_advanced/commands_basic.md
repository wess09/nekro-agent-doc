---
title: Basic Command Guide
description: "Nekro Agent basic command guide, covering daily management commands such as chat management and plugin viewing, only applicable to OneBot V11 adapter (QQ platform)"
---

# Basic Command Guide

This document introduces the basic management commands of Nekro Agent, which are used for daily operations such as chat management and plugin viewing.

::: warning Platform Limitation
Currently, all commands are only available under the OneBot V11 adapter (i.e., QQ platform), other protocol clients are not supported.
:::

## Permission Description

Command permissions are divided into the following types:

- **Super Administrator**: Users configured in `config.SUPER_USERS`, have all command permissions
- **Group Administrator**: Only have permissions for some commands (such as `reset`) in group chats
- **Private Chat User**: Have permissions for some commands in private chats

::: tip Tip
When `config.ENABLE_COMMAND_UNAUTHORIZED_OUTPUT` is set to `false`, unauthorized users executing commands will not have any output feedback.
:::

## Chat Management Commands

### reset

**Function**: Clear chat history of the specified chat

**Syntax**: `reset [chat_key]`

**Permission Requirements**:

- Super Administrator: Can operate any chat
- Group Administrator: Can only operate the current group chat
- Private Chat User: Can only operate the current private chat

**Parameter Description**:

- `chat_key` (optional): Chat identifier to clear, defaults to current chat when omitted

**Usage Examples**:

```
reset                    # Clear current chat history
reset group_123456789    # Clear specified group chat history (super administrator only)
```

### inspect

**Function**: View basic information of the specified chat

**Syntax**: `inspect [chat_key]`

**Permission Requirements**: Super Administrator

**Parameter Description**:

- `chat_key` (optional): Chat identifier to query, defaults to current chat when omitted

**Usage Examples**:

```
inspect                  # View current chat information
inspect group_123456789  # View specified chat information
```

### na_on / na-on

**Function**: Enable chat function for the specified chat

**Syntax**: `na_on [target]`

**Permission Requirements**: Super Administrator

**Parameter Description**:

- `target` (optional): Operation target, supports the following values:
  - Omit: Current chat
  - `*`: All chats
  - `private_*`: All private chats
  - `group_*`: All group chats
  - Specific chat identifier: Specified chat

**Usage Examples**:

```
na_on                    # Enable current channel chat
na_on *                  # Enable all channel chats
na_on private_*          # Enable all private channel chats
na_on group_*            # Enable all group channel chats
na_on group_123456789    # Enable specified group channel chat
```

### na_off / na-off

**Function**: Disable chat function for the specified chat

**Syntax**: `na_off [target]`

**Permission Requirements**: Super Administrator

**Parameter Description**: Same as `na_on`

**Usage Examples**:

```
na_off                   # Disable current channel chat
na_off *                 # Disable all channel chats
na_off private_*         # Disable all private channel chats
na_off group_*           # Disable all group channel chats
na_off group_123456789   # Disable specified group channel chat
```

## System Information Commands

### na_info / na-info

**Function**: View system information and current chat settings

**Syntax**: `na_info`

**Permission Requirements**: Super Administrator

**Displayed Content**:

- Nekro Agent version information
- Whether running in Docker environment
- Current chat persona configuration
- Currently used model group

**Usage Examples**:

```
na_info
```

### na_help / na-help

**Function**: View command help information

**Syntax**: `na_help`

**Permission Requirements**: Super Administrator

**Displayed Content**:

- Brief descriptions of all available commands
- Command categories and usage methods
- System version and project links

**Usage Examples**:

```
na_help
```

## Plugin Management Commands

### na_plugins / na-plugins / nps

**Function**: View the list of currently loaded plugins and their detailed information

**Syntax**: `na_plugins`

**Permission Requirements**: Super Administrator

**Displayed Content**:

- Plugin name, version, and status
- Plugin author and description
- Plugin function statistics (number of sandbox methods, prompt injections, Webhook count)
- Total plugin count statistics

**Usage Examples**:

```
na_plugins
```

### plugin_info / plugin-info / npi

**Function**: View detailed information of the specified plugin

**Syntax**: `plugin_info <plugin_name_or_key>`

**Permission Requirements**: Super Administrator

**Parameter Description**:

- `plugin_name_or_key`: Plugin name or plugin key name, supports fuzzy matching

**Matching Priority**:

1. Exact key name match (case-sensitive)
2. Exact key name match (case-insensitive)
3. Exact plugin name match (case-sensitive)
4. Exact plugin name match (case-insensitive)
5. Partial key name match
6. Partial plugin name match

**Displayed Content**:

- Plugin basic information (name, version, status, author, etc.)
- Function statistics
- Configuration information
- Method list

**Usage Examples**:

```
plugin_info emotion      # View emotion pack plugin information
plugin_info draw         # View drawing plugin information
```

### reset_plugin / reset-plugin

**Function**: Reset the configuration file of the specified plugin

**Syntax**: `reset_plugin <plugin_name_or_key>`

**Permission Requirements**: Super Administrator

**Parameter Description**:

- `plugin_name_or_key`: Plugin name or plugin key name

**Matching Rules**: Same as `plugin_info`

**Precautions**:

- This operation will delete the plugin's configuration file
- The plugin will return to default configuration state
- This operation is irreversible

**Usage Examples**:

```
reset_plugin emotion     # Reset emotion pack plugin configuration
reset_plugin draw        # Reset drawing plugin configuration
```

## Notes

1. **Permission Control**: All commands have strict permission control, unauthorized users cannot execute them
2. **Chat Status**: Some commands require the chat to be in an active state to execute
3. **Parameter Validation**: Commands will validate the effectiveness of parameters, invalid parameters will return error prompts
4. **Operation Confirmation**: Some operations (such as resetting configuration) are irreversible, please use with caution
5. **Platform Limitation**: Currently only supports OneBot V11 adapter (QQ platform)

::: tip Get More Help

- Use the `na_help` command to view all available commands
- Check the [Debug Command Guide](/docs/en/03_advanced/commands_debug) to learn about advanced debugging features
- Visit the [GitHub Project](https://github.com/KroMiose/nekro-agent) for the latest information
  :::