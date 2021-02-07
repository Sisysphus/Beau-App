from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class UserPhoto(db.Model):
    __tablename__ = 'userPhotos'

    id = db.Column(db.Integer, primary_key=True)
    userAccountId = db.Column(db.Integer, nullable=False)
    details = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userAccountId": self.userAccountId,
            "details": self.details
        }
