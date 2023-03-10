from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Message, Server, Channel, Server_Member, db


message_routes = Blueprint("messages", __name__)


@message_routes.route("<server_id>/channels/<int:channel_id>/messages", methods=["GET"])
@login_required
def get_message_channel_id(server_id, channel_id):
    """
    Get all messages of public channel.

    """
    server = Server.query.get(server_id)
    if server is None:
        return jsonify({"error": "Server not found"}), 404
    if server.private is True:
        return jsonify({"error": "cannot get private server"}), 403
    
    # Check if channel exists
    channel = Channel.query.filter_by(server_id=server_id, id=channel_id).first()
    if channel is None:
        return jsonify({"error": "Channel not found"}), 404

    # Check if channel is private
    if channel.private is True and not Server_Member.query.filter_by(server_id=server_id, user_id=current_user.id).first():
        return jsonify({"error": "Cannot send message to private channel"}), 403

    #validate member
    server_member = Server_Member.query.filter_by(server_id=server_id, user_id=current_user.id).first()
    if not server_member:
        return jsonify({"error": "You are not a member of this server."}), 403


    messages = Message.query.filter_by(server_id=server_id, channel_id=channel_id).all()
    return {"Messages": [message.to_dict() for message in messages]}


@message_routes.route("<int:server_id>/channels/<int:channel_id>/messages", methods=["POST"])
@login_required
def create_message_channel_id(server_id,channel_id):
    """
    send message to channel
    """
    server = Server.query.get(server_id)
    if server is None:
        return jsonify({"error": "Server not found"}), 404
    if server.private is True:
        return jsonify({"error": "cannot get private server"}), 403
    
    # Check if channel exists
    channel = Channel.query.filter_by(server_id=server_id, id=channel_id).first()
    if channel is None:
        return jsonify({"error": "Channel not found"}), 404

    # Check if channel is private
    if channel.private is True:
        return jsonify({"error": "Cannot send message to private channel"}), 403

    #check if member of server
    server_member = Server_Member.query.filter_by(server_id=server_id, user_id=current_user.id).first()
    if not server_member:
        return jsonify({"error": "You are not a member of this server."}), 403

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







    

