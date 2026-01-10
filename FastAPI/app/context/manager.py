import httpx
from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.init import create_db_and_tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.api_client = httpx.AsyncClient()
    create_db_and_tables()
    yield
    await app.api_client.aclose()