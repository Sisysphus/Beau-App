from .db import db


class Swipe(db.Model):
    __tablename__ = 'swipes'

    id = db.Column(db.Integer, primary_key=True)
    userId1 = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    userId2 = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user1swipedRight = db.Column(db.Boolean, nullable=False)
    user2swipedRight = db.Column(db.Boolean, nullable=False, default=False)
    user1 = db.relationship(
        "User", foreign_keys="Swipe.userId1"
    )
    user2 = db.relationship(
        "User", foreign_keys="Swipe.userId2"
    )

    def to_dict(self):
        return {
            "userId1": self.userId1,
            "userId2": self.userId2,
            "user1swipedRight": self.user1swipedRight,
            "user2swipedRight": self.user2swipedRight
        }
