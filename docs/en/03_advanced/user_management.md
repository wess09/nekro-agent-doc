---
title: User Management Guide
description: Introduction and usage of Nekro Agent user management features, including instructions for prohibiting triggers, banning and unbanning users
---

# User Management

## Introduction

User management refers to the process of managing user permissions, roles, and information. In Nekro Agent, user management includes the following:

- Setting users to prohibit triggering AI
- Banning users
- Unbanning users

## Status Description

### Prohibit Trigger

When a user is set to prohibit triggering, that user will not be able to trigger AI for conversations, but their messages will still enter the AI interaction context and responses can be made to them. This is suitable for setting up other non-human users or other NA instance accounts to avoid AI getting into a dead loop of talking to each other.

### Ban User

When a user is set to banned, that user will not be able to use all features of Nekro Agent, and their conversation messages will be completely ignored. This is suitable for setting up malicious users.

### Unban User

When a user is set to unbanned, that user will be able to normally use all features of Nekro Agent