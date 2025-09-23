# API Reference

Complete API reference for integrating PrecogX security monitoring into your custom AI applications and workflows.

## Overview

The PrecogX API provides endpoints for sending telemetry data, managing agents, and retrieving security analytics. This reference covers all available endpoints, request/response formats, authentication, and integration patterns.

## Base URL

```
https://api.precogx.ai/api/v1
```

## Authentication

All API requests require authentication using an API key in the request header.

### API Key Authentication

```http
Authorization: Bearer px_live_your_actual_api_key_here
```

**Alternative header format:**
```http
x-api-key: px_live_your_actual_api_key_here
```

### Getting Your API Key

1. Sign in to your [PrecogX Dashboard](https://app.precogx.ai)
2. Navigate to **Settings** → **API Keys**
3. Click **Create API Key**
4. Copy your key and store it securely

## Core Endpoints

### Telemetry Ingestion

Send AI interaction data to PrecogX for security analysis.

#### Generic Telemetry Endpoint

```http
POST /telemetry/ingest
```

**Headers:**
```http
Content-Type: application/json
x-api-key: px_live_your_actual_api_key_here
```

**Request Body:**
```json
{
  "agentId": "string",
  "prompt": "string",
  "response": "string",
  "metadata": {
    "timestamp": "2024-01-15T10:30:00Z",
    "userId": "user-123",
    "sessionId": "session-456",
    "platform": "custom",
    "model": "gpt-4",
    "tokens_used": 150
  },
  "toolCalls": [
    {
      "name": "search_database",
      "input": {"query": "customer orders"},
      "output": {"results": [...]}
    }
  ]
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Telemetry data ingested successfully",
  "agentId": "custom-agent-1",
  "interactionId": "int-789"
}
```

#### Platform-Specific Endpoints

For better integration with specific platforms:

**Flowise Integration:**
```http
POST /integrations/flowise/telemetry
```

**n8n Integration:**
```http
POST /integrations/n8n/telemetry
```

**Dify Integration:**
```http
POST /integrations/dify/telemetry
```

**Custom Integration:**
```http
POST /integrations/custom/telemetry
```

## Request Schema

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `agentId` | string | Unique identifier for your AI agent | `"customer-support-bot"` |
| `prompt` | string | User input or prompt sent to the AI | `"What is your refund policy?"` |
| `response` | string | AI's response or output | `"Our refund policy allows..."` |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `metadata` | object | Additional context and information | See metadata schema below |
| `toolCalls` | array | Tools or functions called by the AI | See tool calls schema below |
| `userId` | string | Unique identifier for the user | `"user-12345"` |
| `sessionId` | string | Session identifier | `"session-abcde"` |
| `conversationId` | string | Conversation thread identifier | `"conv-67890"` |

### Metadata Schema

```json
{
  "metadata": {
    "timestamp": "2024-01-15T10:30:00Z",
    "platform": "custom",
    "environment": "production",
    "model": "gpt-4-turbo",
    "model_provider": "openai",
    "temperature": 0.7,
    "max_tokens": 2000,
    "tokens_used": 150,
    "response_time_ms": 1200,
    "user_agent": "MyApp/1.0",
    "ip_address": "192.168.1.1",
    "location": "US",
    "language": "en",
    "intent": "question",
    "sentiment": "neutral",
    "confidence_score": 0.95,
    "custom_field_1": "custom_value_1"
  }
}
```

### Tool Calls Schema

```json
{
  "toolCalls": [
    {
      "name": "search_database",
      "description": "Search customer database",
      "input": {
        "query": "customer orders",
        "filters": {"status": "active"}
      },
      "output": {
        "results": [...],
        "count": 5
      },
      "execution_time_ms": 500,
      "success": true
    }
  ]
}
```

## Response Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | Success | Telemetry data processed successfully |
| 400 | Bad Request | Invalid request format or missing required fields |
| 401 | Unauthorized | Invalid or missing API key |
| 403 | Forbidden | API key valid but insufficient permissions |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error processing request |

## Error Responses

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required field: agentId",
    "details": {
      "field": "agentId",
      "expected": "string",
      "received": "null"
    }
  }
}
```

### Common Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `INVALID_API_KEY` | API key is invalid or expired | Check your API key in dashboard |
| `MISSING_REQUIRED_FIELD` | Required field missing from request | Include all required fields |
| `INVALID_FIELD_TYPE` | Field type doesn't match expected type | Check field types in schema |
| `RATE_LIMIT_EXCEEDED` | Too many requests in time period | Implement exponential backoff |
| `AGENT_LIMIT_EXCEEDED` | Too many agents for your tier | Upgrade plan or reduce agents |

## Rate Limits

| Tier | Requests per minute | Burst limit |
|------|-------------------|-------------|
| Free | 100 | 200 |
| Professional | 1,000 | 2,000 |
| Business | 5,000 | 10,000 |
| Enterprise | Custom | Custom |

## Integration Examples

### Python

```python
import requests
import json
from datetime import datetime, timezone

class PrecogXClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.precogx.ai/api/v1"
        self.headers = {
            "Content-Type": "application/json",
            "x-api-key": api_key
        }
    
    def send_telemetry(self, agent_id, prompt, response, metadata=None, tool_calls=None):
        """Send telemetry data to PrecogX"""
        payload = {
            "agentId": agent_id,
            "prompt": prompt,
            "response": response,
            "metadata": metadata or {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "platform": "python-custom"
            }
        }
        
        if tool_calls:
            payload["toolCalls"] = tool_calls
        
        try:
            response = requests.post(
                f"{self.base_url}/telemetry/ingest",
                headers=self.headers,
                json=payload,
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"PrecogX telemetry failed: {e}")
            return None

# Usage example
client = PrecogXClient("px_live_your_actual_api_key_here")

result = client.send_telemetry(
    agent_id="python-chatbot",
    prompt="What's the weather like?",
    response="I don't have access to real-time weather data.",
    metadata={
        "user_id": "user123",
        "session_id": "sess456",
        "model": "gpt-4",
        "platform": "python-custom"
    }
)
```

### Node.js

```javascript
const axios = require('axios');

class PrecogXClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.precogx.ai/api/v1';
        this.headers = {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        };
    }

    async sendTelemetry(agentId, prompt, response, metadata = null, toolCalls = null) {
        const payload = {
            agentId,
            prompt,
            response,
            metadata: metadata || {
                timestamp: new Date().toISOString(),
                platform: 'nodejs-custom'
            }
        };

        if (toolCalls) {
            payload.toolCalls = toolCalls;
        }

        try {
            const result = await axios.post(
                `${this.baseURL}/telemetry/ingest`,
                payload,
                { headers: this.headers, timeout: 10000 }
            );
            return result.data;
        } catch (error) {
            console.error('PrecogX telemetry failed:', error.message);
            return null;
        }
    }
}

// Usage example
const client = new PrecogXClient('px_live_your_actual_api_key_here');

client.sendTelemetry(
    'nodejs-assistant',
    'Help me write a professional email',
    'I\'d be happy to help you write a professional email. What\'s the purpose of the email?',
    {
        userId: 'user789',
        sessionId: 'sess123',
        model: 'gpt-4',
        platform: 'nodejs-custom'
    }
).then(result => {
    if (result) {
        console.log('Telemetry sent successfully:', result);
    }
});
```

### Java

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PrecogXClient {
    private final String apiKey;
    private final String baseUrl = "https://api.precogx.ai/api/v1";
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public PrecogXClient(String apiKey) {
        this.apiKey = apiKey;
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    public void sendTelemetry(String agentId, String prompt, String response, 
                            Map<String, Object> metadata) {
        try {
            Map<String, Object> payload = new HashMap<>();
            payload.put("agentId", agentId);
            payload.put("prompt", prompt);
            payload.put("response", response);
            
            if (metadata == null) {
                metadata = new HashMap<>();
                metadata.put("timestamp", Instant.now().toString());
                metadata.put("platform", "java-custom");
            }
            payload.put("metadata", metadata);

            String jsonPayload = objectMapper.writeValueAsString(payload);

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/telemetry/ingest"))
                .header("Content-Type", "application/json")
                .header("x-api-key", apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

            HttpResponse<String> response = httpClient.send(request, 
                HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                System.out.println("Telemetry sent successfully");
            } else {
                System.err.println("Telemetry failed: " + response.body());
            }
        } catch (Exception e) {
            System.err.println("PrecogX telemetry error: " + e.getMessage());
        }
    }
}

// Usage example
PrecogXClient client = new PrecogXClient("px_live_your_actual_api_key_here");

Map<String, Object> metadata = new HashMap<>();
metadata.put("userId", "user456");
metadata.put("model", "gpt-4");
metadata.put("platform", "java-custom");

client.sendTelemetry(
    "java-assistant",
    "Explain quantum computing",
    "Quantum computing is a type of computation that harnesses quantum mechanics...",
    metadata
);
```

### Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "time"
)

type PrecogXClient struct {
    APIKey  string
    BaseURL string
    Client  *http.Client
}

type TelemetryPayload struct {
    AgentID   string                 `json:"agentId"`
    Prompt    string                 `json:"prompt"`
    Response  string                 `json:"response"`
    Metadata  map[string]interface{} `json:"metadata,omitempty"`
    ToolCalls []ToolCall             `json:"toolCalls,omitempty"`
}

type ToolCall struct {
    Name   string      `json:"name"`
    Input  interface{} `json:"input"`
    Output interface{} `json:"output"`
}

func NewPrecogXClient(apiKey string) *PrecogXClient {
    return &PrecogXClient{
        APIKey:  apiKey,
        BaseURL: "https://api.precogx.ai/api/v1",
        Client:  &http.Client{Timeout: 10 * time.Second},
    }
}

