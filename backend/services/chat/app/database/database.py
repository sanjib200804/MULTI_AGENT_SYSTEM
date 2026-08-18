from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base ,sessionmaker


engine = create_engine()
Base = declarative_base()

local_session = sessionmaker(bind=engine)

def get_db():
    session = local_session()
    try:
        yield session
    finally:
        session.close()

            