from flask import Blueprint, jsonify, session, request
from app.models import Server, db


server_routes = Blueprint('server', __name__)

@server_routes.route('/')
# @login_required
def getAllServers():
    """
    Query for all servers and returns them in a list
    """
    servers = Server.query.all()
    return jsonify({'servers': [server.to_dict() for server in servers]})



@server_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a server by id and returns that server in a dictionary
    """
    server = Server.query.get(id)
    return server.to_dict()