func (c *PrecogXClient) SendTelemetry(agentID, prompt, response string, 
                                     metadata map[string]interface{}) error {
    if metadata == nil {
        metadata = map[string]interface{}{
            "timestamp": time.Now().UTC().Format(time.RFC3339),
            "platform":  "go-custom",
        }
    }

    payload := TelemetryPayload{
        AgentID:  agentID,
        Prompt:   prompt,
        Response: response,
        Metadata: metadata,
    }

    jsonData, err := json.Marshal(payload)
    if err != nil {
        return fmt.Errorf("failed to marshal payload: %w", err)
    }

    req, err := http.NewRequest("POST", c.BaseURL+"/telemetry/ingest", 
                               bytes.NewBuffer(jsonData))
    if err != nil {
        return fmt.Errorf("failed to create request: %w", err)
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("x-api-key", c.APIKey)

    resp, err := c.Client.Do(req)
    if err != nil {
        return fmt.Errorf("request failed: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("API returned status %d", resp.StatusCode)
    }

    fmt.Println("Telemetry sent successfully")
    return nil
}

// Usage example
func main() {
    client := NewPrecogXClient("px_live_your_actual_api_key_here")

    metadata := map[string]interface{}{
        "userId":   "user789",
        "model":    "gpt-4",
        "platform": "go-custom",
    }

    err := client.SendTelemetry(
        "go-assistant",
        "What are the benefits of microservices?",
        "Microservices offer several benefits including scalability, flexibility...",
        metadata,
    )

    if err != nil {
        fmt.Printf("Error sending telemetry: %v\n", err)
    }
}
```

## Advanced Features

### Batch Telemetry

Send multiple interactions in a single request:

```http
POST /telemetry/batch
```

```json
{
  "interactions": [
    {
      "agentId": "batch-agent-1",
      "prompt": "First question",
      "response": "First response",
      "metadata": {"timestamp": "2024-01-15T10:30:00Z"}
    },
    {
      "agentId": "batch-agent-1",
      "prompt": "Second question",
      "response": "Second response",
      "metadata": {"timestamp": "2024-01-15T10:31:00Z"}
    }
  ]
}
```

### Async Telemetry

For high-performance applications, use fire-and-forget telemetry:

```python
import asyncio
import aiohttp

async def send_telemetry_async(session, payload):
    async with session.post(
        "https://api.precogx.ai/api/v1/telemetry/ingest",
        json=payload,
        headers={"x-api-key": "px_live_your_actual_api_key_here"}
    ) as response:
        return await response.json()

# Usage
async with aiohttp.ClientSession() as session:
    await send_telemetry_async(session, telemetry_data)
```

### Custom Fields

Add custom fields to your telemetry for specific use cases:

```json
{
  "agentId": "custom-agent",
  "prompt": "User question",
  "response": "AI response",
  "metadata": {
    "custom_field_1": "value1",
    "custom_field_2": 42,
    "custom_field_3": true,
    "business_unit": "sales",
    "cost_center": "marketing",
    "experiment_id": "exp-123"
  }
}
```

## Best Practices

### Error Handling

Always implement proper error handling:

```python
def send_telemetry_safe(client, data):
    max_retries = 3
    for attempt in range(max_retries):
        try:
            return client.send_telemetry(**data)
        except requests.exceptions.RequestException as e:
            if attempt == max_retries - 1:
                logging.error(f"Failed to send telemetry after {max_retries} attempts: {e}")
                return None
            time.sleep(2 ** attempt)  # Exponential backoff
```

### Rate Limiting

Respect rate limits with proper throttling:

```python
import time
from collections import deque

class RateLimiter:
    def __init__(self, max_requests=100, time_window=60):
        self.max_requests = max_requests
        self.time_window = time_window
        self.requests = deque()
    
    def can_make_request(self):
        now = time.time()
        # Remove old requests outside time window
        while self.requests and self.requests[0] < now - self.time_window:
            self.requests.popleft()
        
        if len(self.requests) < self.max_requests:
            self.requests.append(now)
            return True
        return False
```

### Data Privacy

Filter sensitive information before sending:

```python
def sanitize_data(prompt, response):
    # Remove PII patterns
    import re
    
    # Remove email addresses
    prompt = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[EMAIL]', prompt)
    response = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[EMAIL]', response)
    
    # Remove phone numbers
    prompt = re.sub(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', '[PHONE]', prompt)
    response = re.sub(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', '[PHONE]', response)
    
    return prompt, response
```

## Webhooks (Coming Soon)

Receive real-time security alerts via webhooks:

```http
POST https://your-app.com/precogx/webhook
```

```json
{
  "event": "threat_detected",
  "agentId": "your-agent-id",
  "threatType": "prompt_injection",
  "severity": "high",
  "timestamp": "2024-01-15T10:30:00Z",
  "details": {
    "confidence": 0.95,
    "description": "Potential prompt injection detected"
  }
}
```

## Support

Need help with the API?

- 📧 **Email**: [support@precogx.ai](mailto:support@precogx.ai)
- 💬 **Chat**: Available in your PrecogX dashboard
- 📖 **Documentation**: [docs.precogx.ai](https://docs.precogx.ai)
- 🐛 **Issues**: Report bugs on our GitHub

---

**Ready to integrate PrecogX into your AI application?** [Get your API key today!](https://app.precogx.ai/settings/api-keys)
