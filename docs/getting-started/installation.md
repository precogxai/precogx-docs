---
sidebar_position: 2
---

# Installation Guide

Detailed installation instructions for PrecogX SDK and integrations.

## System Requirements

### Python
- Python 3.8 or higher
- pip package manager

### Node.js
- Node.js 16.0 or higher
- npm or yarn package manager

### Other Languages
- REST API support for any language with HTTP capabilities

## Python Installation

### Standard Installation

```bash
pip install precogx-sdk
```

### With Framework Support

```bash
# For LangChain integration
pip install "precogx-sdk[langchain]"

# For AutoGen integration  
pip install "precogx-sdk[autogen]"

# For CrewAI integration
pip install "precogx-sdk[crewai]"
```

### Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv precogx-env

# Activate virtual environment
# On Windows:
precogx-env\Scripts\activate
# On macOS/Linux:
source precogx-env/bin/activate

# Install PrecogX SDK
pip install precogx-sdk
```

### Verify Installation

```python
import precogx_sdk
print(f"PrecogX SDK version: {precogx_sdk.__version__}")
```

## Node.js Installation

### Using npm

```bash
npm install @precogx/sdk
```

### Using yarn

```bash
yarn add @precogx/sdk
```

### Verify Installation

```javascript
const { PrecogXClient } = require('@precogx/sdk');
console.log('PrecogX SDK installed successfully');
```

## Framework Integrations

### LangChain

```python
from precogx_sdk import PrecogXEmitter
from precogx_sdk.langchain import PrecogXCallbackHandler
from langchain.llms import OpenAI

# Set agent_id once on the emitter — the callback handler inherits it
emitter = PrecogXEmitter(
    backend_url="https://api.precogx.ai",
    api_key="your_api_key",
    agent_id="my-langchain-agent",    # set once here
)
handler = PrecogXCallbackHandler(emitter=emitter, agent_id=emitter.agent_id)

llm = OpenAI(temperature=0)
llm.call("Hello world", callbacks=[handler])
```

### AutoGen

```python
from precogx_sdk.autogen import PrecogXAgent

agent = PrecogXAgent(
    name="assistant",
    api_key="your_api_key",
    agent_id="my-autogen-agent",      # identifies this agent in PrecogX dashboard
    system_message="You are a helpful assistant."
)
```

### CrewAI

```python
from precogx_sdk.crewai import PrecogXAgent

agent = PrecogXAgent(
    role="Researcher",
    goal="Research topics",
    backstory="You are a research assistant",
    api_key="your_api_key",
    agent_id="my-crewai-researcher",  # identifies this agent in PrecogX dashboard
)
```

## No-Code Platforms

For no-code platforms, include `agentId` as a **fixed value** in your HTTP request body. Use a descriptive name — it will appear as the agent name in your PrecogX dashboard.

### Flowise

1. Add **HTTP Request** node
2. Set URL: `https://api.precogx.ai/api/v1/telemetry/ingest`
3. Set method to **POST**
4. Add header: `x-api-key: YOUR_API_KEY`
5. Set JSON body:
```json
{
  "agentId": "my-flowise-agent",
  "prompt": "{{input}}",
  "response": "{{output}}"
}
```

### n8n

1. Add **HTTP Request** node
2. Set URL: `https://api.precogx.ai/api/v1/telemetry/ingest`
3. Set method to **POST**
4. Add header: `x-api-key: YOUR_API_KEY`
5. Set JSON body:
```json
{
  "agentId": "my-n8n-agent",
  "prompt": "{{ $json.prompt }}",
  "response": "{{ $json.response }}"
}
```

### Dify

1. Navigate to **Tools** → **Custom Tool**
2. Set endpoint: `https://api.precogx.ai/api/v1/telemetry/ingest`
3. Set method to **POST**
4. Add header: `x-api-key: YOUR_API_KEY`
5. Include `agentId` as a fixed string in the request body

## Environment Configuration

### Environment Variables (Recommended)

The simplest integration — set two env vars and you're done. No `agent_id` in any code.

```bash
# .env
PRECOGX_API_KEY=your_api_key_here
PRECOGX_AGENT_ID=my-agent-name        # the SDK reads this automatically
```

With these set, the entire integration is:

```python
from precogx_sdk import PrecogXClient

client = PrecogXClient()   # reads both vars from environment automatically
client.send_telemetry({"prompt": "...", "response": "..."})
```

### Multiple Agents

For multiple agents, create one client per agent. All agents share the same API key (same organisation), but each has its own `agent_id`:

```python
from precogx_sdk import PrecogXClient

# All use the same API key, each has its own identity
support = PrecogXClient(api_key="your_api_key", agent_id="support-bot")
sales   = PrecogXClient(api_key="your_api_key", agent_id="sales-bot")
hr      = PrecogXClient(api_key="your_api_key", agent_id="hr-screener")

# Now each client tracks its own agent independently
support.send_telemetry({"prompt": "...", "response": "..."})
sales.send_telemetry({"prompt": "...", "response": "..."})
```

### Node.js Configuration

```javascript
const { PrecogXClient } = require('@precogx/sdk');

const client = new PrecogXClient({
  apiKey: process.env.PRECOGX_API_KEY,   // from environment
  agentId: process.env.PRECOGX_AGENT_ID, // from environment
});
```

## Docker Installation

### Python Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["python", "app.py"]
```

### requirements.txt

```txt
precogx-sdk==1.0.0
fastapi==0.104.1
uvicorn==0.24.0
```

## Troubleshooting

### Common Issues

**Import Error**
```bash
# Ensure you're using the correct Python environment
which python
pip list | grep precogx
```

**Authentication Error**
```python
# Verify your API key
client = PrecogXClient(api_key="your_key")
print(client.health_check())
```

**Network Issues**
```python
# Check connectivity
import requests
response = requests.get("https://api.precogx.ai/health")
print(response.status_code)
```

### Getting Help

- 📧 [support@precogx.ai](mailto:support@precogx.ai)
- 💬 [GitHub Discussions](https://github.com/precogxai/discussions)
- 🐛 [Report Issues](https://github.com/precogxai/issues)

## Next Steps

- **[First Agent](/docs/getting-started/first-agent)** - Create your first protected agent
