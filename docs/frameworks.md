# Framework Integration

PrecogX provides seamless integration with all major AI frameworks. Choose your framework below to get started with comprehensive AI agent security monitoring.

## 🚀 Quick Start

Choose your framework below to get started:

- **[LangChain Integration](#langchain-integration)** - Most popular AI framework
- **[AutoGen Integration](#autogen-integration)** - Multi-agent conversations
- **[CrewAI Integration](#crewai-integration)** - Team-based AI agents
- **[Basic SDK Integration](#basic-sdk-integration)** - Direct API integration

## 📋 Integration Overview

PrecogX provides seamless integration with all major AI frameworks:

### **What We Monitor:**
- ✅ **Prompts & Responses** - Every AI interaction
- ✅ **Tool Calls** - Function executions and parameters
- ✅ **Agent Behavior** - Patterns and anomalies
- ✅ **Security Events** - Threats and violations

### **What We Detect:**
- 🛡️ **Prompt Injection** - Attempts to manipulate AI behavior
- 🔒 **PII Leakage** - Sensitive data exposure
- 🚫 **Content Moderation** - Inappropriate content
- 🔗 **Malicious Links** - Suspicious URLs and domains
- ⚠️ **Tool Abuse** - Dangerous function calls
- 📊 **Behavioral Drift** - Unexpected agent behavior

### **What You Get:**
- 📈 **Real-time Trust Scores** - Dynamic agent reliability
- 🔔 **Instant Alerts** - Slack, Teams, or webhook notifications
- 📊 **Analytics Dashboard** - Comprehensive insights
- 👥 **Human-in-the-Loop** - Manual validation when needed

## 🔧 Installation

### **Python SDK**
```bash
pip install precogx-sdk
```

### **Framework-Specific Extensions**
```bash
# LangChain support
pip install "precogx-sdk[langchain]"

# AutoGen support
pip install "precogx-sdk[autogen]"

# CrewAI support
pip install "precogx-sdk[crewai]"
```

### **JavaScript SDK**
```bash
npm install @precogx/sdk
```

## LangChain Integration

The most popular AI framework with seamless callback integration.

**Perfect for:**
- Chatbots and conversational AI
- Document processing and analysis
- Tool-using agents
- RAG (Retrieval-Augmented Generation) systems

### **Key Features:**
- Automatic callback integration
- Session tracking
- Tool call monitoring
- Conversation context preservation

### **Installation**
```bash
pip install "precogx-sdk[langchain]"
```

### **Basic Usage**
```python
from langchain.agents import initialize_agent
from precogx_langchain import PrecogXCallbackHandler

# Initialize with PrecogX monitoring
agent = initialize_agent(
    tools=[...],
    llm=...,
    callbacks=[PrecogXCallbackHandler(api_key="your_key")]
)

# Every interaction is automatically monitored
agent.run("What's the weather in New York?")
```

### **Advanced Configuration**
```python
from precogx_langchain import PrecogXCallbackHandler

# Configure with custom settings
handler = PrecogXCallbackHandler(
    api_key="your_api_key",
    agent_id="my-langchain-agent",
    enable_tool_monitoring=True,
    enable_behavior_tracking=True
)

# Use with any LangChain agent
agent = initialize_agent(
    tools=[...],
    llm=...,
    callbacks=[handler]
)
```

### **Tool Monitoring**
```python
from langchain.tools import Tool
from precogx_langchain import PrecogXCallbackHandler

# Define tools with security monitoring
def dangerous_function(query: str) -> str:
    # This will be monitored for tool abuse
    return f"Executed: {query}"

tool = Tool(
    name="dangerous_function",
    description="A potentially dangerous function",
    func=dangerous_function
)

# PrecogX will monitor all tool calls
agent = initialize_agent([tool], llm, callbacks=[handler])
```

## AutoGen Integration

Multi-agent conversation framework with advanced monitoring.

**Perfect for:**
- Multi-agent conversations
- Agent-to-agent interactions
- Complex workflows
- Collaborative AI systems

### **Key Features:**
- Multi-agent monitoring
- Conversation flow analysis
- Role-based security rules
- Group dynamics tracking

### **Installation**
```bash
pip install "precogx-sdk[autogen]"
```

### **Basic Usage**
```python
from autogen import AssistantAgent, UserProxyAgent
from precogx_sdk import PrecogXClient

# Monitor multi-agent conversations
client = PrecogXClient(api_key="your_key")

# Every agent interaction is tracked
assistant = AssistantAgent(name="assistant")
user_proxy = UserProxyAgent(name="user_proxy")

# Conversation automatically monitored
user_proxy.initiate_chat(assistant, message="Hello!")
```

### **Multi-Agent Monitoring**
```python
from autogen import AssistantAgent, UserProxyAgent, GroupChat
from precogx_sdk import PrecogXClient

client = PrecogXClient(api_key="your_key")

# Create multiple agents
assistant1 = AssistantAgent(name="assistant1")
assistant2 = AssistantAgent(name="assistant2")
user_proxy = UserProxyAgent(name="user_proxy")

# Group chat with monitoring
group_chat = GroupChat(
    agents=[assistant1, assistant2, user_proxy],
    messages=[],
    max_round=10
)

# All agent interactions are monitored
user_proxy.initiate_chat(group_chat, message="Let's discuss AI security")
```

### **Role-Based Security**
```python
from precogx_sdk import PrecogXClient

client = PrecogXClient(api_key="your_key")

# Configure different security rules per agent type
assistant = AssistantAgent(
    name="assistant",
    system_message="You are a helpful assistant. Be careful with sensitive data."
)

# PrecogX will apply different security rules based on agent role
```

## CrewAI Integration

Team-based AI agents with comprehensive monitoring.

**Perfect for:**
- AI teams and crews
- Task delegation systems
- Workflow automation
- Collaborative projects

### **Key Features:**
- Team-level monitoring
- Task execution tracking
- Workflow analysis
- Performance metrics

### **Installation**
```bash
pip install "precogx-sdk[crewai]"
```

### **Basic Usage**
```python
from crewai import Agent, Task, Crew
from precogx_sdk import PrecogXClient

# Monitor entire AI teams
client = PrecogXClient(api_key="your_key")

# Team collaboration tracked
researcher = Agent(role="Researcher", goal="Find information")
writer = Agent(role="Writer", goal="Write content")

crew = Crew(agents=[researcher, writer], tasks=[...])
result = crew.kickoff()  # All interactions monitored
```

### **Task-Level Monitoring**
```python
from crewai import Agent, Task, Crew
from precogx_sdk import PrecogXClient

client = PrecogXClient(api_key="your_key")

# Define agents with specific roles
researcher = Agent(
    role="Researcher",
    goal="Find accurate information",
    backstory="You are a research expert"
)

writer = Agent(
    role="Writer", 
    goal="Create engaging content",
    backstory="You are a content writer"
)

# Define tasks with monitoring
research_task = Task(
    description="Research AI security trends",
    agent=researcher
)

writing_task = Task(
    description="Write a blog post about AI security",
    agent=writer,
    dependencies=[research_task]
)

# All task executions are monitored
crew = Crew(agents=[researcher, writer], tasks=[research_task, writing_task])
result = crew.kickoff()
```

## Basic SDK Integration

Direct API integration for custom implementations.

**Perfect for:**
- Custom AI frameworks
- Proprietary systems
- Direct API control
- Flexible implementations

### **Key Features:**
- Full API access
- Custom integration points
- Manual control
- Framework agnostic

### **Installation**
```bash
pip install precogx-sdk
```

### **Basic Usage**
```python
from precogx_sdk import PrecogXClient

# Initialize client
client = PrecogXClient(api_key="your_api_key")

# Send telemetry data
client.send_telemetry({
    "agent_id": "my-custom-agent",
    "prompt": "What's the weather?",
    "response": "It's sunny today.",
    "metadata": {
        "model": "gpt-4",
        "platform": "custom",
        "version": "1.0.0"
    }
})
```

### **Advanced Usage**
```python
from precogx_sdk import PrecogXClient

client = PrecogXClient(api_key="your_api_key")

# Monitor custom AI function
def my_ai_function(prompt: str) -> str:
    # Your AI logic here
    response = process_prompt(prompt)
    
    # Send telemetry
    client.send_telemetry({
        "agent_id": "custom-agent",
        "prompt": prompt,
        "response": response,
        "metadata": {
            "model": "custom-model",
            "platform": "custom-framework",
            "session_id": "session-123"
        }
    })
    
    return response
```

### **Tool Call Monitoring**
```python
from precogx_sdk import PrecogXClient

client = PrecogXClient(api_key="your_api_key")

# Monitor tool calls
def dangerous_tool_call(parameters: dict) -> str:
    # Send tool call telemetry
    client.send_telemetry({
        "agent_id": "my-agent",
        "tool_calls": [{
            "name": "dangerous_tool",
            "arguments": parameters
        }],
        "metadata": {
            "tool_risk_level": "high"
        }
    })
    
    # Execute tool
    return execute_tool(parameters)
```

## 🔍 Monitoring Examples

### **LangChain Agent**
```python
from langchain.agents import initialize_agent
from precogx_langchain import PrecogXCallbackHandler

# Initialize with PrecogX monitoring
agent = initialize_agent(
    tools=[...],
    llm=...,
    callbacks=[PrecogXCallbackHandler(api_key="your_key")]
)

# Every interaction is automatically monitored
agent.run("What's the weather in New York?")
```

### **AutoGen Conversation**
```python
from autogen import AssistantAgent, UserProxyAgent
from precogx_sdk import PrecogXClient

# Monitor multi-agent conversations
client = PrecogXClient(api_key="your_key")

# Every agent interaction is tracked
assistant = AssistantAgent(name="assistant")
user_proxy = UserProxyAgent(name="user_proxy")

# Conversation automatically monitored
user_proxy.initiate_chat(assistant, message="Hello!")
```

### **CrewAI Team**
```python
from crewai import Agent, Task, Crew
from precogx_sdk import PrecogXClient

# Monitor entire AI teams
client = PrecogXClient(api_key="your_key")

# Team collaboration tracked
researcher = Agent(role="Researcher", goal="Find information")
writer = Agent(role="Writer", goal="Write content")

crew = Crew(agents=[researcher, writer], tasks=[...])
result = crew.kickoff()  # All interactions monitored
```

## 🛡️ Security Features

### **Real-Time Protection**
- **Instant Detection**: Threats identified in milliseconds
- **Automatic Blocking**: Dangerous actions prevented
- **Human Validation**: Ambiguous cases sent for review
- **Audit Trail**: Complete history of all events

### **Advanced Analytics**
- **Trust Scoring**: Dynamic agent reliability metrics
- **Behavioral Analysis**: Pattern recognition and anomalies
- **Threat Intelligence**: Up-to-date threat detection
- **Performance Metrics**: Efficiency and security insights

### **Compliance & Governance**
- **SOC2 Compliance**: Enterprise-grade security
- **HIPAA Support**: Healthcare data protection
- **Audit Logging**: Complete event history
- **Role-Based Access**: Team permission management

## 📞 Support

Need help with integration?

- **Documentation**: Comprehensive guides for each framework
- **Examples**: Real-world implementation examples
- **Community**: Join our Discord for help
- **Support**: Email us at support@precogx.ai

## 🚀 Next Steps

1. **Choose your framework** from the guides above
2. **Follow the integration steps** in your chosen guide
3. **Test your implementation** with our demo scenarios
4. **Monitor your agents** in the dashboard
5. **Configure alerts** for security events

Ready to secure your AI agents? Choose your framework and let's get started! 🛡️
