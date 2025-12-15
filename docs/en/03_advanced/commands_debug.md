﻿﻿---
title: Debug Command Guide
description: Nekro Agent debug command guide, covering technical debugging, system maintenance, error log management and other advanced features, only applicable to OneBot V11 adapter (QQ platform)
---

# Debug Command Guide

This document introduces the debugging and system maintenance commands of Nekro Agent. These commands are mainly used for advanced operations such as technical debugging, performance monitoring, and system maintenance.

::: danger Risk Warning
The commands in this document have high system privileges and may affect system stability or data security. Please ensure you use them cautiously while understanding the function of the commands.
:::

::: warning Platform Limitation
Currently, all commands are only available under the OneBot V11 adapter (i.e., QQ platform), and other protocol endpoints are not yet supported.
:::

## Permission Description

All debug commands require **super administrator** privileges (configured in `config.SUPER_USERS`).

## Code Execution and Debugging

### exec

**Function**: Execute Python code in the sandbox and return results

**Syntax**: `exec <python_code>`

**Permission Requirement**: Super administrator

**Parameter Description**:

- `python_code`: Python code to be executed

**Security Description**:

- Code is executed in a sandbox environment
- Subject to execution time and resource limitations
- Has certain system resource access permissions

**Usage Examples**:

```
exec print("Hello World")
exec import os; print(os.getcwd())
exec 1 + 1
```

### code_log / code-log

**Function**: View code execution history

**Syntax**: `code_log [index]`

**Permission Requirement**: Super administrator

**Parameter Description**:

- `index` (optional): Record index number
  - Positive number: View the Nth record in chronological order
  - Negative number: View the Nth record in reverse chronological order
  - Omit: View the latest record

**Displayed Content**:

- Executed code content
- Execution result/output
- Execution time information

**Usage Examples**:

```
code_log        # View the latest execution record
code_log -2     # View the 2nd to last record
code_log 1      # View the 1st record
```

## System Messages and Debug Mode

### system

**Function**: Add a system message to the current chat and trigger the Agent

**Syntax**: `system <message>`

**Permission Requirement**: Super administrator

**Parameter Description**:

- `message`: System message content to be added

**Usage Scenarios**:

- Debug Agent behavior
- Inject specific system instructions
- Test prompt responses

**Usage Examples**:

```
system Please introduce yourself
system Current task: Analyze the data provided by the user
```

### debug_on / debug-on

**Function**: Enable prompt debug mode

**Syntax**: `debug_on`

**Permission Requirement**: Super administrator

**Function Description**:

- Exit role-playing mode
- Focus on technical analysis and status reporting
- Provide additional debug information after each response
- Analyze current context status and settings

**Debug Mode Features**:

- Technical analysis priority
- Display prompt strengths/weaknesses
- Identify potential issues
- Provide improvement suggestions

**Usage Examples**:

```
debug_on
```

### debug_off / debug-off

**Function**: Disable prompt debug mode

**Syntax**: `debug_off`

**Permission Requirement**: Super administrator

**Function Description**:

- Return to normal role-playing mode
- Stop debug analysis output
- Ignore all debug contexts

**Usage Examples**:

```
debug_off
```

## Configuration Management

### conf_show / conf-show

**Function**: View or list system configuration

**Syntax**: `conf_show [config_key]`

**Permission Requirement**: Super administrator

**Parameter Description**:

- `config_key` (optional): Name of the configuration item to view
- When omitted: Display list of all dynamically modifiable configuration items

**Supported Configuration Types**:

- Integer (int)
- Float (float)
- Boolean (bool)
- String (str)

**Usage Examples**:

```
conf_show                    # List all modifiable configuration items
conf_show AI_GENERATE_TIMEOUT # View AI generation timeout configuration
```

### conf_set / conf-set

**Function**: Dynamically modify system configuration

**Syntax**: `conf_set <key>=<value>`

**Permission Requirement**: Super administrator

**Parameter Description**:

- `key`: Configuration item name
- `value`: New configuration value

**Data Type Handling**:

- Integer/Float: Automatic type conversion
- Boolean: Supports `true/false`, `1/0`, `yes/no`
- String: Direct assignment

**Usage Examples**:

```
conf_set AI_GENERATE_TIMEOUT=60
conf_set ENABLE_DEBUG_MODE=true
conf_set AI_COMMAND_OUTPUT_PREFIX=[Bot]
```

### conf_reload / conf-reload

**Function**: Reload configuration file

**Syntax**: `conf_reload`

**Permission Requirement**: Super administrator

**Function Description**:

- Reread all settings from the configuration file
- Discard dynamically modified configurations
- Restore to the configuration state in the file

**Usage Examples**:

```
conf_reload
```

### conf_save / conf-save

**Function**: Save current configuration to file

**Syntax**: `conf_save`

**Permission Requirement**: Super administrator

**Function Description**:

- Write configurations in memory to the configuration file
- Persist dynamically modified settings

**Usage Examples**:

```
conf_save
```

## Model Testing

### model_test / model-test

**Function**: Test model availability and performance

**Syntax**: `model_test [options] <model_names...>`

**Permission Requirement**: Super administrator

**Option Parameters**:

- `-g`: Treat parameters as model group names rather than model names
- `--stream`: Use streaming mode for testing
- `--use-system`: Include system messages in testing

**Wildcard Support**:

- Supports `*` wildcard to match multiple models/model groups
- For example: `gpt*` matches all models starting with "gpt"

**Test Content**:

- Model response capability
- Response speed statistics
- Success/failure rate
- Performance benchmarking

**Usage Examples**:

