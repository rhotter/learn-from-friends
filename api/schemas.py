from pydantic import BaseModel
from datetime import datetime


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
