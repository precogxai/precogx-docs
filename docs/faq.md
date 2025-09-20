# Frequently Asked Questions (FAQ)

## General Questions

### What is PrecogX?
PrecogX is a next-generation SOAR (Security Orchestration, Automation, and Response) platform designed specifically for AI agents and agentic systems. We provide real-time threat detection, trust scoring, and human-in-the-loop validation to secure your AI operations.

### How does PrecogX work?
PrecogX monitors your AI agents in real-time, analyzing interactions for security threats like prompt injection, PII leakage, and content violations. Our advanced AI modules provide deep contextual analysis, while human-in-the-loop validation handles uncertain cases.

### What makes PrecogX different from other security tools?
- **AI-Native**: Built specifically for AI agents and agentic systems
- **Real-time Protection**: Instant threat detection and response
- **Trust Scoring**: Dynamic reliability assessment of your agents
- **Human-in-the-Loop**: Manual validation for uncertain cases
- **Framework Integration**: Seamless integration with LangChain, AutoGen, CrewAI
- **SOAR Platform**: Complete Security Orchestration, Automation, and Response

### What types of threats does PrecogX detect?
- **Prompt Injection**: Attempts to manipulate AI behavior
- **PII Leakage**: Exposure of sensitive personal data
- **Content Moderation**: Inappropriate or harmful content
- **Malicious Links**: Suspicious URLs and phishing attempts
- **Tool Abuse**: Unauthorized tool usage
- **Behavioral Drift**: Unusual agent behavior patterns

### How accurate is PrecogX's detection?
Our detection accuracy varies by threat type:
- **Prompt Injection**: 95%+ accuracy
- **PII Detection**: 90%+ accuracy  
- **Content Moderation**: 85%+ accuracy
- **Malicious Links**: 92%+ accuracy
- **Tool Abuse**: 88%+ accuracy
- **Behavioral Drift**: 82%+ accuracy

### What advanced AI modules are available?
- **LM Judge Analysis**: Deep contextual analysis using advanced AI models
- **Advanced Threat Analysis**: Multi-model threat assessment
- **Complex Attack Detection**: Multi-vector attack identification
- **AI-Powered Explanations**: Human-readable threat explanations

### How does the trust scoring work?
Trust scoring evaluates agent reliability based on:
- **Detection History**: Frequency and severity of threats
- **Response Quality**: Consistency of AI responses
- **Behavioral Patterns**: Normal vs. anomalous behavior
- **User Feedback**: Manual validation results
- **Time Decay**: Recent events weighted more heavily

## Pricing & Billing

### How does the "Agent-as-Impact™" pricing work?
You only pay for meaningful security events (impact events), not API calls or storage. This ensures you only pay when PrecogX provides real value by detecting and preventing threats.

### What counts as an impact event?
- **Threat Detected**: Any security threat identified
- **Threat Prevented**: Automated blocking of malicious content
- **Human Review**: Manual validation of uncertain cases
- **Trust Score Change**: Significant changes in agent reliability

### What are the pricing tiers?
- **FREE TRIAL**: 30 days, 1 agent, 1,000 events
- **PROFESSIONAL**: $79/month, 5 agents, 10,000 events
- **BUSINESS**: $199/month, 20 agents, 50,000 events
- **ENTERPRISE**: Custom pricing, unlimited agents, unlimited events

### What's included in each tier?
**FREE TRIAL (30 days):**
- Up to 1 agent
- 1,000 security events
- Basic detection modules
- Email notifications
- Community support

**PROFESSIONAL ($79/month):**
- Up to 5 agents
- 10,000 security events
- Advanced integrations (Slack, Webhooks)
- Framework integrations (LangChain, AutoGen, CrewAI)
- No-code platform support
- Priority support

**BUSINESS ($199/month):**
- Up to 20 agents
- 50,000 security events
- Advanced AI modules (LM Judge)
- Human-in-the-Loop validation
- Business Intelligence Dashboard
- Performance Analytics
- Phone support

**ENTERPRISE (Custom):**
- Unlimited agents
- Unlimited security events
- All advanced features
- Custom integrations
- Dedicated support
- SLA guarantees

### Can I upgrade or downgrade my plan?
Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle.

### Do you offer refunds?
We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact support for a full refund.

## Technical Questions

### How do I integrate PrecogX with my AI agents?
Integration is simple with our SDKs:
```python
from precogx_sdk import monitor

@monitor(agent_id="my-agent")
def my_ai_function(prompt):
    # Your AI logic here
    return response
```

### What frameworks does PrecogX support?
- **LangChain**: Native callback integration
- **AutoGen**: Multi-agent monitoring
- **CrewAI**: Team and task monitoring
- **Custom**: Any framework via our SDK

