from typing import Annotated, Literal
from typing_extensions import TypedDict

from langchain_anthropic import ChatAnthropic
from langchain_core.messages import AnyMessage, HumanMessage, SystemMessage
from langgraph.graph.message import add_messages

from .config import MODEL_NAME, TEMPERATURE


class ChatState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]
    user_query: str | None
    intent: Literal["chart", "chat"] | None


INTENT_PROMPT = (
    "You are an intent classifier. The user sent a message. "
    "Classify whether they want to see a chart, graph, or data visualization — or just want to chat. "
    "Respond with exactly one word: either 'chart' or 'chat'. No other output."
)

CHART_PROMPT = (
    "You are a helpful data visualization assistant for a sales analytics app. "
    "The user is asking about charts, graphs, or data. "
    "Briefly explain what you'd show them, describe trends you'd expect in sales data, "
    "or help them interpret a visualization."
)

CHAT_PROMPT = (
    "You are a helpful assistant for a sales analytics application. "
    "Answer the user conversationally and helpfully."
)


async def intent_classifier(state: ChatState) -> dict:
    llm = ChatAnthropic(model=MODEL_NAME, temperature=TEMPERATURE)
    query = state["user_query"] or ""
    response = await llm.ainvoke([
        SystemMessage(content=INTENT_PROMPT),
        HumanMessage(content=query),
    ])
    word = response.content.strip().lower()
    intent: Literal["chart", "chat"] = "chart" if "chart" in word else "chat"
    return {"intent": intent}


async def chart_responder(state: ChatState) -> dict:
    llm = ChatAnthropic(model=MODEL_NAME, temperature=TEMPERATURE)
    messages = [SystemMessage(content=CHART_PROMPT)] + list(state["messages"])
    response = await llm.ainvoke(messages)
    return {"messages": [response]}


async def chat_responder(state: ChatState) -> dict:
    llm = ChatAnthropic(model=MODEL_NAME, temperature=TEMPERATURE)
    messages = [SystemMessage(content=CHAT_PROMPT)] + list(state["messages"])
    response = await llm.ainvoke(messages)
    return {"messages": [response]}
