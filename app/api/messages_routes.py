from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Message, db


message_routes = Blueprint("messages", __name__)


@message_routes.route("/servers/:serverId/channels/:channelId/messages")
@login_required
def messages():
    """
    Query for all the messages of curr user
    """

    messages = Message.query.filter(
        (Message.id == current_user.id) | (Message.owner_id ==
                                           current_user.id).order_by(Message.createdAt).all()
    )
    return {"Messages": [message.to_dict()for message in messages]}
