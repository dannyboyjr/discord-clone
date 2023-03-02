from flask import Blueprint, jsonify, session, request
from app.models import Server, db


server_routes = Blueprint('server', __name__)

##get all servers 
@server_routes.route('/')
# @login_required
def getAllServers():
    """
    Query for all servers and returns them in a list
    """
    servers = Server.query.all()
    return jsonify({'servers': [server.to_dict() for server in servers]})


##Get server by id
@server_routes.route('/<int:id>')
# @login_required
def serverById(id):
    """
    Query for a server by id and returns that server in a dictionary
    """
    server = Server.query.get(id)
    return server.to_dict()

#get all servers of current user
@server_routes.route('/current')
def getServersOfCurrentUser():
    pass