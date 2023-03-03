from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Server, Server_Member, User, db
from datetime import datetime


server_routes = Blueprint('server', __name__)

##get all servers 
@server_routes.route('/')
@login_required
def get_all_servers():
    """
    Query for all servers and returns them in a list
    """
    servers = Server.query.all()
    return jsonify({'servers': [server.to_dict() for server in servers]})


##Get server by id
@server_routes.route('/<int:id>')
@login_required
def server_by_id(id):
    """
    Query for a server by id and returns that server in a dictionary
    """
    server = Server.query.get(id)
    if server is None:
        return jsonify({"error": "Server not found"}), 404
    return server.to_dict()

#get all servers of current user
@server_routes.route('/current', methods=["GET"])
@login_required
def get_servers_of_current_user():
    pass

#create server route
@server_routes.route("/", methods=["POST"])
@login_required
def create_server():
    """
    Create new server and adds creator of server as a server_member
    """
    data = request.get_json()
    server = Server(
        name=data['name'],
        icon=data['icon'],
        private=False,
        owner_id=current_user.id,
        created_at=datetime.utcnow()
    )   
    #adds server to db
    db.session.add(server)
    db.session.commit()

    #adds user as member of new server
    member = Server_Member(user_id=current_user.id, server_id=server.id)
    db.session.add(member)
    db.session.commit()

    return server.to_dict()


# edit server route
@server_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_server(id):
    """
    edit server route
    """
    server = Server.query.get(id)
    if server is None:
        return jsonify({"error": "Server not found"}), 404
    data = request.get_json()
    if not data or not all(key in data for key in ("name")):
        return jsonify({"error": "name of server required "}), 400
    server.name = data['name']
    server.icon = data['icon']
    db.session.commit()
    return server.to_dict() 


#delete server route
@server_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_server(id):
    """
    delete server 
    """
    server = Server.query.get(id)
    if server is None:
        return jsonify({'error': "Server not found"}), 404
    db.session.delete(server)
    db.session.commit()
    return jsonify({"success": "server was deleted"}), 200


@server_routes.route('/<int:server_id>/members', methods=['GET'])
def get_server_members(server_id):
    server_members = Server_Member.query.filter_by(server_id=server_id).all()
    """
    gets all members of a server
    """

    server_members_info = []
    for server_member in server_members:
        user = User.query.get(server_member.user_id)
        if user:
            server_members_info.append({
                'id': server_member.id,
                'email': user.email,
                "username": user.username
            })

    return {"server_members": server_members_info}, 200

#join server 
@server_routes.route('/<int:id>/join', methods=["POST"])
@login_required
def join_server(id):
    """
    current user joins the server
    """
    server = Server.query.get(id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    if server.private:
        return jsonify({'error': 'Unauthroized'}), 403
    if server in current_user.servers:
        return jsonify({'error': 'User is already a memeber of this server'}), 400
    member = Server_Member(user_id=current_user.id, server_id=id)
    db.session.add(member)
    db.session.commit()

    return jsonify({'success': 'User joined the server successfully'})

#leave server
