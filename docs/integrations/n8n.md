# n8n Integration Guide

Connect your n8n workflows to PrecogX for comprehensive AI security monitoring and threat detection.

## Overview

n8n is a powerful workflow automation tool that helps you connect different services and automate tasks. When your n8n workflows include AI interactions, PrecogX can monitor these for security threats, prompt injections, PII leakage, and other risks in real-time.

## Prerequisites

- Active PrecogX account ([sign up free](https://app.precogx.ai))
- PrecogX API key (create in Settings → API Keys)
- Running n8n instance (v0.220.0 or later)
- n8n workflows that interact with AI services

## Integration Methods

### Method 1: HTTP Request Node (Recommended)

Use n8n's built-in HTTP Request node to send telemetry data to PrecogX after AI interactions.

#### Step 1: Add HTTP Request Node

1. Open your n8n workflow
2. Add an **HTTP Request** node after your AI service nodes (OpenAI, Anthropic, etc.)
3. Connect it to receive data from your AI interaction

#### Step 2: Configure HTTP Request Node

**Authentication:** Header Auth
- **Name:** `x-api-key`
- **Value:** `px_live_your_actual_api_key_here`

**Request Method:** `POST`

**URL:** 
```
https://api.precogx.ai/api/v1/integrations/n8n/telemetry
```

**Body (JSON):**
```json
{
  "agentId": "{{ $node['AI_Service'].json['workflow_name'] || 'n8n-workflow' }}",
  "prompt": "{{ $node['AI_Service'].json['prompt'] }}",
  "response": "{{ $node['AI_Service'].json['response'] }}",
  "workflowId": "{{ $workflow.id }}",
  "executionId": "{{ $execution.id }}",
  "nodeId": "{{ $node['AI_Service'].name }}",
  "metadata": {
    "timestamp": "{{ new Date().toISOString() }}",
    "platform": "n8n",
    "workflow_name": "{{ $workflow.name }}",
    "execution_mode": "{{ $execution.mode }}"
  }
}
```

#### Step 3: Handle Errors

Add error handling to prevent workflow failures:

1. Set **Continue on Fail** to `true`
2. Add an **IF** node to check for successful telemetry
3. Log errors without stopping the main workflow

### Method 2: Code Node (Advanced)

For complex scenarios, use a Code node with JavaScript:

```javascript
// Code Node - Send PrecogX Telemetry
const sendTelemetry = async (aiData) => {
  const telemetryPayload = {
    agentId: `n8n-${$workflow.name.replace(/\s+/g, '-').toLowerCase()}`,
    prompt: aiData.prompt || aiData.input || '',
    response: aiData.response || aiData.output || '',
    workflowId: $workflow.id,
    executionId: $execution.id,
    nodeId: aiData.nodeName || 'unknown',
    metadata: {
      timestamp: new Date().toISOString(),
      platform: 'n8n',
      workflow_name: $workflow.name,
      execution_mode: $execution.mode,
      user_id: aiData.userId || null,
      session_id: aiData.sessionId || null
    }
  };

  try {
    const response = await $http.request({
      method: 'POST',
      url: 'https://api.precogx.ai/api/v1/integrations/n8n/telemetry',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'px_live_your_actual_api_key_here'
      },
      body: telemetryPayload
    });

    console.log('PrecogX telemetry sent successfully');
    return { success: true, data: telemetryPayload };
  } catch (error) {
    console.error('PrecogX telemetry failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Get AI interaction data from previous node
const aiData = $input.all()[0].json;

// Send telemetry
const result = await sendTelemetry(aiData);

return [result];
```

## Common n8n AI Workflow Patterns

### Pattern 1: OpenAI Chat Completion

```json
{
  "agentId": "n8n-openai-assistant",
  "prompt": "{{ $node['OpenAI'].json['messages'][0]['content'] }}",
  "response": "{{ $node['OpenAI'].json['choices'][0]['message']['content'] }}",
  "workflowId": "{{ $workflow.id }}",
  "metadata": {
    "model": "{{ $node['OpenAI'].json['model'] }}",
    "tokens_used": "{{ $node['OpenAI'].json['usage']['total_tokens'] }}",
    "platform": "n8n-openai"
  }
}
```

### Pattern 2: Anthropic Claude

```json
{
  "agentId": "n8n-claude-assistant",
  "prompt": "{{ $node['Anthropic'].json['prompt'] }}",
  "response": "{{ $node['Anthropic'].json['completion'] }}",
  "workflowId": "{{ $workflow.id }}",
  "metadata": {
    "model": "{{ $node['Anthropic'].json['model'] }}",
    "platform": "n8n-anthropic"
  }
}
```

### Pattern 3: Custom AI Service

```json
{
  "agentId": "n8n-custom-ai",
  "prompt": "{{ $node['Custom_AI'].json['input'] }}",
  "response": "{{ $node['Custom_AI'].json['output'] }}",
  "workflowId": "{{ $workflow.id }}",
  "metadata": {
    "service_name": "{{ $node['Custom_AI'].json['service'] }}",
    "platform": "n8n-custom"
  }
}
```

## Configuration Examples

### Email Processing Workflow

Monitor AI that processes and responds to emails:

```javascript
// In your Code node after email AI processing
const emailData = $node['Process_Email'].json;

const telemetryData = {
  agentId: 'n8n-email-processor',
  prompt: `Email Subject: ${emailData.subject}\nEmail Body: ${emailData.body}`,
  response: emailData.ai_response,
  workflowId: $workflow.id,
  executionId: $execution.id,
  metadata: {
    email_from: emailData.from,
    email_subject: emailData.subject,
    platform: 'n8n',
    workflow_type: 'email_processing'
  }
};
```

### Customer Support Automation

Monitor AI responses in customer support workflows:

```javascript
const supportData = $node['AI_Support'].json;

const telemetryData = {
  agentId: 'n8n-support-bot',
  prompt: supportData.customer_message,
  response: supportData.ai_response,
  workflowId: $workflow.id,
  metadata: {
    ticket_id: supportData.ticket_id,
    customer_id: supportData.customer_id,
    priority: supportData.priority,
    category: supportData.category,
    platform: 'n8n'
  }
};
```

### Content Generation Workflow

Monitor AI content generation:

```javascript
const contentData = $node['Generate_Content'].json;

const telemetryData = {
  agentId: 'n8n-content-generator',
  prompt: contentData.content_brief,
  response: contentData.generated_content,
  workflowId: $workflow.id,
  metadata: {
    content_type: contentData.type,
    target_audience: contentData.audience,
    word_count: contentData.generated_content.split(' ').length,
    platform: 'n8n'
  }
};
```

## Environment Variables Setup

For security, use n8n environment variables for your API key:

1. **In your n8n environment file (`.env`):**
```bash
PRECOGX_API_KEY=px_live_your_actual_api_key_here
```

2. **In your HTTP Request node:**
```
{{ $env.PRECOGX_API_KEY }}
```

3. **In Code nodes:**
```javascript
const apiKey = $env.PRECOGX_API_KEY;
```

## Testing Your Integration

### 1. Test Workflow

Create a simple test workflow:

1. **Manual Trigger** → **Set** node (with test data) → **HTTP Request** (PrecogX) → **No Operation**

Test data in Set node:
```json
{
  "agentId": "n8n-test-agent",
  "prompt": "This is a test prompt",
  "response": "This is a test response",
  "workflowId": "test-workflow",
  "metadata": {
    "test": true,
    "platform": "n8n"
  }
}
```

### 2. Verify in PrecogX Dashboard

1. Execute your test workflow
2. Check [PrecogX Dashboard](https://app.precogx.ai/dashboard/agents)
3. Look for your `n8n-test-agent` in the agents list
4. Verify interaction data appears correctly

### 3. Monitor Execution

Check n8n execution logs for:
- Successful HTTP requests to PrecogX
- Any error messages
- Response times

## Error Handling Best Practices

### Graceful Failure

```javascript
try {
  const response = await sendTelemetry(data);
  console.log('Telemetry sent successfully');
} catch (error) {
  console.error('Telemetry failed, but continuing workflow:', error.message);
  // Don't throw error - let workflow continue
}
```

### Retry Logic

```javascript
const sendTelemetryWithRetry = async (data, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await sendTelemetry(data);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

### Conditional Telemetry

Only send telemetry in production:

```javascript
if ($workflow.settings.environment === 'production') {
  await sendTelemetry(data);
}
```

## Troubleshooting

### Common Issues

**401 Unauthorized Error**
- Check your API key is correct
- Verify the header name is exactly `x-api-key`
- Ensure your PrecogX account tier supports API access

**Workflow Execution Fails**
- Enable "Continue on Fail" for the HTTP Request node
- Add error handling in Code nodes
- Check n8n execution logs for details

**No Data in PrecogX Dashboard**
- Verify the endpoint URL is correct
- Check the JSON payload structure
- Ensure `agentId` is a valid string

**Performance Issues**
- Consider making telemetry requests asynchronous
- Implement batching for high-volume workflows
- Monitor API rate limits

### Debug Tips

1. **Add logging to Code nodes:**
```javascript
console.log('Sending telemetry:', JSON.stringify(telemetryData, null, 2));
```

2. **Use n8n's execution data:**
- Check the execution list for failed runs
- Examine node outputs for debugging

3. **Test with curl:**
```bash
curl -X POST https://api.precogx.ai/api/v1/integrations/n8n/telemetry \
  -H "Content-Type: application/json" \
  -H "x-api-key: px_live_your_actual_api_key_here" \
  -d '{"agentId":"test","prompt":"test","response":"test"}'
```

## Advanced Features

### Workflow Templates

Create reusable workflow templates with PrecogX integration:

1. Build a workflow with PrecogX telemetry
2. Export as template
3. Share with your team
4. Import and customize for different use cases

### Custom Agent Naming

Use dynamic agent names based on workflow context:

```javascript
const agentId = `n8n-${$workflow.name}-${$node['Trigger'].json['environment'] || 'prod'}`;
```

### Metadata Enrichment

Add rich metadata for better analysis:

```javascript
const metadata = {
  platform: 'n8n',
  workflow_id: $workflow.id,
  workflow_name: $workflow.name,
  execution_id: $execution.id,
  node_name: $node.name,
  user_id: $node['Trigger'].json['user_id'],
  session_id: $node['Trigger'].json['session_id'],
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'production'
};
```

## Best Practices

### Security

1. **Use environment variables** for API keys
2. **Validate input data** before sending to PrecogX
3. **Filter sensitive information** from telemetry
4. **Enable HTTPS** for all API calls

### Performance

1. **Make telemetry non-blocking** to avoid slowing workflows
2. **Implement retry logic** for failed requests
3. **Use batching** for high-volume scenarios
4. **Monitor API usage** to avoid rate limits

### Monitoring

1. **Set up alerts** for failed telemetry
2. **Monitor workflow performance** impact
3. **Track API response times**
4. **Review PrecogX dashboard** regularly

## Support

Need help with your n8n integration?

- 📧 **Email**: [support@precogx.ai](mailto:support@precogx.ai)
- 💬 **Chat**: Available in your PrecogX dashboard
- 📖 **Documentation**: [docs.precogx.ai](https://docs.precogx.ai)
- 🐛 **Issues**: Report bugs on our GitHub

## Next Steps

After setting up your n8n integration:

1. **Configure Detection Rules**: Set up custom security rules in PrecogX
2. **Set Up Notifications**: Configure alerts for security events
3. **Monitor Analytics**: Review workflow security metrics
4. **Scale Your Automation**: Explore advanced PrecogX features

---

**Ready to secure your n8n AI workflows?** [Start your free PrecogX trial today!](https://app.precogx.ai/signup)
