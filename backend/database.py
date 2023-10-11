# this file defines the database connection and session management

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
from sqlalchemy_utils import database_exists, create_database

from sqlalchemy.exc import OperationalError


# replace 'user', 'password', 'localhost' with your own MySQL connection details
# ! DB has been auto create if not exists
MYSQL_USER = "root"
MYSQL_PASSWORD = "root"
MYSQL_HOST = "localhost"
MYSQL_DB = "testresult"
MYSQL_DB_URL = f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}"

engine = create_engine(
    MYSQL_DB_URL,
)

# auto create database if not exists
if not database_exists(engine.url):
    create_database(engine.url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# create tables if they do not exist in the db
Base.metadata.create_all(bind=engine)

# dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

