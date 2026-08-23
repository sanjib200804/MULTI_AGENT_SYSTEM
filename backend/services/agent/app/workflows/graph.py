from agents.image_analyzer_agent import image_analyzer
from agents.website_builder_agent import website_builder
from agents.pdf_rag_agent import pdf_rag
from agents.vision_agent import vision_agent
from agents.ppt_agent import ppt_agent
from agents.pdf_agent import pdf_agent
from agents.coding_agent import coding_agent
from agents.search_agent import search_agent
from agents.chat_agent import chat_agent
from langgraph.graph import StateGraph
from core.state import AgentState
from workflows.router_agent import router_agent
from langgraph.graph import START ,END


workflow = StateGraph(AgentState)

workflow.add_node('router',router_agent)
workflow.add_node('chat',chat_agent)
workflow.add_node('search',search_agent)
workflow.add_node('coding',coding_agent)
workflow.add_node('pdf' , pdf_agent)
workflow.add_node('ppt',ppt_agent)
workflow.add_node('vision',vision_agent)
workflow.add_node('pdfRag',pdf_rag)
workflow.add_node('website',website_builder)
workflow.add_node('imageAnalyzer',image_analyzer)

def router(state):

    match state.get("agent"):
        case "chat":
            return "chat"

        case "search":
            return "search"

        case "coding":
            return "coding"

        case "pdf":
            return "pdf"

        case "pdfRag":
            return "pdfRag"

        case "ppt":
            return "ppt"

        case "website":
            return "website"

        case "imageAnalyzer":
            return "imageAnalyzer"

        case "vision":
            return "vision"

        case _:
            return "chat"
                                                                                  
workflow.add_edge(START,'router')
workflow.add_conditional_edges('router',router,    {
        "chat": "chat",
        "search": "search",
        "coding": "coding",
        "pdf": "pdf",
        "pdfRag": "pdfRag",
        "ppt": "ppt",
        "website": "website",
        "imageAnalyzer": "imageAnalyzer",
        "vision": "vision",
    })
workflow.add_edge('search','chat')
workflow.add_edge('chat',END)
workflow.add_edge('coding',END)
workflow.add_edge('pdf',END)
workflow.add_edge('ppt',END)
workflow.add_edge('website',END)
workflow.add_edge('pdfRag',END)
workflow.add_edge('vision',END)
workflow.add_edge('imageAnalyzer',END)


graph = workflow.compile()

