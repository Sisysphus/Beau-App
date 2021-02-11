from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstName = db.Column(db.String(40), nullable=False, unique=True)
    lastName = db.Column(db.String(255), nullable=True, unique=True)
    genderId = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.String(200), nullable=True)
    nickname = db.Column(db.String(200), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    photos = db.relationship(
        "UserPhoto", foreign_keys="UserPhoto.userAccountId")

# times you've swiped right
    swipe1 = db.relationship(
        "Swipe", foreign_keys="Swipe.userId1"
    )
# times you've been swiped right on
    swipe2 = db.relationship(
        "Swipe", foreign_keys="Swipe.userId2"

    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

# You can have multiple to_dict

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstName": self.firstName,
            "genderId": self.genderId,
            "photos": [photo.to_dict() for photo in self.photos],
            "profilePhoto": self.photos[0].to_dict() if len(self.photos) else {"url": None}
        }


# Brad Notes
# Add a boolean field to the messages for read/unread
# When user logs in query. Change boolean key from unread to read

# Ondelete button for messages
# Get all messages - map for access to messageId
# Have instructions on using the website
# Excel at Wiki!
