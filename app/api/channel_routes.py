from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.forms import NewChannel
from app.models import db, Server, Channel
from datetime import datetime


channel_routes = Blueprint('channel', __name__)

@channel_routes.route('<int:server_id>/channels', methods = ["GET"])
def getChannelsInServer(server_id):
    '''
    Retrieve all channels in a server
    '''
    channelsFromId = Channel.query.filter_by(server_id=server_id).all()
    return jsonify({'channels': [channel.to_dict() for channel in channelsFromId]})


@channel_routes.route('<int:serverId>/channels/<int:channelId>', methods = ["GET"])
def getChannelById(serverId, channelId):
    '''
    Retrieve a specific channel
    '''
    serverFromId = Server.query.get(serverId)
    channelFromId = Channel.query.get(channelId)
    if channelFromId is None:
        return jsonify({"error": "Channel not found"}), 404
    if channelFromId.server_id is not serverFromId.id:
        return jsonify({"error": "This Channel is not part of this Server"}), 404
    if channelFromId.private is True:
        return jsonify({"error": "Cannot access private channel"}), 403
    return channelFromId.to_dict()


@channel_routes.route("<int:serverId>/channels", methods = ["POST"])
def createChannel(serverId):
    '''
    Create a new channel
    '''
    form = NewChannel()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel_post = Channel(
            server_id = serverId,
            owner_id = current_user.id,
            name = form.name.data,
            private=False,
            created_at=datetime.utcnow()
        )
        db.session.add(channel_post)
        db.session.commit()
        return channel_post.to_dict()
    return jsonify({'error': 'This form was not validated'})


@channel_routes.route('<int:serverId>/channels/<int:channelId>', methods = ["PUT"])
def editChannel(serverId, channelId):
    '''
    Edit an existing channel that the current user owns
    '''
    serverOfChannel = Server.query.get(serverId)
    channelToUpdate = Channel.query.get(channelId)
    if channelToUpdate is None:
        return jsonify({"error": "Channel not found"}), 404
    data = request.get_json()
    if channelToUpdate.private is True:
        return jsonify({"error": "Cannot edit a private Channel"}), 403
    if set(data.keys()) != {'name'}:
        return jsonify({"error": "Invalid request data. Must only contain 'name' key."}), 400
    channelToUpdate.name = data['name']
    db.session.commit()
    return channelToUpdate.to_dict()

    # form = NewChannel({channelToUpdate})
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     channel_update = Channel(
    #         # id = channelId,
    #         # server_id = channelToUpdate.server_id,
    #         # owner_id = channelToUpdate.owner_id,
    #         name = form.name.data,
    #         # private=False,
    #         # created_at=channelToUpdate.created_at
    #     )
    #     db.session.add(channel_update)
    #     db.session.commit()
    #     return channel_update.to_dict()
    # return jsonify({'error': 'This form was not validated'})



@channel_routes.route('<int:serverId>/channels/<int:channelId>', methods = ["DELETE"])
def deleteChannel(serverId, channelId):
    '''
    Delete an existing channel that the current user owns
    '''
    serverOfChannel = Server.query.get(serverId)
    channelToDelete = Channel.query.get(channelId)
    if channelToDelete is None:
        return jsonify({'error': "Channel not found"}), 404
    if channelToDelete.owner_id is not current_user.id:
        return jsonify({"error": "Cannot delete a channel in a server you don't own"}), 403
    if channelToDelete.private is True:
        return jsonify({"error": "Cannot delete a private channel"}), 403
    db.session.delete(channelToDelete)
    db.session.commit()
    return {'message': f'Channel {channelToDelete.name} has been deleted'}
