from sqlalchemy.orm import session 
from app.models.user_model import UserModel
from app.schemas.user_schema import UserCreate


class UserRepository:
    def __init__(self , db : session):
        self.db = db


    def create(self , user_data : UserCreate) -> UserModel:
        user = UserModel(
            fullname = user_data.fullname,
            email = user_data.email,
            firebase_id = user_data.firebase_id,
            avatar = user_data.avatar
        )   

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
    def get_by_email(self, email : str)-> UserModel | None:
        return (
            self.db.query(UserModel).filter(UserModel.email == email).first()
        )

    def get_by_firebase_id(self , firebase_id : str)  -> UserModel | None:
            return (
            self.db.query(UserModel).filter(UserModel.firebase_id == firebase_id).first()
        )
    def get_by_id(self, user_id : int) -> UserModel | None:
         return (
              self.db.query(UserModel).filter(UserModel.id == user_id).first()
         )
    

