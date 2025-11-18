from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict
from pydantic import Field


# ----- Task Schemas -----
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    is_completed: bool = False
    project_id: int


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None


class Task(TaskBase):
    id: int

    # Pydantic v2: replaces Config(orm_mode=True)
    model_config = ConfigDict(from_attributes=True)


# ----- Project Schemas -----
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class Project(ProjectBase):
    id: int
    created_at: datetime
    tasks: List[Task] = Field(default_factory=list)

    # Pydantic v2: replaces Config(orm_mode=True)
    model_config = ConfigDict(from_attributes=True)
