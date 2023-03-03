from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Message, db, User, Channel, Server


message_routes = Blueprint("messages", __name__)


@message_routes.route("/api/dms/@me", methods=["GET"])
@login_required
def messages():
    """
    Query for all the messages of curr user
    """

    messages = Message.query.filter(
        (Message.id == current_user.id) | (Message.owner_id == current_user.id).order_by(Message.id).all()
    )
    return {"Messages": [message.to_dict()for message in messages]}


@message_routes.route("/api/servers/:serverId/channels/:channelId/messages", methods=["GET"])
@login_required
def get_messages():
    """
    Gets a private message(DM) by channel id.

    """
    channels = Channel.query.filter().all()

    channel_id = [channel.id for channel in channels]

    if channel_id in channels:
        return jsonify({channels[channel_id]})
    else:
        return jsonify({"success": False, "error": f'Unknown channel ID: {channel_id}'}), 404


@message_routes.route("api/servers/:serverId/channels/:channelId/messages", methods=["POST"])
@login_required
def send_dm(channel_id):
    """
    Post message to private DM (create a message in a private channel)
    """
    owner_id= request.json["owner_id"]
    content =  request.json["content"]

    channel = Channel.query.get(channel_id)
    if channel is None:
        return jsonify({"error": "Channel not found"}), 404

    message = Message(channel_id=channel_id, owner_id=owner_id, content=content)
    db.session.add(message)
    db.session.commit()

    return jsonify({"id": message.id, "channel_id": message.channel_id, "owner_id": message.owner_id, "content": message.content})
