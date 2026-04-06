---
title: "Webhook Key Mapping — Stop Sending UUID Payloads"
description: 'Nobody wants to receive {"3f7a2b1c-...": "user@example.com"} in their Slack alerts. Here''s how FormsIO fixes that.'
date: "2026-03-20"
author: "FormsIO Team"
tags: ["webhooks", "engineering"]
---

# Webhook Key Mapping — Stop Sending UUID Payloads

Most form builders send webhook payloads that look like this:

```json
{
  "3f7a2b1c-4d5e-6f7a-8b9c-0d1e2f3a4b5c": "user@example.com",
  "a1b2c3d4-e5f6-7890-abcd-ef1234567890": "John Smith"
}
```

That's useless. You can't read it. Your Zap can't parse it. Your Slack alert is noise.

## FormsIO's key mapping

Every webhook has a `key_mapping` field — a JSON object that maps question UUIDs to friendly names:

```json
{
  "3f7a2b1c-...": "email",
  "a1b2c3d4-...": "full_name",
  "b5c6d7e8-...": "budget"
}
```

When a response is submitted, the webhook service transforms the payload before dispatch:

```json
{
  "email": "user@example.com",
  "full_name": "John Smith",
  "budget": 15000
}
```

You configure this once per webhook in the admin UI. Every subsequent response arrives clean.

## Retry logic

Webhooks use exponential backoff: 1s → 5s → 25s, with a 10-second timeout per attempt. Failures are logged to `webhook_logs` with the response status and body for debugging.
