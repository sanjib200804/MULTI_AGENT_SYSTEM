from config.llmModels import get_llm_model

def extract_text(content) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        text_parts = []
        for part in content:
            if isinstance(part, str):
                text_parts.append(part)
            elif isinstance(part, dict) and "text" in part:
                text_parts.append(str(part["text"]))
            elif hasattr(part, "text"):
                text_parts.append(str(getattr(part, "text", "")))
        return "\n".join(text_parts)
    return str(content) if content else ""

async def router_agent(state):
    agent_val = state.get('agent')
    if agent_val and agent_val != 'auto':
        file = state.get('file')
        content_type = file.get('content_type', '') if file else ''

        if agent_val == 'image':
            if content_type.startswith('image/'):
                target = 'imageAnalyzer'
            else:
                target = 'vision'
            return {**state, 'agent': target}

        if agent_val in ('pdfRag', 'pdf'):
            if content_type == 'application/pdf':
                target = 'pdfRag'
            else:
                target = 'pdf'
            return {**state, 'agent': target}

        return {
            **state,
            'agent': agent_val
        }

    file = state.get('file')
    if file:
        content_type = file.get('content_type', '')
        if content_type.startswith('image/'):
            return {**state, 'agent': 'imageAnalyzer'}
        if content_type == 'application/pdf':
            return {**state, 'agent': 'pdfRag'}

    llm = await get_llm_model('router')

    prompt = f"""
You are a router agent.

Select ONE agent for the prompt:

chat:
General conversation, QA, coding advice, basic explanations.

search:
Latest news, current facts, weather, live info.

coding:
Write complete code files, software projects, debugging, multi-file code.

pdf:
Generate PDF documents, reports, resume.

ppt:
Generate slide presentations, PowerPoint.

vision:
Generate images, AI art, diagrams, DALL-E, flux, stable diffusion, draw pictures, create images.

website:
Build websites, generate landing pages, HTML/CSS components.

Return ONLY one word:

chat
search
coding
pdf
ppt
vision
website

User Query:
{state.get('prompt')}
"""

    response = await llm.ainvoke(prompt)
    agent = extract_text(response.content).strip().lower()
    valid_agents = {
        "chat",
        "search",
        "coding",
        "pdf",
        "ppt",
        "vision",
        "website"
    }

    if agent not in valid_agents:
        agent = "chat"

    return {
        **state,
        "agent": agent
    }
