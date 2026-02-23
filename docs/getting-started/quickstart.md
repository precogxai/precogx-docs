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

Set your `agent_id` **once** when initializing the client — you never need to repeat it on every call.

### Python

```python
from precogx_sdk import PrecogXClient

client = PrecogXClient(
    api_key="your_api_key_here",
    agent_id="my-first-agent",   # set once here, applied to every call automatically
)
```

### JavaScript

```javascript
import { PrecogXClient } from '@precogx/sdk';

const client = new PrecogXClient({
  apiKey: 'your_api_key_here',
  agentId: 'my-first-agent',    // set once here, applied to every call automatically
});
```

:::tip What is agent_id?
The `agent_id` is a name you choose to identify this agent in your PrecogX dashboard (e.g. `"support-bot"`, `"invoice-processor"`). Each unique name counts as one agent toward your plan limit. Use the **same name every time** the same agent runs so its trust score and history accumulate correctly.
:::

## Step 5: Send Your First Telemetry

### Python

```python
# agent_id is applied automatically — no need to repeat it on every call
result = client.send_telemetry({
    "prompt": "Hello, how can I help you today?",
    "response": "I'm here to assist you with any questions you might have.",
    "tool_calls": []
})

if result["flags"]:
    print(f"🚨 Threat detected: {result['flags'][0]}")
else:
    print("✅ No threats detected")

print(f"Risk Score: {result['risk_score']}")
```

### JavaScript

```javascript
// agentId is applied automatically — no need to repeat it on every call
const result = await client.sendTelemetry({
  prompt: 'Hello, how can I help you today?',
  response: 'I\'m here to assist you with any questions you might have.',
  toolCalls: []
});

if (result.flags.length > 0) {
  console.log(`🚨 Threat detected: ${result.flags[0]}`);
} else {
  console.log('✅ No threats detected');
}

console.log(`Risk Score: ${result.riskScore}`);
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
