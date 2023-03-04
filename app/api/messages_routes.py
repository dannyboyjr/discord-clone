from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Message, db, Channel


message_routes = Blueprint("messages", __name__)


# @message_routes.route("/<int:id>", methods=["GET"])
# @login_required
# # def messages():
# #     """
# #     """



@message_routes.route("/channels/<int:channel_id>/messages", methods=["GET"])
@login_required
def get_message_channel_id(channel_id):
    """
    Gets a private message(DM) by channel id.

    """

    channel = Channel.query.get(channel_id)

    if channel is None:
        return jsonify({"error": "Channel not found"}), 404

    messages = Message.query.filter_by(channel_id=channel_id).all()

    return {"Messages": [message.to_dict() for message in messages]}


@message_routes.route("/channels/<int:channel_id>/messages", methods=["POST"])
@login_required
def create_message_channel_id(channel_id):
    """
    Post message(DM) based on channel id

    """
    channel = Channel.query.get(channel_id)

    if channel is None:
        return jsonify({"error": "Channel not found"}), 404

    message = Message.query.filter_by(channel_id=channel_id).all()

    return {"Message": [content.to_dict() for content in message]}