```
model_test gpt-4o                    # Test a single model
model_test -g main_model debug_model # Test model groups
model_test --stream gpt*             # Stream test all gpt models
model_test --use-system claude*      # Include system message testing
```

## Error Log Management

### log_err_list / log-err-list / log_err_ls / log-err-ls

**Function**: View error log list

**Syntax**: `log_err_list [options]`

**Permission Requirement**: Super administrator

**Option Parameters**:

- `-p <page_number>`: Specify page number (default: 1)
- `-s <per_page>`: Number of items per page (default: 10, max: 50)
- `-a` / `--all`: View all files in the log directory instead of cached list

**Displayed Content**:

- Error log file list
- File modification time
- Log number (used for reference by other commands)

**Usage Examples**:

```
log_err_list                # View recent error logs
log_err_list -p 2 -s 5     # View page 2, 5 items per page
log_err_list -a            # View all log files
```

### log_chat_test / log-chat-test

**Function**: Test LLM requests using conversation content from error logs

**Syntax**: `log_chat_test <log_index_or_filename> [options]`

**Permission Requirement**: Super administrator

**Parameter Description**:

- `log_index_or_filename`: Log index number or filename

**Option Parameters**:

- `-g <model_group_name>`: Specify the model group to use (default: main model group)
- `--stream` / `-s`: Use streaming mode

**Log Matching Rules**:

1. Try to parse as an index number
2. Match by filename in the cached list
3. Directly search for files in the log directory
4. Automatically add `.json` suffix and retry

**Test Content**:

- Reproduce requests from error logs
- Test model response capability
- Performance benchmarking
- Error reproduction analysis

**Usage Examples**:

```
log_chat_test 1                      # Test the 1st log
log_chat_test error_20241201.json    # Test specified log file
log_chat_test 2 -g debug_model       # Use debug model group for testing
log_chat_test 3 --stream             # Stream mode testing
```

## System Maintenance

### clear_sandbox_cache / clear-sandbox-cache / na_csc / na-csc

**Function**: Clear the cache directory of the sandbox environment

**Syntax**: `clear_sandbox_cache`

**Permission Requirement**: Super administrator

**Cleared Content**:

- pip cache directory
- Sandbox package directory
- Temporary files and directories

**Displayed Information**:

- Number of files cleared
- Freed disk space
- Clear operation status

**Usage Examples**:

```
clear_sandbox_cache
```

### github_stars_check / github-stars-check

**Function**: Check if the user has starred the official GitHub repository

**Syntax**: `github_stars_check`

**Permission Requirement**: Super administrator

**Displayed Content**:

- Star status overview
- List of starred repositories
- List of unstarred repositories

**Usage Examples**:

```
github_stars_check
```

## High-Risk Commands

::: danger Dangerous Operations
The following commands have extremely high system risks and may cause data loss or system instability. Please use them with full understanding of the consequences.
:::

### docker_restart / docker-restart

**Function**: Restart Docker container

**Syntax**: `docker_restart [container_name]`

**Permission Requirement**: Super administrator + Docker environment

**Parameter Description**:

- `container_name` (optional): Container name (default: nekro_agent)

**Limitations**:

- Only available in Docker environment
- Requires Docker operation permissions

**Usage Examples**:

```
docker_restart                # Restart default container
docker_restart my_container   # Restart specified container
```

### docker_logs / docker-logs

**Function**: View Docker container logs

**Syntax**: `docker_logs [container_name]`

**Permission Requirement**: Super administrator + Docker environment

**Parameter Description**:

- `container_name` (optional): Container name (default: nekro_agent)

**Displayed Content**:

- Last 100 lines of container logs
- Running status information

**Usage Examples**:

```
docker_logs                   # View default container logs
docker_logs my_container      # View specified container logs
```

### sh

**Function**: Execute Shell commands

**Syntax**: `sh <command>`

**Permission Requirement**: Super administrator

**Parameter Description**:

- `command`: Shell command to be executed

**Security Risks**:

- Has complete system access permissions
- May affect system stability
- Command execution results are irreversible

**Usage Examples**:

```
sh ls -la                     # List files
sh df -h                      # View disk usage
sh ps aux | grep python       # View Python processes
```

### nekro_db_reset / nekro-db-reset

**Function**: Reset database

**Syntax**: `nekro_db_reset [-y] [table_name]`

**Permission Requirement**: Super administrator

**Parameter Description**:

- `-y`: Confirm to execute reset operation
- `table_name` (optional): Specify the data table to reset

**Security Mechanism**:

- Requires two executions within 1 minute for confirmation
- First execution only displays warning
- Second execution requires `-y` parameter for confirmation

**Data Impact**:

- Completely clear specified data table or entire database
- Operation is irreversible
- Will lose all related data

**Usage Examples**:

```
nekro_db_reset                # First execution, displays warning
nekro_db_reset -y             # Confirm to reset entire database
nekro_db_reset -y chat_messages # Reset specified data table
```

## Security Recommendations

1. **Permission Control**: Ensure only trusted users have super administrator privileges
2. **Operation Records**: It is recommended to back up relevant data before important operations
3. **Test Environment**: Test high-risk commands outside the production environment first
4. **Log Monitoring**: Regularly check command execution logs to monitor abnormal operations
5. **Configuration Backup**: Use `conf_save` to backup before important configuration modifications

::: tip Getting Help

- Use the `na_help` command to view command overview
- View [Basic Command Guide](/docs/en/03_advanced/commands_basic) to understand daily management functions
- Visit [GitHub Project](https://github.com/KroMiose/nekro-agent) to report issues
  :::