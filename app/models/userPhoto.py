from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class UserPhoto(db.Model):
    __tablename__ = 'userPhotos'

    id = db.Column(db.Integer, primary_key=True)
    userAccountId = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    user = db.relationship(
        "User", foreign_keys="UserPhoto.userAccountId"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "userAccountId": self.userAccountId,
            "url": self.url

        }

# When they upload a photo, create a new user photo instance
# With their useraccountId and the URL.

# input type file upload button with label and input display of none


# Have a messages button and link to it
