from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base ,sessionmaker
from app.core.settings import settings


engine = create_engine(url=settings.DATABASE_URL)
Base = declarative_base()

local_session = sessionmaker(bind=engine)

def get_db():
    session = local_session()
    try:
        yield session
    finally:
        session.close()

            