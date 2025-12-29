from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import projects, tasks, auth
from .routers import projects, tasks, auth, users
from . import models
from .database import engine
from .routers import projects, tasks
import os

# Create tables in the database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskFlow API",
    description="Simple task & project manager (Week 1 backend)",
    version="0.1.0",
)


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
frontend_origin = os.getenv("FRONTEND_ORIGIN")
if frontend_origin:
    origins.append(frontend_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # or ["*"] during dev if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "TaskFlow backend is running"}

# Include routers
app.include_router(projects.router)
app.include_router(tasks.router)
app.include_router(auth.router)
app.include_router(users.router)
