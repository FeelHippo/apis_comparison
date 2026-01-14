from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from pydantic import BaseModel
from typing import Optional
from sqlmodel import select

from app.dependencies import SessionDep, get_token_header
from app.db.model import FunFact, FunFactPublic, FunFactCreate, FunFactUpdate

class Operation(BaseModel):
    op: str # only "delete" and "update" allowed for now
    path: str # property name, e.g. "value", "categories", etc
    value: Optional[str | list[str]] = None # new value

class Operations(BaseModel):
    operations: list[Operation]

router = APIRouter(
    prefix="/fun-fact",
    tags=["fun-fact"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=FunFactPublic)
async def read_fun_fact(request: Request):
    api_client = request.app.api_client
    response = await api_client.get('https://api.chucknorris.io/jokes/random/')
    return FunFactPublic(
        id=response.json()['id'],
        categories=response.json()['categories'],
        icon_url=response.json()['icon_url'],
        created_at=response.json()['created_at'],
        updated_at=response.json()['updated_at'],
        value=response.json()['value']
    )

@router.post("/", status_code=201, response_model=FunFactPublic)
async def create_fun_fact(fun_fact: FunFactCreate, session: SessionDep):
    statement = select(FunFact).where(FunFact.value == fun_fact.value)
    row = session.exec(statement).first()
    if row:
        raise HTTPException(status_code=302, detail="Fun Fact Found on DB")
    new_row = FunFact.model_validate(fun_fact)
    session.add(new_row)
    session.commit()
    session.refresh(new_row)
    return new_row

@router.put('/{id}', status_code= 201 | 200, response_model=FunFactPublic)
async def upsert_fun_fact(id: str, fun_fact: FunFactUpdate, session: SessionDep):
    row = session.get(FunFact, id)
    if not row:
        new_row = FunFact.model_validate(fun_fact)
        new_row.id = id
        session.add(new_row)
        session.commit()
        session.refresh(new_row)
        json_compatible_item_data = jsonable_encoder(new_row)
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=json_compatible_item_data)
    else:
        fun_fact_data = fun_fact.model_dump(exclude_unset=True)
        row.sqlmodel_update(fun_fact_data)
        session.add(row)
        session.commit()
        session.refresh(row)
        json_compatible_item_data = jsonable_encoder(row)
        return JSONResponse(status_code=status.HTTP_200_OK, content=json_compatible_item_data)

@router.patch('/{id}', status_code= 200, response_model=FunFactPublic)
async def partially_modify_fun_fact(id: str, body: Operations, session: SessionDep):
    operations = body.operations
    row = session.get(FunFact, id)
    if not row:
        raise HTTPException(status_code=404, detail="Fun Fact Not Found on DB")
    for operation in operations:
        if operation.op == "delete":
            setattr(row, operation.path, None)
        elif operation.op == "update":
            setattr(row, operation.path, operation.value)
    session.add(row)
    session.commit()
    session.refresh(row)
    json_compatible_item_data = jsonable_encoder(row)
    return JSONResponse(status_code=status.HTTP_200_OK, content=json_compatible_item_data)

@router.delete('/{id}', status_code= 204)
async def remove_fun_fact(id: str, session: SessionDep):
    row = session.get(FunFact, id)
    if not row:
        raise HTTPException(status_code=404, detail="Fun Fact Not Found on DB")
    session.delete(row)
    session.commit()
    return {"ok": True}