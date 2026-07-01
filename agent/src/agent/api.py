from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from langchain_core.messages import HumanMessage

import os

if os.getenv("PHOENIX_TRACING", "false").lower() == "true":
    from phoenix.otel import register
    from openinference.instrumentation.langchain import LangChainInstrumentor
    register(endpoint=os.getenv("PHOENIX_ENDPOINT", "http://phoenix-svc:4317"))
    LangChainInstrumentor().instrument()

from .agents import build_graph

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

graph = build_graph()

RESPONDER_NODES = {"chart_responder", "chat_responder"}


@app.post("/stream")
async def stream(request: Request):
    body = await request.json()
    chat_id: str = body["chatId"]
    message: str = body["message"]

    async def generator():
        async for event in graph.astream_events(
            {"messages": [HumanMessage(content=message)], "user_query": message, "intent": None},
            version="v2",
            config={"configurable": {"thread_id": chat_id}},
        ):
            if (
                event["event"] == "on_chat_model_stream"
                and event.get("metadata", {}).get("langgraph_node") in RESPONDER_NODES
            ):
                chunk = event["data"]["chunk"]
                content = chunk.content
                if isinstance(content, str) and content:
                    yield f"data: {content}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive"},
    )
