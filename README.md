# chatviz

> Upload your data. Ask questions. Get charts.

The goal is simple: you drop a CSV, chat with an AI agent about it, and the agent responds with plain-English answers **and** interactive visualizations — histograms, scatter plots, distribution charts — rendered in real time. Think of it as a conversational EDA (exploratory data analysis) tool.

## Vision

```
User uploads dataset
       ↓
"What's the distribution of sales by region?"
       ↓
Agent runs pandas tools (describe, value_counts, groupby…)
       ↓
Streams text answer + emits Plotly chart spec
       ↓
Frontend renders interactive chart
```

**Current state:** early prototype. Streaming chat works end-to-end. Charts are mocked (static sales data). The EDA tools and dynamic chart generation are next.

## Structure

```
chatviz/
  front/    Next.js 16 chat UI + viz panel          → front/README.md
  agent/    Python LangGraph backend (active)       → agent/README.md
  api/      Express + Redis playground (learning)   → api/README.md
```

## Quick start

Start the agent:

```bash
cd agent && uv sync && uv run agent    # http://localhost:8000
```

Start the frontend:

```bash
cd front && npm install && npm run dev:agent    # http://localhost:3000
```
