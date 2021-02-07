from .db import db, Column
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class UserPhoto(db.Model, UserMixin):
    __tablename__ = 'userPhotos'

    id = db.Column(db.Integer, primary_key=True)
    userAccountId = db.Column(db.Integer, nullable=False)
    details = db.Column(db.String(100), nullable=False)
