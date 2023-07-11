import sqlalchemy
from sqlalchemy import MetaData
from datetime import datetime

metadata = MetaData()

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
