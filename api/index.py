from typing import List
import databases
import sqlalchemy
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

# environment variables
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file


DATABASE_URL = os.getenv("DATABASE_URL")

database = databases.Database(DATABASE_URL, statement_cache_size=0)
metadata = sqlalchemy.MetaData()

experiment_topics = sqlalchemy.Table(
    "experiment_topics",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, index=True),
    sqlalchemy.Column("experiment_id", sqlalchemy.Integer),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("topic", sqlalchemy.String),
    sqlalchemy.Column("submitted_time", sqlalchemy.DateTime, default=datetime.utcnow),
)

engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)


class ExperimentTopicIn(BaseModel):
    experiment_id: int
    name: str
    topic: str


class ExperimentTopic(BaseModel):
    id: int
    experiment_id: int
    name: str
    topic: str
    submitted_time: datetime


app = FastAPI()


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/api/experiment_topics", response_model=List[ExperimentTopic])
async def read_experiment_topics():
    query = experiment_topics.select()
    return await database.fetch_all(query)


@app.post("/api/experiment_topics", response_model=ExperimentTopic)
async def create_experiment_topic(experiment_topic: ExperimentTopicIn):
    submitted_time = datetime.utcnow()
    query = experiment_topics.insert().values(
        experiment_id=experiment_topic.experiment_id,
        name=experiment_topic.name,
        topic=experiment_topic.topic,
        submitted_time=submitted_time,
    )
    last_record_id = await database.execute(query)
    return {
        **experiment_topic.dict(),
        "id": last_record_id,
        "submitted_time": submitted_time,
    }


@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}
