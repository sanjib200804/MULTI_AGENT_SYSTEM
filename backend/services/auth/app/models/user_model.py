from sqlalchemy import Column ,String ,Integer , Boolean , DateTime
from datetime import datetime, timezone
from app.database.database import Base

class UserModel(Base):
    __tablename__ = 'users'
    id = Column(Integer,primary_key=True ,index=True)
    fullname = Column(String)
    email = Column(String , unique=True, nullable=True, index=True)
    firebase_id = Column(String , nullable=False , unique= True , index=True)
    avatar = Column(String,index=True)
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )