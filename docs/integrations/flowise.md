# Flowise Integration Guide

Connect your Flowise AI workflows to PrecogX for comprehensive security monitoring and threat detection.

## Overview

Flowise is a drag-and-drop UI to build your customized LLM flow. By integrating PrecogX with Flowise, you can monitor all AI interactions for security threats, prompt injections, PII leakage, and other risks in real-time.

## Prerequisites

- Active PrecogX account ([sign up free](https://app.precogx.ai))
- PrecogX API key (create in Settings → API Keys)
- Running Flowise instance (v1.4.0 or later)
- Basic knowledge of Flowise workflow building

## Integration Methods

### Method 1: HTTP Request Node (Recommended)

This method uses Flowise's built-in HTTP Request node to send telemetry data to PrecogX after each interaction.

#### Step 1: Add HTTP Request Node

1. Open your Flowise chatflow
2. From the node palette, drag an **HTTP Request** node onto your canvas
3. Position it after your LLM/Chat Model node

#### Step 2: Configure HTTP Request Node

Configure the HTTP Request node with these settings:

**URL:**
```
https://api.precogx.ai/api/v1/integrations/flowise/telemetry
```

**Method:** `POST`

**Headers:**
```json
{
  "Content-Type": "application/json",
  "x-api-key": "px_live_your_actual_api_key_here"
}
```

**Body (JSON):**
```json
{
  "agentId": "{{$vars.chatflowId}}",
  "prompt": "{{$vars.question}}",
  "response": "{{$vars.text}}",
  "chatflowId": "{{$vars.chatflowId}}",
  "sessionId": "{{$vars.sessionId}}",
  "chatId": "{{$vars.chatId}}",
  "metadata": {
    "timestamp": "{{$vars.timestamp}}",
    "userId": "{{$vars.userId}}",
    "platform": "flowise"
  }
}
```

#### Step 3: Connect the Nodes

1. Connect your LLM/Chat Model output to the HTTP Request node input
2. The HTTP Request node should execute after each AI response
3. Test the flow to ensure telemetry is being sent

### Method 2: Custom Function Node

For more advanced use cases, you can use a Custom Function node with JavaScript:

```javascript
// Custom Function Node Code
const sendTelemetry = async (input, options) => {
  const telemetryData = {
    agentId: options.chatflowId,
    prompt: input.question,
    response: input.text,
    chatflowId: options.chatflowId,
    sessionId: options.sessionId,
    chatId: options.chatId,
    metadata: {
      timestamp: new Date().toISOString(),
      platform: "flowise",
      nodeType: input.nodeType || "custom"
    }
  };

  try {
    const response = await fetch('https://api.precogx.ai/api/v1/integrations/flowise/telemetry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'px_live_your_actual_api_key_here'
      },
      body: JSON.stringify(telemetryData)
    });

    if (!response.ok) {
      console.error('PrecogX telemetry failed:', response.statusText);
    }
  } catch (error) {
    console.error('PrecogX telemetry error:', error);
  }

  return input; // Pass through the original input
};

return sendTelemetry(input, options);
```

## Configuration Options

### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `agentId` | Unique identifier for your Flowise chatflow | `"customer-support-bot"` |
| `prompt` | User's input/question | `"What is your refund policy?"` |
| `response` | AI's response | `"Our refund policy allows..."` |

### Optional Fields

| Field | Description | Example |
|-------|-------------|---------|
| `chatflowId` | Flowise chatflow ID | `"abc123-def456"` |
| `sessionId` | Session identifier | `"session_789"` |
| `chatId` | Individual chat ID | `"chat_456"` |
| `metadata` | Additional context | `{"userId": "user123"}` |

## Security Best Practices

### API Key Management

1. **Never hardcode API keys** in your Flowise workflows
2. Use **environment variables** or Flowise's credential system
3. **Rotate API keys** regularly through PrecogX dashboard
4. **Monitor API key usage** in PrecogX Settings → API Keys

### Data Privacy

1. **Review data sensitivity** before sending to PrecogX
2. **Filter out PII** if not needed for security analysis
3. **Use metadata** to add context without exposing sensitive data
4. **Enable encryption** for data in transit and at rest

## Testing Your Integration

### 1. Test Connection

Use this test payload to verify your integration:

```bash
curl -X POST https://api.precogx.ai/api/v1/integrations/flowise/telemetry \
  -H "Content-Type: application/json" \
  -H "x-api-key: px_live_your_actual_api_key_here" \
  -d '{
    "agentId": "test-flowise-bot",
    "prompt": "Hello, this is a test message",
    "response": "Hi! I received your test message successfully.",
    "chatflowId": "test-chatflow",
    "metadata": {
      "test": true,
      "platform": "flowise"
    }
  }'
```

### 2. Verify in Dashboard

1. Go to your [PrecogX Dashboard](https://app.precogx.ai/dashboard)
2. Navigate to **Agents** to see your Flowise bot
3. Check **Overview** for interaction metrics
4. Review **Detections** for any security alerts

### 3. Monitor Performance

- Check response times in Flowise logs
- Monitor API rate limits in PrecogX
- Review error logs for failed requests

## Troubleshooting

### Common Issues

**HTTP Request fails with 401 Unauthorized**
- Verify your API key is correct and active
- Check that the `x-api-key` header is properly set
- Ensure your PrecogX account tier supports API access

**No data appearing in PrecogX Dashboard**
- Confirm the telemetry endpoint URL is correct
- Verify the JSON payload structure matches the expected format
- Check that `agentId` is a valid string identifier

**Flowise workflow becomes slow**
- Consider making telemetry requests asynchronous
- Implement error handling to prevent workflow failures
- Monitor API response times

**Missing interaction data**
- Ensure the HTTP Request node executes after each LLM response
- Verify that variables like `{{$vars.question}}` are properly populated
- Check Flowise execution logs for errors

### Debug Mode

Enable debug logging in your Custom Function node:

```javascript
console.log('PrecogX Telemetry Data:', JSON.stringify(telemetryData, null, 2));
```

## Advanced Features

### Custom Agent Naming

Use dynamic agent names based on chatflow context:

```json
{
  "agentId": "flowise-{{$vars.chatflowName}}-{{$vars.environment}}",
  "prompt": "{{$vars.question}}",
  "response": "{{$vars.text}}"
}
```

### Conditional Telemetry

Only send telemetry for specific conditions:

```javascript
// Only send telemetry for production chatflows
if (options.environment === 'production') {
  // Send telemetry
}
```

### Batch Processing

For high-volume chatflows, consider batching requests:

```javascript
// Collect multiple interactions and send in batches
const batch = collectInteractions();
if (batch.length >= 10) {
  await sendBatchTelemetry(batch);
}
```

## Example Workflows

### Customer Support Bot

```json
{
  "agentId": "customer-support-flowise",
  "prompt": "I need help with my order #12345",
  "response": "I'd be happy to help you with order #12345. Let me look that up for you...",
  "chatflowId": "customer-support-v2",
  "sessionId": "session_abc123",
  "metadata": {
    "department": "support",
    "priority": "normal",
    "category": "order_inquiry"
  }
}
```

### Sales Assistant

```json
{
  "agentId": "sales-assistant-flowise",
  "prompt": "What are your pricing plans?",
  "response": "We offer three main pricing plans: Starter ($29/month), Professional ($99/month), and Enterprise (custom pricing)...",
  "chatflowId": "sales-assistant-v1",
  "metadata": {
    "department": "sales",
    "lead_source": "website",
    "conversation_stage": "discovery"
  }
}
```

## Support

Need help with your Flowise integration?

- 📧 **Email**: [support@precogx.ai](mailto:support@precogx.ai)
- 💬 **Chat**: Available in your PrecogX dashboard
- 📖 **Documentation**: [docs.precogx.ai](https://docs.precogx.ai)
- 🐛 **Issues**: Report bugs on our GitHub

## Next Steps

After setting up your Flowise integration:

1. **Configure Detections**: Set up custom detection rules in PrecogX
2. **Set Up Alerts**: Configure notifications for security events
3. **Monitor Performance**: Review analytics and optimize your chatflows
4. **Scale Up**: Explore PrecogX Professional features for advanced security

---

**Ready to secure your Flowise AI workflows?** [Start your free PrecogX trial today!](https://app.precogx.ai/signup)
