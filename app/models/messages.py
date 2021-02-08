from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    userAccountId = db.Column(db.Integer, nullable=False)
    timeStarted = db.Column(db.DateTime, nullable=False, unique=True)
    timeClosed = db.Column(db.DateTime, nullable=False)
    userAccountId2 = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userAccountId": self.userAccountId,
            "timeStarted": self.timeStarted,
            "timeClosed": self.timeClosed,
            "userAccountId2": self.userAccountId2,
        }


# Query the matched messages table where userAccountId == currentuserId
# include user to dict on second id to provide information on sender
# Make that a link that pulls up the conversation with that matchedmessagesId
# Sort via timestamp