from config.llmModels import get_llm_model

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

        if content_type == 'application/pdf':
            return {
                **state,
                "agent": 'pdfRag'
            }
        if content_type.startswith('image/'):
            return {
                **state,
                'agent': 'imageAnalyzer'
            } 
    llm = await get_llm_model('router') 

    prompt = f"""
You are an agent router.

Available agents:

- chat
- search
- coding
- pdf
- ppt
- vision
- website

Rules:

chat:
General conversation,
explanations,
learning,
questions.

search:
Current events,
latest information,
news,
recent developments,
internet lookup.

coding:
Generate code,
debug code,
review code,
explain code,
optimize code,
API design.

pdf:
Questions about uploaded PDF
or document context.

ppt:
Questions about generating presentations
or presentation context.

vision:
Generate images,
create images.

website:
Build websites,
generate landing pages,
HTML/CSS components.

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
    agent = response.content.strip().lower()
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
