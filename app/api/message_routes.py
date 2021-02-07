from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Conversation, Message
import json

message_routes = Blueprint('messages', __name__)


@message_routes.route('/')
@login_required
def messages():
    messages = Message.query.all()
    return {"messages": [messages.to_dict() for message in messages]}


@message_routes.route('', methods=['POST'])
@login_required
def post_message():
    print("\nGot a message",
          request.json['userAccountId'], request.json['messageText'])
    messageSql = Message(
        userAccountId=request.json['userAccountId'],
        # TODO research python way of creating a new date: JS new Date()
        timeStarted=db.func.now(),
        # TODO research python way of creating a new date: JS new Date()
        timeClosed=db.func.now(),
        userAccountId2=request.json['userAccountId2']
    )
    db.session.add(messageSql)
    db.session.commit()
    conversation = Conversation(
        matchedId=messageSql.id,
        messageText=request.json['messageText'],
        whichUser=True,
        timeStamp=messageSql.timeStarted  # TODO how to specify this timeStamp
    )
    db.session.add(conversation)
    db.session.commit()

    return {"messageSql": messageSql.to_dict(), 'conversation': conversation.to_dict()}
