import json
import re
import uuid

from core.state import AgentState
from config.llmModels import get_llm_model
from utils.agent_limit import check_agent_limit
from utils.deduct_credits import deduct_credits


def extract_json_string(text: str) -> str:
    start = text.find('{')
    end = text.rfind('}')
    if start != -1 and end != -1 and end > start:
        return text[start:end + 1]
    return text


def extract_html_fallback(raw_text: str) -> str:
    match = re.search(r'"content"\s*:\s*"(.*)', raw_text, re.DOTALL)
    if match:
        html_raw = match.group(1)
        html_raw = re.sub(r'"\s*\}\s*\]?\s*\}?\s*$', '', html_raw)
        html_clean = html_raw.replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
        return html_clean
    return raw_text


async def website_builder(state: AgentState):

    try:
        await check_agent_limit(
            state["user_id"],
            "website"
        )

        llm = await get_llm_model("website")

        prompt = f"""
You are CortexAI Website Builder.

Generate a complete, fully functional, responsive website for the user's request.

Default stack:
- HTML
- CSS
- JavaScript

Use React / Next.js / Vue ONLY if explicitly requested.

Rules:

- Fully Responsive layout
- Modern UI with vibrant design, subtle gradients, and smooth scrolling
- Flexbox/Grid layouts
- Interactive hover effects
- Clean semantic HTML5
- Include high quality real Unsplash image URLs for all images

Return ONLY valid JSON.

Schema:

{{
    "files": [
        {{
            "name": "index.html",
            "content": "..."
        }},
        {{
            "name": "style.css",
            "content": "..."
        }},
        {{
            "name": "script.js",
            "content": "..."
        }}
    ]
}}

Rules:
- Return ONLY valid JSON starting with {{ and ending with }}
- No markdown wrappers outside JSON if possible
- No extra text

User Request:
{state["prompt"]}
"""

        response = await llm.ainvoke(prompt)
        raw_content = response.content if isinstance(response.content, str) else str(response.content)
        json_str = extract_json_string(raw_content)

        try:
            data = json.loads(json_str)
        except Exception as parse_err:
            print(f"Website Builder JSON parse fallback error: {parse_err}. Extracting HTML content...")
            clean_html = extract_html_fallback(raw_content)
            data = {
                "files": [
                    {
                        "name": "index.html",
                        "content": clean_html
                    }
                ]
            }

        files_list = data.get("files", [])
        if not files_list:
            files_list = [{"name": "index.html", "content": raw_content}]

        await deduct_credits(
            state["user_id"],
            "website"
        )

        return {
            **state,
            "ai_response": "Website Generated Successfully.",
            "artifacts": [
                {
                    "id": str(uuid.uuid4()),
                    "type": "Website",
                    "files": files_list,
                    "title": state.get("prompt", "Generated Website")
                }
            ]
        }

    except Exception as error:

        print(f"Website Builder Error: {error}")

        return {
            **state,
            "ai_response": "Failed to generate website",
            "artifacts": []
        }