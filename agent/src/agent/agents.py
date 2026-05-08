from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import END, START, StateGraph

from .nodes import ChatState, chart_responder, chat_responder, intent_classifier


def build_graph():
    g = StateGraph(ChatState)

    g.add_node("intent_classifier", intent_classifier)
    g.add_node("chart_responder", chart_responder)
    g.add_node("chat_responder", chat_responder)

    g.add_edge(START, "intent_classifier")
    g.add_conditional_edges(
        "intent_classifier",
        lambda s: s["intent"],
        {"chart": "chart_responder", "chat": "chat_responder"},
    )
    g.add_edge("chart_responder", END)
    g.add_edge("chat_responder", END)

    return g.compile(checkpointer=InMemorySaver())
