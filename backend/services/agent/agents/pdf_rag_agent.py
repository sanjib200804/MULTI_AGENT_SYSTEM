import os
import uuid

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader

from core.state import AgentState
from config.vectorDB import vector_store
from config.llmModels import get_llm_model

from utils.agent_limit import checkAgentLimit
from utils.deduct_credits import deduct_credits


async def pdf_rag(state: AgentState):

    try:
        # -----------------------------
        # CHECK AGENT LIMIT
        # -----------------------------

        await checkAgentLimit(
            state.user_id,
            "pdf"
        )

        # -----------------------------
        # PDF PATH
        # -----------------------------

        file_path = state.file["path"]

        # -----------------------------
        # LOAD PDF
        # -----------------------------

        loader = PyPDFLoader(file_path)

        docs = await loader.aload()

        # -----------------------------
        # TEXT SPLITTER
        # -----------------------------

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

        chunks = splitter.split_documents(docs)

        # -----------------------------
        # COLLECTION NAME
        # -----------------------------

        collection_name = f"pdf-{uuid.uuid4()}"

        # -----------------------------
        # CREATE QDRANT VECTOR STORE
        # -----------------------------

        store = await vector_store(
            chunks,
            collection_name
        )

        # -----------------------------
        # SIMILARITY SEARCH
        # -----------------------------

        relevant_docs = await store.asimilarity_search(
            state.prompt,
            k=5
        )

        # -----------------------------
        # CREATE CONTEXT
        # -----------------------------

        context = "\n\n".join(
            doc.page_content
            for doc in relevant_docs
        )

        # -----------------------------
        # GET PDF MODEL
        # -----------------------------

        llm = await get_llm_model("pdf-rag")

        # -----------------------------
        # PROMPT
        # -----------------------------

        messages = [

            SystemMessage(
                content="""
You are CortexAI PDF Assistant.

Rules:

- Answer ONLY from the uploaded PDF.
- Never make up information.
- If the answer is not present in the PDF, reply:

"I couldn't find this information in the uploaded PDF."

- Use Markdown formatting.
"""
            ),

            HumanMessage(
                content=f"""
Context:

{context}

Question:

{state.prompt}
"""
            )
        ]

        # -----------------------------
        # LLM
        # -----------------------------

        response = await llm.ainvoke(messages)

        # -----------------------------
        # DEDUCT CREDITS
        # -----------------------------

        await deduct_credits(
            state.user_id,
            "pdf"
        )

        return {
            **state,
            "ai_response": response.content
        }

    except Exception as error:

        print(f"PDF RAG Error: {error}")

        return {
            **state,
            "ai_response": "Failed to analyze PDF"
        }

    finally:

        # -----------------------------
        # DELETE LOCAL PDF
        # -----------------------------

        try:

            if state.file and os.path.exists(
                state.file["path"]
            ):
                os.remove(
                    state.file["path"]
                )

        except Exception as cleanup_error:

            print(
                f"PDF cleanup error: {cleanup_error}"
            )