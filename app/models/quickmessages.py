from .db import db
from .user import User

class QuickMessages(db.Model):
    __tablename__ = 'quickmessages'

    id = db.Column(db.Integer, primary_key=True)
    user_Id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipient = db.Column(db.String(200), nullable=False)
    message = db.Column(db.String(200), nullable=False)

    users = db.relationship("User", back_populates = "quickmessages",)

    def __init__(self, user_Id, recipient, message):
        self.user_Id = user_Id
        self.recipient = recipient
        self.message = message


    def to_dict(self):
        return {
            "id": self.id,
            "user_Id": self.user_Id,
            "recipient": self.recipient,
            "message": self.message,
            
        }
        