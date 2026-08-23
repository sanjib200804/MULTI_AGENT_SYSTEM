import os 
from dotenv import load_dotenv
load_dotenv()
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from download_pdf import download_pdf
from create_db import build_retriever

url = 'https://www.halvorsen.blog/documents/programming/python/resources/Python%20Programming.pdf'
path = download_pdf(url)
print(path)
retriever = build_retriever(path=path)
llm = ChatMistralAI(model=os.getenv('LLM_MODEL'),temperature=0.3,mistral_api_key=os.getenv("MISTRAL_API_KEY"))
prompt = ChatPromptTemplate.from_messages([
    (
        'system',
        '''
You are a helpful AI assistant.

Use only the provided context to answer the question.

If the answer is not present in the context,
say exactly:
"I could not find the answer in the document."
'''
    ),
    (
        'human',
        '''
Context:
{data}

Question:
{question}
'''
    )
])

while True:
    query = input('You:-')
    if query == '0':
        break
    docs = retriever.invoke(query)

    context = '\n\n'.join(
        [doc.page_content for doc in docs]
    )

    final_prompt = prompt.format_messages(
        data = context,
        question = query
    )

    result = llm.invoke(final_prompt)
    print(f'\n AI:{result.content}')
