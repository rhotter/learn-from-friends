import databases
import os
from dotenv import load_dotenv
from .models import metadata
import sqlalchemy

load_dotenv()  # Load environment variables from .env file

DATABASE_URL = os.getenv("DATABASE_URL")

database = databases.Database(DATABASE_URL, statement_cache_size=0)
engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)
