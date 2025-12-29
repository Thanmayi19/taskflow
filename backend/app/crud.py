from sqlalchemy.orm import Session

from . import models, schemas
from .auth import hash_password


# ---------- User CRUD ----------
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        email=user.email,
        hashed_password=hash_password(user.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# ---------- Project CRUD (scoped to user) ----------
def get_projects(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Project)
        .filter(models.Project.owner_id == owner_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_project(db: Session, owner_id: int, project_id: int):
    return (
        db.query(models.Project)
        .filter(models.Project.owner_id == owner_id, models.Project.id == project_id)
        .first()
    )


def create_project(db: Session, owner_id: int, project: schemas.ProjectCreate):
    db_project = models.Project(
        name=project.name,
        description=project.description,
        owner_id=owner_id,
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def update_project(db: Session, owner_id: int, project_id: int, project_update: schemas.ProjectUpdate):
    db_project = get_project(db, owner_id, project_id)
    if not db_project:
        return None

    update_data = project_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)

    db.commit()
    db.refresh(db_project)
    return db_project


def delete_project(db: Session, owner_id: int, project_id: int):
    db_project = get_project(db, owner_id, project_id)
    if not db_project:
        return None
    db.delete(db_project)
    db.commit()
    return db_project


# ---------- Task CRUD (via owner->project ownership) ----------
def get_tasks(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Task)
        .join(models.Project)
        .filter(models.Project.owner_id == owner_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_task(db: Session, owner_id: int, task_id: int):
    return (
        db.query(models.Task)
        .join(models.Project)
        .filter(models.Project.owner_id == owner_id, models.Task.id == task_id)
        .first()
    )


def create_task(db: Session, owner_id: int, task: schemas.TaskCreate):
    # ensure the project belongs to the user
    project = get_project(db, owner_id, task.project_id)
    if not project:
        return None

    db_task = models.Task(
        title=task.title,
        description=task.description,
        is_completed=task.is_completed,
        project_id=task.project_id,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task(db: Session, owner_id: int, task_id: int, task_update: schemas.TaskUpdate):
    db_task = get_task(db, owner_id, task_id)
    if not db_task:
        return None

    update_data = task_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, owner_id: int, task_id: int):
    db_task = get_task(db, owner_id, task_id)
    if not db_task:
        return None
    db.delete(db_task)
    db.commit()
    return db_task
