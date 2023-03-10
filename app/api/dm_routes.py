from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Message, Server, Channel, Server_Member, db


dm_routes = Blueprint("dms", __name__)



@dm_routes.route("/<server_id>/<int:channel_id>", methods=["GET"])
@login_required
def get_private_message_channel(server_id, channel_id):
    """
    Get all private messages

    """
    # Check if channel exists
    channel = Channel.query.filter_by(id=channel_id).first()
    if channel is None:
        return jsonify({"error": "Channel not found"}), 404

    # Check if channel is private and member is user
    if channel.private is True and Server_Member.query.filter_by(server_id=server_id, user_id=current_user.id).first():
        messages = Message.query.filter_by(server_id=server_id, channel_id=channel_id).all()
        return {"Messages": [message.to_dict() for message in messages]}
    else:
        return jsonify({"error": "Cannot go snooping around"}), 403


@dm_routes.route("/<server_id>/<int:channel_id>", methods=["POST"])
@login_required
def create_private_message(server_id, channel_id):
    """
    Create a new private message

    """
    # Check if channel exists
    channel = Channel.query.filter_by(id=channel_id).first()
    if channel is None:
        return jsonify({"error": "Channel not found"}), 404

    if channel.private is True and Server_Member.query.filter_by(server_id=server_id, user_id=current_user.id).first():
        data = request.get_json()
        
    #json can only contain {"conent": "message"}
    data = request.get_json()
    if set(data.keys()) != {'content'}:
        return jsonify({"error": "Invalid request data. Must only contain 'content' key."}), 400

    message = Message(
        content=data["content"],
        owner_id=current_user.id,
        channel_id=channel_id,
        server_id=server_id
    )

    db.session.add(message)
    db.session.commit()

    return jsonify(message.to_dict()), 201