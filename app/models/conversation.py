from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    matchedMessagessId = db.Column(db.Integer, nullable=False, unique=True)
    messageText = db.Column(db.String(255), nullable=False, unique=True)
    whichUser = db.Column(db.Boolean, nullable=False)
    timeStamp = db.Column(db.timeStamp)
