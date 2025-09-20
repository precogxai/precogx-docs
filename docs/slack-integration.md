# Slack Integration Guide

Connect PrecogX to your Slack workspace to receive real-time security alerts and manage detections directly from Slack.

## Overview

PrecogX Slack integration allows you to:
- Receive real-time security alerts in your Slack channels
- Approve or block suspicious AI agent interactions directly from Slack
- Get notified about high-risk detections and trust score changes
- Manage your security workflow without leaving Slack

## Prerequisites

Before setting up Slack integration, ensure you have:
- A PrecogX account with an active subscription
- Admin access to your Slack workspace
- A Slack channel where you want to receive alerts

## Setup Steps

### Step 1: Create Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Choose **"From scratch"**
4. Enter your app name (e.g., "PrecogX Security Alerts")
5. Select your workspace
6. Click **"Create App"**

### Step 2: Configure App Permissions

1. In your Slack app settings, go to **"OAuth & Permissions"**
2. Add the following Bot Token Scopes:
   - `chat:write` - Send messages to channels
   - `channels:read` - List public channels
   - `groups:read` - List private channels
   - `im:read` - List direct messages
   - `mpim:read` - List group direct messages

3. Click **"Install to Workspace"**
4. Copy the **Bot User OAuth Token** (starts with `xoxb-`)

### Step 3: Set Up Webhook URL

1. In your Slack app settings, go to **"Incoming Webhooks"**
2. Toggle **"Activate Incoming Webhooks"** to **On**
3. Click **"Add New Webhook to Workspace"**
4. Select the channel where you want to receive alerts
5. Copy the **Webhook URL**

### Step 4: Configure Interactivity (Optional)

For interactive buttons (Approve/Block), set up interactivity:

1. Go to **"Interactivity & Shortcuts"**
2. Toggle **"Interactivity"** to **On**
3. Set **Request URL** to: `https://api.precogx.com/api/v1/slack/interactive-endpoint`
4. Save changes

### Step 5: Connect to PrecogX

1. Log in to your PrecogX dashboard
2. Go to **Settings > Slack Integration**
3. Paste your **Webhook URL** in the configuration form
4. Click **"Save Configuration"**
5. Click **"Test Webhook"** to verify the connection

## Configuration Options

### Alert Types

Configure which alerts you want to receive:

- **High-Risk Detections**: Critical security threats
- **Trust Score Changes**: Significant trust score drops
- **New Agent Connections**: When new AI agents connect
- **System Notifications**: Platform updates and maintenance

### Channel Settings

- **Primary Channel**: Main channel for security alerts
- **Digest Mode**: Receive batched alerts instead of real-time
- **Mute Hours**: Set quiet hours for non-critical alerts

### Interactive Features

- **Approve/Block**: Quick actions for suspicious interactions
- **View Details**: See full context of detections
- **Escalate**: Forward critical alerts to security team

## Alert Examples

### High-Risk Detection Alert

```
🚨 **High-Risk Detection Alert**
**Agent**: customer-service-bot-001
**Severity**: Critical
**Type**: Prompt Injection Attempt
**Timestamp**: 2024-01-15 14:30:25 UTC

**Details**: Attempted SQL injection through user input
**Trust Score**: 15/100 (Dangerous)

[Approve] [Block] [View Details]
```

### Trust Score Alert

```
⚠️ **Trust Score Drop**
**Agent**: sales-assistant-002
**Previous Score**: 85/100
**Current Score**: 45/100
**Change**: -40 points

**Reason**: Multiple failed authentication attempts
**Timestamp**: 2024-01-15 14:25:10 UTC

[Investigate] [View Agent Details]
```

## Troubleshooting

### Common Issues

**Webhook not working:**
- Verify the webhook URL is correct
- Check that the Slack app has proper permissions
- Ensure the channel exists and the bot is added

**Missing interactive buttons:**
- Verify the Request URL is set correctly
- Check that interactivity is enabled in Slack app settings
- Ensure your PrecogX subscription includes interactive features

**Alerts not appearing:**
- Check your alert configuration in PrecogX settings
- Verify the webhook is active and not rate-limited
- Check Slack channel permissions

### Testing Your Integration

1. Go to **Settings > Slack Integration**
2. Click **"Test Webhook"**
3. Check your Slack channel for a test message
4. If using interactive features, test the buttons

## Security Considerations

- Keep your webhook URL secure and don't share it publicly
- Regularly rotate your Slack app tokens
- Use private channels for sensitive security alerts
- Consider setting up separate channels for different alert types

## Support

Need help with Slack integration?

- Check our [FAQ](https://docs.precogx.com/faq)
- Contact support at [support@precogx.com](mailto:support@precogx.com)
- Join our [GitHub Discussions](https://github.com/precogx/precogx/discussions)

## Related Documentation

- [Getting Started Guide](https://docs.precogx.com/getting-started)
- [API Documentation](https://docs.precogx.com/api)
- [Webhook Configuration](https://docs.precogx.com/webhooks)

