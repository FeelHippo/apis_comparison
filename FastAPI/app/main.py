import json
from fastapi import FastAPI, Response
from app.context.manager import lifespan
from app.routers import fun_facts

app = FastAPI(lifespan=lifespan)

app.include_router(fun_facts.router)

@app.get("/", tags=["health"])
def health_check():
    return Response(status_code=200)