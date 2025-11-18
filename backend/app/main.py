from fastapi import FastAPI

from . import models
from .database import engine
from .routers import projects, tasks

# Create tables in the database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskFlow API",
    description="Simple task & project manager (Week 1 backend)",
    version="0.1.0",
)


@app.get("/")
def read_root():
    return {"message": "TaskFlow backend is running"}


# Include routers
app.include_router(projects.router)
app.include_router(tasks.router)
