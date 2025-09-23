# Dify Integration Guide

Connect your Dify AI applications to PrecogX for comprehensive security monitoring and threat detection.

## Overview

Dify is an open-source LLM app development platform that combines AI workflow, RAG pipeline, agent capabilities, model management, observability features and more. By integrating PrecogX with Dify, you can monitor all AI interactions for security threats, prompt injections, PII leakage, and other risks in real-time.

## Prerequisites

- Active PrecogX account ([sign up free](https://app.precogx.ai))
- PrecogX API key (create in Settings → API Keys)
- Running Dify instance (v0.6.0 or later)
- Dify applications with AI workflows

## Integration Methods

### Method 1: Webhook Integration (Recommended)

Use Dify's webhook feature to send telemetry data to PrecogX automatically.

#### Step 1: Configure Webhook in Dify

1. Open your Dify application
2. Navigate to **Settings** → **Integrations**
3. Find the **Webhooks** section
4. Click **Add Webhook**

#### Step 2: Webhook Configuration

**Webhook URL:**
```
https://api.precogx.ai/api/v1/integrations/dify/telemetry
```

**Method:** `POST`

**Headers:**
```json
{
  "Content-Type": "application/json",
  "x-api-key": "px_live_your_actual_api_key_here"
}
```

**Events to Monitor:**
- ✅ `conversation.started`
- ✅ `conversation.completed`
- ✅ `message.created`
- ✅ `workflow.executed`

#### Step 3: Configure Payload Template

Dify will send webhook data automatically. The payload will include:

```json
{
  "agentId": "dify-{{app_id}}",
  "prompt": "{{conversation.query}}",
  "response": "{{conversation.answer}}",
  "appId": "{{app_id}}",
  "conversationId": "{{conversation_id}}",
  "userId": "{{user_id}}",
  "metadata": {
    "timestamp": "{{created_at}}",
    "platform": "dify",
    "app_name": "{{app_name}}",
    "conversation_mode": "{{conversation_mode}}",
    "model_name": "{{model_name}}"
  }
}
```

### Method 2: API Integration

For more control, use Dify's API with custom code to send telemetry.

#### Step 1: Create Custom Node

In your Dify workflow, add a **Code** node after your LLM interactions:

```python
import requests
import json
from datetime import datetime

def send_precogx_telemetry(input_data):
    """Send telemetry data to PrecogX"""
    
    # Extract conversation data
    prompt = input_data.get('query', '')
    response = input_data.get('answer', '')
    app_id = input_data.get('app_id', 'unknown')
    
    # Prepare telemetry payload
    telemetry_data = {
        "agentId": f"dify-{app_id}",
        "prompt": prompt,
        "response": response,
        "appId": app_id,
        "conversationId": input_data.get('conversation_id'),
        "userId": input_data.get('user_id'),
        "metadata": {
            "timestamp": datetime.utcnow().isoformat(),
            "platform": "dify",
            "app_name": input_data.get('app_name', ''),
            "conversation_mode": input_data.get('mode', ''),
            "model_name": input_data.get('model_name', ''),
            "tokens_used": input_data.get('usage', {}).get('total_tokens', 0)
        }
    }
    
    try:
        response = requests.post(
            'https://api.precogx.ai/api/v1/integrations/dify/telemetry',
            headers={
                'Content-Type': 'application/json',
                'x-api-key': 'px_live_your_actual_api_key_here'
            },
            json=telemetry_data,
            timeout=10
        )
        
        if response.status_code == 200:
            print("PrecogX telemetry sent successfully")
        else:
            print(f"PrecogX telemetry failed: {response.status_code}")
            
    except Exception as e:
        print(f"PrecogX telemetry error: {str(e)}")
    
    # Return original input to continue workflow
    return input_data

# Execute telemetry function
result = send_precogx_telemetry(input)
```

### Method 3: External Service Integration

Use Dify's external service capability to integrate with PrecogX.

#### Step 1: Create External Service

1. In Dify, go to **Tools** → **External Services**
2. Create a new service for PrecogX
3. Configure the service endpoint

**Service Configuration:**
```yaml
name: precogx-telemetry
description: Send security telemetry to PrecogX
endpoint: https://api.precogx.ai/api/v1/integrations/dify/telemetry
method: POST
headers:
  Content-Type: application/json
  x-api-key: px_live_your_actual_api_key_here
```

#### Step 2: Use in Workflow

Add the external service call in your workflow:

```json
{
  "service": "precogx-telemetry",
  "payload": {
    "agentId": "{{app.id}}",
    "prompt": "{{conversation.query}}",
    "response": "{{conversation.answer}}",
    "appId": "{{app.id}}",
    "conversationId": "{{conversation.id}}",
    "metadata": {
      "platform": "dify",
      "timestamp": "{{now}}"
    }
  }
}
```

## Dify Application Types

### Chat Applications

For conversational AI applications:

```python
def send_chat_telemetry(conversation_data):
    telemetry = {
        "agentId": f"dify-chat-{conversation_data['app_id']}",
        "prompt": conversation_data['query'],
        "response": conversation_data['answer'],
        "appId": conversation_data['app_id'],
        "conversationId": conversation_data['conversation_id'],
        "metadata": {
            "platform": "dify",
            "app_type": "chat",
            "conversation_mode": "chat",
            "model_provider": conversation_data.get('model_provider'),
            "model_name": conversation_data.get('model_name')
        }
    }
    return telemetry
```

### Agent Applications

For agent-based applications with tools:

```python
def send_agent_telemetry(agent_data):
    telemetry = {
        "agentId": f"dify-agent-{agent_data['app_id']}",
        "prompt": agent_data['query'],
        "response": agent_data['answer'],
        "appId": agent_data['app_id'],
        "metadata": {
            "platform": "dify",
            "app_type": "agent",
            "tools_used": agent_data.get('tools_used', []),
            "agent_strategy": agent_data.get('strategy'),
            "iterations": agent_data.get('iterations', 1)
        },
        "toolCalls": [
            {
                "name": tool['name'],
                "input": tool['input'],
                "output": tool['output']
            } for tool in agent_data.get('tool_calls', [])
        ]
    }
    return telemetry
```

### Workflow Applications

For complex workflow applications:

```python
def send_workflow_telemetry(workflow_data):
    telemetry = {
        "agentId": f"dify-workflow-{workflow_data['app_id']}",
        "prompt": workflow_data['inputs'],
        "response": workflow_data['outputs'],
        "appId": workflow_data['app_id'],
        "metadata": {
            "platform": "dify",
            "app_type": "workflow",
            "workflow_id": workflow_data['workflow_id'],
            "execution_time": workflow_data.get('execution_time'),
            "nodes_executed": workflow_data.get('nodes_executed', [])
        }
    }
    return telemetry
```

## Configuration Examples

### Customer Support Bot

```python
# Dify customer support application
def customer_support_telemetry(data):
    return {
        "agentId": "dify-customer-support",
        "prompt": data['customer_query'],
        "response": data['support_response'],
        "appId": data['app_id'],
        "conversationId": data['conversation_id'],
        "userId": data['customer_id'],
        "metadata": {
            "platform": "dify",
            "department": "customer_support",
            "ticket_category": data.get('category'),
            "urgency": data.get('urgency'),
            "satisfaction_score": data.get('satisfaction')
        }
    }
```

### Content Generation

```python
# Dify content generation application
def content_generation_telemetry(data):
    return {
        "agentId": "dify-content-generator",
        "prompt": data['content_brief'],
        "response": data['generated_content'],
        "appId": data['app_id'],
        "metadata": {
            "platform": "dify",
            "content_type": data.get('content_type'),
            "target_audience": data.get('audience'),
            "word_count": len(data['generated_content'].split()),
            "tone": data.get('tone'),
            "language": data.get('language', 'en')
        }
    }
```

### Document Q&A

```python
# Dify RAG-based document Q&A
def document_qa_telemetry(data):
    return {
        "agentId": "dify-document-qa",
        "prompt": data['question'],
        "response": data['answer'],
        "appId": data['app_id'],
        "metadata": {
            "platform": "dify",
            "app_type": "rag",
            "documents_referenced": data.get('source_documents', []),
            "retrieval_score": data.get('retrieval_score'),
            "knowledge_base": data.get('knowledge_base_id')
        }
    }
```

## Environment Variables

Store your PrecogX API key securely in Dify:

1. **In Dify Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Add: `PRECOGX_API_KEY=px_live_your_actual_api_key_here`

2. **In Code Nodes:**
```python
import os
api_key = os.environ.get('PRECOGX_API_KEY')
```

3. **In Webhook Configuration:**
```json
{
  "x-api-key": "{{env.PRECOGX_API_KEY}}"
}
```

## Testing Your Integration

### 1. Test Webhook

Create a test conversation in your Dify app:

1. Start a conversation with your Dify application
2. Send a test message
3. Check Dify's webhook logs for successful delivery
4. Verify data appears in PrecogX dashboard

### 2. Manual Test

Use curl to test the endpoint directly:

```bash
curl -X POST https://api.precogx.ai/api/v1/integrations/dify/telemetry \
  -H "Content-Type: application/json" \
  -H "x-api-key: px_live_your_actual_api_key_here" \
  -d '{
    "agentId": "dify-test-app",
    "prompt": "Hello, this is a test message",
    "response": "Hi! I received your test message successfully.",
    "appId": "test-app-123",
    "conversationId": "conv-456",
    "userId": "user-789",
    "metadata": {
      "platform": "dify",
      "test": true
    }
  }'
```

### 3. Verify in PrecogX Dashboard

1. Go to [PrecogX Dashboard](https://app.precogx.ai/dashboard)
2. Navigate to **Agents** to see your Dify applications
3. Check **Overview** for interaction metrics
4. Review **Detections** for security alerts

## Troubleshooting

### Common Issues

**Webhook Not Firing**
- Check webhook configuration in Dify settings
- Verify the webhook URL is correct
- Ensure events are properly selected
- Check Dify logs for webhook errors

**401 Unauthorized**
- Verify your PrecogX API key is correct
- Check the header name is exactly `x-api-key`
- Ensure your account tier supports API access

**Missing Data in Dashboard**
- Confirm the JSON payload structure
- Check that `agentId` is a valid string
- Verify required fields are present

**Performance Issues**
- Implement error handling to prevent app slowdown
- Consider async telemetry for high-volume apps
- Monitor API rate limits

### Debug Tips

1. **Enable Dify Debug Logs:**
   - Go to Dify Settings → Debug
   - Enable webhook logging
   - Check logs for telemetry requests

2. **Add Logging to Code Nodes:**
```python
print(f"Sending telemetry: {json.dumps(telemetry_data, indent=2)}")
```

3. **Test Webhook Delivery:**
   - Use tools like ngrok for local testing
   - Check webhook response codes
   - Verify payload format

## Advanced Features

### Custom Agent Naming

Use dynamic agent names based on Dify app context:

```python
agent_id = f"dify-{app_data['name'].lower().replace(' ', '-')}-{app_data['environment']}"
```

### Conversation Context

Include conversation history for better analysis:

```python
metadata = {
    "platform": "dify",
    "conversation_history": conversation_data.get('history', []),
    "conversation_length": len(conversation_data.get('history', [])),
    "user_session_duration": calculate_session_duration(conversation_data)
}
```

### Multi-Model Tracking

Track different models used in your Dify app:

```python
metadata = {
    "platform": "dify",
    "primary_model": app_data['model_config']['model'],
    "model_provider": app_data['model_config']['provider'],
    "temperature": app_data['model_config'].get('temperature'),
    "max_tokens": app_data['model_config'].get('max_tokens')
}
```

## Best Practices

### Security

1. **Use environment variables** for API keys
2. **Validate webhook signatures** (if supported by Dify)
3. **Filter sensitive data** before sending telemetry
4. **Enable HTTPS** for all webhook endpoints

### Performance

1. **Make telemetry non-blocking** in code nodes
2. **Implement retry logic** for failed requests
3. **Use batching** for high-volume applications
4. **Monitor webhook response times**

### Monitoring

1. **Set up alerts** for failed webhooks
2. **Monitor Dify application performance**
3. **Track PrecogX API usage**
4. **Review security analytics** regularly

## Support

Need help with your Dify integration?

- 📧 **Email**: [support@precogx.ai](mailto:support@precogx.ai)
- 💬 **Chat**: Available in your PrecogX dashboard
- 📖 **Documentation**: [docs.precogx.ai](https://docs.precogx.ai)
- 🐛 **Issues**: Report bugs on our GitHub

## Next Steps

After setting up your Dify integration:

1. **Configure Detection Rules**: Set up custom security rules in PrecogX
2. **Set Up Notifications**: Configure alerts for security events
3. **Monitor Application Security**: Review Dify app security metrics
4. **Scale Your Applications**: Explore advanced PrecogX features

---

**Ready to secure your Dify AI applications?** [Start your free PrecogX trial today!](https://app.precogx.ai/signup)
