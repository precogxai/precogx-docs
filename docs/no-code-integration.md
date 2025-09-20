# No-Code Platform Integration

This guide provides instructions for integrating PrecogX with popular no-code AI platforms. No coding required - just configure webhooks and start protecting your AI agents!

## Supported Platforms

- ✅ **Flowise** - Visual AI workflow builder
- ✅ **Langflow** - Open-source visual flow builder
- ✅ **Dify** - AI application development platform
- ✅ **n8n** - Workflow automation platform
- 🔜 **More coming soon...**

## Quick Start

### 1. Get Your API Key

1. Sign up for a PrecogX account at [precogx.ai](https://precogx.ai)
2. Go to Settings → API Keys
3. Create a new API key
4. Copy the key (you'll only see it once!)

### 2. Configure Webhook/HTTP Request

In your no-code platform, add a new HTTP request node with these settings:

- **Method**: POST
- **URL**: `https://api.precogx.ai/api/v1/integrations/telemetry/ingest`
- **Headers**:
  ```
  Content-Type: application/json
  x-api-key: your-api-key
  ```

### 3. Configure Request Body

Use this template for the request body:

```json
{
    "agent_id": "your-agent-id",
    "prompt": "{{input}}",
    "response": "{{output}}",
    "metadata": {
        "model": "gpt-4",
        "platform": "flowise",
        "version": "1.0.0"
    }
}
```

## Platform-Specific Guides

### Flowise Integration

Flowise is a visual AI workflow builder that makes it easy to create AI applications without coding.

#### **Step 1: Add HTTP Request Node**
1. Open your Flowise workflow
2. Add an **HTTP Request** node
3. Connect it to your LLM node's output

#### **Step 2: Configure HTTP Request**
- **Method**: POST
- **URL**: `https://api.precogx.ai/api/v1/integrations/telemetry/ingest`
- **Headers**:
  ```
  Content-Type: application/json
  x-api-key: your-api-key
  ```

#### **Step 3: Configure Request Body**
```json
{
    "agent_id": "flowise-agent",
    "prompt": "{{$json.input}}",
    "response": "{{$json.output}}",
    "metadata": {
        "model": "{{$json.model}}",
        "platform": "flowise",
        "version": "1.0.0"
    }
}
```

#### **Step 4: Map Variables**
- `{{$json.input}}` → Your input variable
- `{{$json.output}}` → Your LLM output variable
- `{{$json.model}}` → Your model name

#### **Example Flowise Workflow**
```
[Input] → [LLM] → [HTTP Request to PrecogX] → [Output]
```

### Langflow Integration

Langflow is an open-source visual flow builder for AI applications.

#### **Step 1: Add Custom Component**
1. Open your Langflow flow
2. Add a **Custom Component** node
3. Configure it as an HTTP request

#### **Step 2: Configure HTTP Request**
- **Method**: POST
- **URL**: `https://api.precogx.ai/api/v1/integrations/telemetry/ingest`
- **Headers**:
  ```
  Content-Type: application/json
  x-api-key: your-api-key
  ```

#### **Step 3: Configure Request Body**
```json
{
    "agent_id": "langflow-agent",
    "prompt": "{{input}}",
    "response": "{{output}}",
    "metadata": {
        "model": "{{model}}",
        "platform": "langflow",
        "version": "1.0.0"
    }
}
```

#### **Step 4: Connect to Flow**
Connect the Custom Component to your flow's input/output nodes.

### Dify Integration

Dify is an AI application development platform with built-in workflow capabilities.

#### **Step 1: Add Webhook Node**
1. Open your Dify application
2. Add a **Webhook** node
3. Configure it to send data to PrecogX

#### **Step 2: Configure Webhook**
- **Method**: POST
- **URL**: `https://api.precogx.ai/api/v1/integrations/telemetry/ingest`
- **Headers**:
  ```
  Content-Type: application/json
  x-api-key: your-api-key
  ```

#### **Step 3: Configure Request Body**
```json
{
    "agent_id": "dify-agent",
    "prompt": "{{query}}",
    "response": "{{answer}}",
    "metadata": {
        "model": "{{model}}",
        "platform": "dify",
        "version": "1.0.0"
    }
}
```

#### **Step 4: Connect to Application**
Connect the webhook to your Dify application's workflow.

### n8n Integration

n8n is a workflow automation platform that can integrate with any API.

#### **Step 1: Add HTTP Request Node**
1. Open your n8n workflow
2. Add an **HTTP Request** node
3. Configure it to send data to PrecogX

#### **Step 2: Configure HTTP Request**
- **Method**: POST
- **URL**: `https://api.precogx.ai/api/v1/integrations/telemetry/ingest`
- **Headers**:
  ```
  Content-Type: application/json
  x-api-key: your-api-key
  ```

#### **Step 3: Configure Request Body**
```json
{
    "agent_id": "n8n-agent",
    "prompt": "{{$json.prompt}}",
    "response": "{{$json.response}}",
    "metadata": {
        "model": "{{$json.model}}",
        "platform": "n8n",
        "version": "1.0.0"
    }
}
```

#### **Step 4: Connect to Workflow**
Connect the HTTP Request node to your n8n workflow.

## Sample Payloads

### Basic Usage

```json
{
    "agent_id": "customer-service-bot",
    "prompt": "What are your business hours?",
    "response": "We are open Monday to Friday, 9 AM to 5 PM EST.",
    "metadata": {
        "model": "gpt-4",
        "platform": "flowise",
        "version": "1.0.0"
    }
}
```

### With Tool Calls

```json
{
    "agent_id": "sales-assistant",
    "prompt": "What's the price of the premium plan?",
    "response": "The premium plan costs $99/month.",
    "tool_calls": [
        {
            "name": "get_pricing",
            "arguments": {
                "plan": "premium"
            }
        }
    ],
    "metadata": {
        "model": "gpt-4",
        "platform": "dify",
        "version": "1.0.0"
    }
}
```

### With Session Context

```json
{
    "agent_id": "conversational-bot",
    "prompt": "What did we discuss earlier?",
    "response": "We discussed your project requirements and timeline.",
    "session_id": "session-123",
    "conversation_id": "conv-456",
    "metadata": {
        "model": "gpt-4",
        "platform": "langflow",
        "version": "1.0.0"
    }
}
```

## Best Practices

### 1. Use Consistent Agent IDs
- Use descriptive names like `customer-service-bot`
- Include environment: `prod-customer-service-bot`
- Avoid generic names like `agent-1`

### 2. Include Relevant Metadata
- Always include the model name
- Specify the platform you're using
- Add version information
- Include session/conversation IDs when available

### 3. Handle Errors Gracefully
- Implement retry logic for failed requests
- Log errors for debugging
- Don't let PrecogX failures break your workflow

### 4. Monitor Rate Limits
- Check your plan's rate limits
- Implement batching for high-volume scenarios
- Contact support if you need higher limits

### 5. Use Environment Variables
- Store API keys in environment variables
- Never hardcode sensitive information
- Use different keys for different environments

## Troubleshooting

### Common Issues

#### 1. 401 Unauthorized
**Problem**: Invalid or missing API key
**Solution**:
- Check your API key is correct
- Verify the key is active in your dashboard
- Ensure you're using the correct header name: `x-api-key`

#### 2. 400 Bad Request
**Problem**: Invalid request format
**Solution**:
- Verify all required fields are present
- Check data types match the schema
- Validate JSON format

#### 3. 429 Too Many Requests
**Problem**: Rate limit exceeded
**Solution**:
- Implement rate limiting in your workflow
- Use batch processing for high volume
- Contact support for higher limits

#### 4. 500 Internal Server Error
**Problem**: Server-side issue
**Solution**:
- Retry the request after a delay
- Check PrecogX status page
- Contact support if issue persists

### Debugging Tips

1. **Test with Simple Payload**: Start with minimal data
2. **Check Logs**: Look at your platform's execution logs
3. **Verify Headers**: Ensure Content-Type and x-api-key are correct
4. **Test API Key**: Use curl or Postman to test the API directly

## Advanced Configuration

### Custom Detection Rules

For Business+ plans, you can customize detection behavior:

```json
{
    "agent_id": "custom-agent",
    "prompt": "User input",
    "response": "AI response",
    "detection_config": {
        "custom_rules": [
            {
                "name": "custom_threat",
                "pattern": "suspicious_pattern",
                "action": "block"
            }
        ]
    },
    "metadata": {
        "model": "gpt-4",
        "platform": "flowise",
        "version": "1.0.0"
    }
}
```

### Batch Processing

For high-volume scenarios, send multiple events in one request:

```json
{
    "events": [
        {
            "agent_id": "agent-1",
            "prompt": "prompt-1",
            "response": "response-1"
        },
        {
            "agent_id": "agent-2", 
            "prompt": "prompt-2",
            "response": "response-2"
        }
    ],
    "metadata": {
        "platform": "flowise",
        "version": "1.0.0"
    }
}
```

## Support

Need help with no-code integration?

- **Documentation**: [precogx.ai/docs](https://precogx.ai/docs)
- **GitHub Issues**: [github.com/precogxai/precogx_sdk](https://github.com/precogxai/precogx_sdk)
- **Email**: support@precogx.ai
- **Community**: Join our Discord for help

## Next Steps

1. **Choose your platform** from the guides above
2. **Follow the integration steps** for your platform
3. **Test your integration** with sample data
4. **Monitor your agents** in the PrecogX dashboard
5. **Configure alerts** for security events

Ready to secure your no-code AI applications? Choose your platform and let's get started! 🛡️
