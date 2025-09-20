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
from precogx_sdk.langchain import PrecogXCallbackHandler
from langchain.llms import OpenAI

# Initialize LangChain with PrecogX
llm = OpenAI(temperature=0)
handler = PrecogXCallbackHandler(api_key="your_api_key")

# Use in your chain
llm.call("Hello world", callbacks=[handler])
```

### AutoGen

```python
from precogx_sdk.autogen import PrecogXAgent
import autogen

# Create PrecogX-protected agent
agent = PrecogXAgent(
    name="assistant",
    api_key="your_api_key",
    system_message="You are a helpful assistant."
)
```

### CrewAI

```python
from precogx_sdk.crewai import PrecogXAgent
from crewai import Task, Crew

# Create PrecogX-protected agent
agent = PrecogXAgent(
    role="Researcher",
    goal="Research topics",
    backstory="You are a research assistant",
    api_key="your_api_key"
)
```

## No-Code Platforms

### Flowise

1. Add HTTP Request node
2. Configure endpoint: `https://api.precogx.ai/v1/telemetry`
3. Set method to POST
4. Add headers: `Authorization: Bearer YOUR_API_KEY`

### Dify

1. Navigate to Tools section
2. Add Custom Tool
3. Configure webhook URL: `https://api.precogx.ai/v1/telemetry`
4. Add authentication headers

### n8n

1. Add HTTP Request node
2. Set URL: `https://api.precogx.ai/v1/telemetry`
3. Add Authorization header
4. Configure request body

### Langflow

1. Add Custom Component
2. Configure API endpoint
3. Add authentication
4. Map input/output fields

## Environment Configuration

### Environment Variables

Create a `.env` file:

```bash
PRECOGX_API_KEY=your_api_key_here
PRECOGX_BASE_URL=https://api.precogx.ai
PRECOGX_ENVIRONMENT=production
```

### Python Configuration

```python
import os
from precogx_sdk import PrecogXClient

# Load from environment
api_key = os.getenv('PRECOGX_API_KEY')
client = PrecogXClient(api_key=api_key)
```

### Node.js Configuration

```javascript
const { PrecogXClient } = require('@precogx/sdk');

// Load from environment
const apiKey = process.env.PRECOGX_API_KEY;
const client = new PrecogXClient(apiKey);
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
