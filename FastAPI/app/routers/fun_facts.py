from fastapi import APIRouter, Depends, HTTPException, Request
from app.dependencies import get_token_header
from pydantic import BaseModel

router = APIRouter(
    prefix="/fun-fact",
    tags=["fun-fact"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

# https://ssojet.com/serialize-and-deserialize/serialize-and-deserialize-json-in-fastapi/#defining-data-models-with-pydantic
class FunFact(BaseModel):
    id: str
    categories: list
    icon_url: str
    created_at: str
    updated_at: str
    value: str

@router.get("/", response_model=FunFact)
async def fetch_fun_fact(request: Request):
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

@router.get("/items/{item_id}", tags=["fun_facts"])
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}