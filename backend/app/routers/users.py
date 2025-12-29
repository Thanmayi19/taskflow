from fastapi import APIRouter, Depends
from ..dependencies import get_current_user
from ..models import User
from .. import schemas

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=schemas.UserPublic)
def read_me(current_user: User = Depends(get_current_user)):
    return current_user
