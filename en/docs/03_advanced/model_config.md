---
title: Model Group Configuration Guide
description: Detailed explanation of Nekro Agent model group configuration, including basic concepts of model groups, configuration methods, and parameter details, helping users flexibly switch between different LLM models
---

# Model Group Configuration

Nekro Agent supports configuring multiple model groups, allowing you to flexibly switch between different LLM models, configuration parameters, and API access points. This document details the configuration methods and usage strategies for model groups.

## Basic Concepts of Model Groups

A model group is a collection of related model configuration parameters, including:

- Model name used
- API access point
- Authentication information
- Model parameters
- Calling strategy

By configuring multiple model groups, you can:

- Set backup models that automatically switch when the main model is unavailable
- Select the most suitable model for different task scenarios
- Switch models at any time according to personal preferences without re-entering configuration information

## Configuration Methods

### Configuration via WebUI

1. Access WebUI: `http://<Your Server IP>:8021`
2. After logging in, go to "System Configuration" → "Model Configuration"
3. Set each model group in the "Model Group Configuration" section

## Detailed Model Group Parameters

Each model group can contain the following parameters:

### Basic Parameters

| Parameter | Description | Example Value |
| --------- | ----------- | ------------- |
| CHAT_MODEL | Model name used | gpt-4o, claude-3-opus |
| BASE_URL | API base URL | https://api.openai.com/v1 |
| API_KEY | API access key | sk-xxxxxxxx |

::: info Tip
The API base URL can use any OpenAI-compatible API access point, compatible with most LLM providers on the market
:::