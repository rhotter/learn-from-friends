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

people = sqlalchemy.Table(
    "people",
    metadata,
    sqlalchemy.Column("person_id", sqlalchemy.Integer, primary_key=True, index=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("experiment_id", sqlalchemy.Integer),
)

experiment_topics = sqlalchemy.Table(
    "experiment_topics",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, index=True),
    sqlalchemy.Column("experiment_id", sqlalchemy.Integer),
    sqlalchemy.Column(
        "person_id", sqlalchemy.Integer, sqlalchemy.ForeignKey("people.person_id")
    ),
    sqlalchemy.Column("topic", sqlalchemy.String),
    sqlalchemy.Column("submitted_time", sqlalchemy.DateTime, default=datetime.utcnow),
)

engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)


class Person(BaseModel):
    person_id: int
    name: str
    experiment_id: int


class ExperimentTopicIn(BaseModel):
    experiment_id: int
    name: str
    topic: str


class ExperimentTopic(BaseModel):
    id: int
    experiment_id: int
    person_id: int
    name: str  # person's name
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
async def read_experiment_topics(experiment_id: int):
    query = (
        sqlalchemy.select(
            [
                experiment_topics.c.id,
                experiment_topics.c.experiment_id,
                experiment_topics.c.person_id,
                people.c.name,
                experiment_topics.c.topic,
                experiment_topics.c.submitted_time,
            ]
        )
        .select_from(experiment_topics.join(people))
        .where(experiment_topics.c.experiment_id == experiment_id)
    )

    return await database.fetch_all(query)


@app.post("/api/experiment_topics", response_model=ExperimentTopic)
async def create_experiment_topic(experiment_topic: ExperimentTopicIn):
    # create a new person for each new experiment topic
    query = people.insert().values(
        name=experiment_topic.name,
        experiment_id=experiment_topic.experiment_id,
    )
    person_id = await database.execute(query)

    submitted_time = datetime.utcnow()
    query = experiment_topics.insert().values(
        experiment_id=experiment_topic.experiment_id,
        person_id=person_id,
        topic=experiment_topic.topic,
        submitted_time=submitted_time,
    )
    last_record_id = await database.execute(query)
    return {
        "id": last_record_id,
        "experiment_id": experiment_topic.experiment_id,
        "person_id": person_id,
        "name": experiment_topic.name,
        "topic": experiment_topic.topic,
        "submitted_time": submitted_time,
    }


@app.get("/api/experiment_people", response_model=List[Person])
async def get_experiment_people(experiment_id: int):
    query = people.select().where(people.c.experiment_id == experiment_id)
    return await database.fetch_all(query)


@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}
