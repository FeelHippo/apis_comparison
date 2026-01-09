import httpx
from fastapi import FastAPI
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.api_client = httpx.AsyncClient()
    yield
    await app.api_client.aclose()