from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Swipe, db, UserPhoto, QuickMessages
user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# me allows me to stop a user from looking at another users & make login required

@user_routes.route('/me/swipes')
@login_required
def swipes():
    swipes = Swipe.query.filter(current_user.id == "userId1").all()

    return {"swipes": swipes}

# python dictionary keys have to be string


@user_routes.route('/me/swipes/<int:swipeId>')
@login_required
def swipers(swipeId):
    swipe = Swipe.query.get(swipeId)
    return swipe.to_dict() if swipe else {}


@user_routes.route('/me/swiped')
@login_required
def swipernoswiping():
    swipes = Swipe.query.filter(current_user.id == "userId1").all()
    return {"swipes": swipes}


@user_routes.route('/me', methods=['PATCH'])
@login_required
def photo():
    payload = request.get_json()
    current_user.username = payload["username"]
    current_user.email = payload["email"]
    current_user.password = payload["password"]
    current_user.firstName = payload["firstName"]
    current_user.genderId = payload["genderId"]
    photo = UserPhoto(user=current_user, url=payload['photo'])
    db.session.add(photo)
    db.session.commit()
    return {
        "Success": True
    }


@user_routes.route("/messages", methods=['POST'])
@login_required
def newMessage():
    payload = request.get_json()
    userId = payload["currentUserId"]
    recipient = payload["recipient"]
    message = payload["message"]
    newMessage = QuickMessages(user_Id=userId, recipient=recipient, message=message)
    db.session.add(newMessage)
    db.session.commit()
    return {
        "Success": True
    }


@user_routes.route("/<int:id>/my-messages", methods=['GET'])
@login_required
def myMessage(id):
    user = User.query.get(id)
    messages = QuickMessages.query.filter(user.username == QuickMessages.recipient).all()
    return {"messages": [message.to_dict() for message in messages]}


@user_routes.route("/<int:id>/get-name", methods=['GET'])
@login_required
def getName(id):
    user = User.query.get(id)
    return user.to_dict()


"""

hello darkness my old friend

"""
