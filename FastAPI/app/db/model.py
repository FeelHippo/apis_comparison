from typing import Annotated, Optional
from datetime import datetime, timezone

from sqlmodel import SQLModel, Field, Column
from sqlalchemy.dialects.postgresql import JSON
from uuid import uuid4

class FunFactBase(SQLModel):
    value: str = Field(index=True)
    categories: list[str] = Field(sa_column=Column(JSON))
    icon_url: str | None = Field(default=None)

class FunFact(FunFactBase, table=True):
    id: str | None = Field(default=str(uuid4()), primary_key=True)
    created_at: Optional[datetime] = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: Optional[datetime] = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)},
    )

class FunFactPublic(FunFactBase):
    id: str

class FunFactCreate(FunFactBase):
    pass

class FunFactUpdate(SQLModel):
    value: str | None = None
    categories: list[str] | None = None
    icon_url: str | None = None