### How do I get my API key?
1. Sign up at [precogx.ai](https://precogx.ai)
2. Navigate to Settings → API Keys
3. Generate a new API key
4. Keep it secure and never commit to version control

### What's the API rate limit?
Rate limits vary by plan:
- **FREE TRIAL**: 100 requests/minute
- **PROFESSIONAL**: 1,000 requests/minute
- **BUSINESS**: 5,000 requests/minute
- **ENTERPRISE**: Custom limits

### How do webhooks work?
Webhooks send real-time notifications for:
- **Detections**: New security threats
- **Trust Score Changes**: Significant reliability changes
- **Critical Alerts**: High-priority security events

### Can I customize detection rules?
Yes, Business+ plans include:
- **Custom Detection Rules**: Define your own threat patterns
- **Threshold Adjustments**: Fine-tune sensitivity levels
- **Whitelist Management**: Exclude false positives
- **Custom Actions**: Define automated responses

### How do I handle false positives?
- **Manual Review**: Human-in-the-loop validation
- **Whitelist Management**: Exclude known safe patterns
- **Threshold Adjustment**: Fine-tune detection sensitivity
- **Feedback Loop**: Improve accuracy over time

### What data does PrecogX store?
We store:
- **Interaction Data**: Prompts, responses, metadata
- **Detection Results**: Threat analysis and outcomes
- **Trust Scores**: Agent reliability metrics
- **User Feedback**: Manual validation results

### How long is data retained?
- **FREE TRIAL**: 30 days
- **PROFESSIONAL**: 90 days
- **BUSINESS**: 180 days
- **ENTERPRISE**: 1 year (customizable)

### Is my data secure?
Yes, we implement enterprise-grade security with comprehensive encryption:

#### **Data Encryption**
- **AES-256 encryption** for all sensitive data at rest
- **TLS 1.3** for all data in transit
- **Field-level encryption** for PII and API keys
- **Encrypted database connections** with SSL/TLS

#### **Security Features**
- **Role-based access control** with tenant isolation
- **Comprehensive audit logging** for all data access
- **Secure key management** with environment-based secrets
- **Multi-layer security** with encryption at every level

#### **Compliance & Standards**
- **SOC 2 Type II** ready
- **GDPR compliant** with data protection measures
- **HIPAA ready** for healthcare applications
- **ISO 27001** security standards alignment

For detailed security information, see our [Security & Encryption Guide](security.md).

## Advanced Features

### What is Human-in-the-Loop validation?
For uncertain cases, PrecogX escalates to human review:
- **Manual Approval**: Human validation of uncertain threats
- **Team Collaboration**: Multiple reviewers can participate
- **Approval Workflows**: Customizable review processes
- **Audit Trail**: Complete validation history

### How do advanced AI modules work?
Advanced modules provide deeper analysis:
- **LM Judge**: Contextual threat assessment
- **Multi-model Analysis**: Multiple AI models for validation
- **Complex Pattern Recognition**: Sophisticated threat detection
- **Explainable AI**: Human-readable threat explanations

### What are the notification options?
- **Email**: Standard email alerts
- **Slack**: Real-time channel notifications
- **Microsoft Teams**: Direct team integration
- **Webhooks**: Custom endpoint integration
- **Digest Mode**: Grouped notifications to reduce noise

### Can I integrate with my existing security tools?
Yes, via:
- **Webhooks**: Send alerts to any system
- **API Integration**: Direct API connections
- **SIEM Integration**: Splunk, ELK, etc.
- **Custom Connectors**: Build your own integrations

### How do I monitor multiple agents?
- **Agent Dashboard**: Overview of all agents
- **Trust Score Tracking**: Individual agent reliability
- **Detection Analytics**: Threat patterns across agents
- **Team Management**: Role-based access control

### What reporting is available?
- **Real-time Dashboards**: Live security metrics
- **Trust Score Reports**: Agent reliability trends
- **Detection Analytics**: Threat pattern analysis
- **Custom Reports**: Build your own analytics
- **Export Options**: CSV, JSON, PDF formats

## Support & Community

### How do I get support?
- **Documentation**: [precogx.ai/docs](https://precogx.ai/docs)
- **Email Support**: support@precogx.ai
- **Community Forum**: [precogx.ai/community](https://precogx.ai/community)
- **Priority Support**: Business+ plans

### What training resources are available?
- **Quick Start Guide**: Get up and running in 5 minutes
- **Video Tutorials**: Step-by-step walkthroughs
- **API Documentation**: Complete reference
- **Best Practices**: Security recommendations
- **Webinar training (Business+)**: Live training sessions

### Can I contribute to PrecogX?
Yes! We welcome contributions:
- **GitHub**: [github.com/precogxai](https://github.com/precogxai)
- **Documentation**: Help improve our docs
- **Community**: Share knowledge and best practices
- **Feedback**: Help shape product direction

### Where can I learn more?
- **Blog**: [precogx.ai/blog](https://precogx.ai/blog)
- **Webinars**: Monthly security webinars
- **Case Studies**: Real-world implementations
- **Research**: Latest AI security insights

## Enterprise Questions

### Do you offer enterprise features?
Yes, Enterprise plans include:
- **Custom Integrations**: Build specific connectors
- **Dedicated Support**: 24/7 priority support
- **SLA Guarantees**: Uptime and response commitments
- **Custom Training**: On-site or virtual training
- **Compliance Support**: SOC 2, GDPR, HIPAA

### What compliance certifications do you have?
- **SOC 2 Type II**: Security and availability
- **GDPR**: Data protection compliance
- **HIPAA**: Healthcare data protection
- **ISO 27001**: Information security management

### Can I deploy PrecogX on-premise?
Yes, Enterprise customers can deploy:
- **Private Cloud**: Dedicated infrastructure
- **On-Premise**: Self-hosted deployment
- **Hybrid**: Combination of cloud and on-premise

### What SLAs do you offer?
- **Uptime**: 99.9% availability
- **Response Time**: < 100ms API response
- **Support**: < 4 hour response time
- **Detection**: < 50ms threat detection

### Do you offer professional services?
Yes, including:
- **Implementation**: Custom deployment and setup
- **Training**: Team training and certification
- **Consulting**: Security strategy and best practices
- **Custom Development**: Specialized integrations

## Still have questions?

- **Email**: support@precogx.ai
- **Sales**: sales@precogx.ai
- **Enterprise**: enterprise@precogx.ai
- **Security**: security@precogx.ai
