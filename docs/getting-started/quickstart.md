---
sidebar_position: 1
---

# Quickstart Guide

Get up and running with PrecogX in 5 minutes.

## Prerequisites

- Python 3.8+ or Node.js 16+
- A PrecogX account ([sign up free](https://app.precogx.ai))

## Step 1: Create Your Account

1. Visit [app.precogx.ai](https://app.precogx.ai)
2. Click **"Start Free"**
3. Complete the signup form (no credit card required)
4. Verify your email address

## Step 2: Get Your API Key

1. Log into your [PrecogX Dashboard](https://app.precogx.ai)
2. Navigate to **Settings** → **API Keys**
3. Click **"Generate New Key"**
4. Copy your API key (you'll need this for the SDK)

:::tip Keep it secure
Store your API key securely. Never commit it to version control or share it publicly.
:::

## Step 3: Install the SDK

### Python

```bash
pip install precogx-sdk
```

### JavaScript/Node.js

```bash
npm install @precogx/sdk
```

## Step 4: Initialize the Client

### Python

```python
from precogx_sdk import PrecogXClient

# Initialize the client
client = PrecogXClient(api_key="your_api_key_here")
```

### JavaScript

```javascript
import { PrecogXClient } from '@precogx/sdk';

// Initialize the client
const client = new PrecogXClient('your_api_key_here');
```

## Step 5: Send Your First Telemetry

### Python

```python
# Send telemetry data
result = client.send_telemetry({
    "agent_id": "my_first_agent",
    "prompt": "Hello, how can I help you today?",
    "response": "I'm here to assist you with any questions you might have.",
    "tool_calls": []
})

# Check for threats
if result.flags:
    print(f"🚨 Threat detected: {result.flags[0]}")
else:
    print("✅ No threats detected")

print(f"Trust Score: {result.risk_score}")
```

### JavaScript

```javascript
// Send telemetry data
const result = await client.sendTelemetry({
  agentId: 'my_first_agent',
  prompt: 'Hello, how can I help you today?',
  response: 'I\'m here to assist you with any questions you might have.',
  toolCalls: []
});

// Check for threats
if (result.flags.length > 0) {
  console.log(`🚨 Threat detected: ${result.flags[0]}`);
} else {
  console.log('✅ No threats detected');
}

console.log(`Trust Score: ${result.riskScore}`);
```

## Step 6: View Results in Dashboard

1. Return to your [PrecogX Dashboard](https://app.precogx.ai)
2. Navigate to **Detections** to see your telemetry data
3. Check **Overview** for trust score analytics
4. Review **Agents** to see your agent's security status

## Next Steps

- **[Installation Guide](/docs/getting-started/installation)** - Detailed setup instructions
- **[First Agent](/docs/getting-started/first-agent)** - Create your first protected agent

## Need Help?

- 📧 [support@precogx.ai](mailto:support@precogx.ai)
- 💬 [GitHub Discussions](https://github.com/precogxai/discussions)
- 📚 [Full Documentation](/docs/intro)

---

**Congratulations!** You've successfully set up PrecogX and sent your first telemetry data. Your AI agents are now protected by enterprise-grade security.
