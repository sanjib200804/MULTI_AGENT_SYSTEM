from langchain_qdrant import QdrantVectorStore
from config.embbedding_model import embedding_model
from core.settings import settings


async def vector_store(docs, collection_name: str):

    vector_store = await QdrantVectorStore.afrom_documents(
        documents=docs,
        embedding=embedding_model,
        url=settings.QDRANT_URL,
        collection_name=collection_name,
    )

    return vector_store