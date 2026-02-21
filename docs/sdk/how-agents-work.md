---
sidebar_position: 1
title: How Agents & API Keys Work
---

# How Agents & API Keys Work

Understanding the relationship between API keys and agent IDs is essential for correctly integrating PrecogX.

## One API Key, Many Agents

Your **API key** authenticates your entire organization — not an individual agent. All agents in your org share the same `PRECOGX_API_KEY` environment variable.

You can create **multiple API keys** per org, which is useful for separating environments:

| Environment | API Key |
|-------------|---------|
| Production  | `px_live_abc...` |
| Staging     | `px_live_def...` |
| Development | `px_live_ghi...` |

---

## The `agent_id` Field

Each agent identifies itself with a unique `agent_id` string inside every telemetry payload. This is how PrecogX distinguishes individual agents within your org.

```python
import httpx

# Agent 1 — bank support bot
httpx.post(
    "https://api.precogx.ai/api/v1/telemetry/ingest",
    headers={"x-api-key": "px_live_YOUR_KEY"},
    json={
        "agent_id": "customer-service-bot",   # <-- identifies this agent
        "prompt": "What's my balance?",
        "response": "Your balance is $3,420.",
    }
)

# Agent 2 — different agent, same API key
httpx.post(
    "https://api.precogx.ai/api/v1/telemetry/ingest",
    headers={"x-api-key": "px_live_YOUR_KEY"},  # same key
    json={
        "agent_id": "sales-assistant",          # different agent_id
        "prompt": "Can you book a demo?",
        "response": "Sure, I'll schedule that for you.",
    }
)
```

PrecogX uses `agent_id` to:
- Group telemetry events by agent in the dashboard
- Calculate per-agent trust scores and risk trends
- Apply per-agent detection thresholds
- Count toward your plan's agent limit

---

## Plan Limits

Your plan controls how many **unique `agent_id` strings** can be active:

| Plan | Max Unique Agents | Impact Events / month |
|------|------------------|----------------------|
| FREE | 1 | 100 |
| PROFESSIONAL | 10 | 2,000 |
| BUSINESS | 30 | 10,000 |
| ENTERPRISE | Unlimited | Unlimited |

:::info What counts as an "impact event"?
Impact events are meaningful security moments: a threat detected, a threat prevented, an interaction sent to the Human Validation Queue, or a significant trust score change. Normal clean interactions do **not** count against your monthly limit.
:::

---

## What Happens When You Hit the Agent Limit

If you send telemetry using a new `agent_id` that would exceed your plan's limit, the API returns:

```
HTTP 403 Forbidden
{
  "detail": "Agent limit reached for your plan. Please upgrade your plan to connect additional agents."
}
```

Handle this gracefully in your SDK wrapper — log a warning and skip the telemetry call rather than crashing your agent.

---

## Best Practices

**Use descriptive, consistent names**
```python
# Good
agent_id = "support-bot-prod"
agent_id = "invoice-processor-v2"

# Avoid
agent_id = "agent1"
agent_id = str(uuid.uuid4())   # generates new ID every run!
```

**Separate environments with separate IDs**

`"chatbot-prod"` and `"chatbot-staging"` are counted as two distinct agents toward your limit. If you're on FREE tier (1 agent), use the same `agent_id` for dev and prod, or upgrade.

**Deactivate agents you no longer use**

Stopping use of an `agent_id` does **not** automatically remove it from your count. Go to the PrecogX dashboard → Agents, and deactivate any agents you've retired to free up slots.
