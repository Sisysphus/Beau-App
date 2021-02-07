from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Message(db.Model, UserMixin):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    userAccountId = db.Column(db.Integer, nullable=False, unique=True)
    timeStarted = db.Column(db.DateTime, nullable=False, unique=True)
    timeClosed = db.Column(db.DateTime, nullable=False)
    userAccountId2 = db.Column(db.Integer, nullable=False, unique=True)
