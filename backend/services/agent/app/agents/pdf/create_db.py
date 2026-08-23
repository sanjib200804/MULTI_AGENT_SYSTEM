import os
from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_mistralai import MistralAIEmbeddings

load_dotenv()

MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")

if not MISTRAL_API_KEY:
    raise RuntimeError("MISTRAL_API_KEY is not configured")


embedding = MistralAIEmbeddings(
    model="mistral-embed",
    mistral_api_key=MISTRAL_API_KEY
)


def build_retriever(path: str):

    # 1. Load PDF
    loader = PyPDFLoader(path)
    docs = loader.load()

    if not docs:
        raise ValueError("PDF contains no readable text")

    # 2. Split text
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            ""
        ]
    )

    chunks = splitter.split_documents(docs)

    if not chunks:
        raise ValueError("No chunks were created from PDF")

    print(f"Pages: {len(docs)}")
    print(f"Chunks: {len(chunks)}")

    # 3. Create FAISS vector store
    vector_storage = FAISS.from_documents(
        documents=chunks,
        embedding=embedding
    )

    # 4. Create retriever
    retriever = vector_storage.as_retriever(
        search_kwargs={
            "k": 4
        }
    )

    return retriever