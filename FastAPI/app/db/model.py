from typing import Annotated

from sqlmodel import SQLModel, Field, Column
from sqlalchemy.dialects.postgresql import JSON

class FunFact(SQLModel, table=True):
    id: str = Field(primary_key=True)
    value: str = Field(index=True)
    categories: list[str] = Field(sa_column=Column(JSON))
    icon_url: str
    created_at: str
    updated_at: str