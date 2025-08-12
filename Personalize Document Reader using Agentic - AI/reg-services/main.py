from fastapi import FastAPI, Request
from pydantic import BaseModel
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
import os

app = FastAPI()

# Use a global retriever so it's ready after file upload
retriever = None


class UploadRequest(BaseModel):
    file_path: str


class AskRequest(BaseModel):
    question: str


@app.post("/upload")
async def upload_file(req: UploadRequest):
    global retriever

    file_path = req.file_path
    print("📄 Python received file path:", file_path)

    # 1. Load document
    loader = PyMuPDFLoader(file_path)
    docs = loader.load()
    print(f"✅ Loaded {len(docs)} chunks")

    # 2. Create embeddings
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    # 3. Create vectorstore
    vectordb = Chroma.from_documents(docs, embeddings, persist_directory="./chroma_db")
    vectordb.persist()

    # 4. Set retriever globally
    retriever = vectordb.as_retriever()
    print("✅ Vector DB created and retriever initialized.")

    return {"message": f"✅ File indexed successfully: {os.path.basename(file_path)}"}


@app.post("/ask")
async def ask(req: AskRequest):
    global retriever

    if retriever is None:
        return {"error": "Please upload a PDF first."}

    print("❓ Question received:", req.question)

    # 5. Use Ollama LLM
    llm = Ollama(model="llama3")

    # 6. Create Retrieval QA chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=False
    )

    answer = qa_chain.run(req.question)

    print("💬 Answer:", answer)
    return {"answer": answer}
