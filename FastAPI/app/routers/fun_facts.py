from fastapi import APIRouter, Depends, HTTPException, Request
from app.dependencies import get_token_header
from pydantic import BaseModel
from app.dependencies import SessionDep
from app.db.model import FunFact

router = APIRouter(
    prefix="/fun-fact",
    tags=["fun-fact"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=FunFact)
async def read_fun_fact(request: Request):
    api_client = request.app.api_client
    response = await api_client.get('https://api.chucknorris.io/jokes/random/')
    return FunFact(
        id=response.json()['id'],
        categories=response.json()['categories'],
        icon_url=response.json()['icon_url'],
        created_at=response.json()['created_at'],
        updated_at=response.json()['updated_at'],
        value=response.json()['value']
    )

@router.post("/", tags=["fun_facts"], status_code=201)
async def create_fun_fact(fun_fact: FunFact, session: SessionDep):
    session.add(fun_fact)
    session.commit()
    session.refresh(fun_fact)
    return fun_fact