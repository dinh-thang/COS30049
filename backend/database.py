from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base


# replace 'user', 'password', 'localhost', 'dbname' with your own MySQL connection details
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'root'
MYSQL_HOST = 'localhost'
MYSQL_DB = 'cos30049'

engine = create_engine(f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# create tables if they do not exist in the db
Base.metadata.create_all(bind=engine)

