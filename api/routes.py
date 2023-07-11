from typing import List
from fastapi import APIRouter
from .schemas import ExperimentTopicIn, ExperimentTopic, Person
from .models import people, experiment_topics
from .database import database
import sqlalchemy
from datetime import datetime

router = APIRouter()


@router.get("/api/experiment_topics", response_model=List[ExperimentTopic])
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


@router.post("/api/experiment_topics", response_model=ExperimentTopic)
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


@router.get("/api/experiment_people", response_model=List[Person])
async def get_experiment_people(experiment_id: int):
    query = people.select().where(people.c.experiment_id == experiment_id)
    return await database.fetch_all(query)


@router.get("/api/python")
def hello_world():
    return {"message": "Hello World"}
