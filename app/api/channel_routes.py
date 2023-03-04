from flask import Blueprint, render_template, redirect
from app.forms import NewChannel
from app.models import db, Server, Channel


channel_routes = Blueprint('channel', __name__)

@channel_routes.route('<int:serverId>/channels', methods = ["GET"])
def getChannelsInServer(serverId):
    '''
    Retrieve all channels in a server
    '''
    channelsFromId = Channel.query.filter(serverId=serverId)
    return {'channels': [channel.to_dict() for channel in channelsFromId]}


@channel_routes.route('<int:serverId>/channels/<int:channelId>', methods = ["GET"])
def getChannelById(channelId):
    '''
    Retrieve a specific channel
    '''
    channelFromId = Channel.query.get(channelId)
    return {'channel': channelFromId}


@channel_routes.route("<int:serverId>/channels", methods = ["POST"])
def createChannel():
   form = NewChannel()
   if form.validate_on_submit():
       channel_post = Channel(
           name = form.name.data
       )
       db.session.add(channel_post)
       db.session.commit()
       return channel_post.to_dict
   return {'error': 'This form was not validated'}


@channel_routes.route('<int:serverId>/channels/<int:channelId>', methods = ["PUT"])
def editChannel(channelId):
   channelToUpdate = Channel.query.get(channelId)
   form = NewChannel(channelToUpdate)
   if form.validate_on_submit():
       channel_update = Channel(
           name = form.name.data
       )
       db.session.commit()
       return channel_update.to_dict
   return {'error': 'This form was not validated'}



@channel_routes.route('<int:serverId>/channels/<int:channelId>', methods = ["DELETE"])
def deleteChannel(channelId):
    channelToDelete = Channel.query.get(channelId)
    db.session.delete(channelToDelete)
    db.session.commit
    return {'message': f'Channel {channelToDelete.name} has been deleted'}
