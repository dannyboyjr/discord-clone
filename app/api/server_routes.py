from flask import Blueprint, jsonify, session, request
from app.models import Server, db


server_routes = Blueprint('server', __name__)

@server_routes.route('/')
def getAllServers():
    """
    Query for all servers and returns them in a list
    """
    servers = Server.query.all()
    return jsonify({'servers': [server.to_dict() for server in servers]})



# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return user.to_dict()