from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Server, Server_Member,Channel, User, db
from datetime import datetime


server_routes = Blueprint('server', __name__)

##get all servers 
@server_routes.route('/')
@login_required
def get_all_servers():
    """
    Query for all servers and returns them in a list
    """
    servers = Server.query.filter(Server.private == False).all()
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
    if server.private is True:
        return jsonify({"error": "cannot get private server"}), 403
    return server.to_dict_members()

#get all servers of current user
@server_routes.route('/current', methods=["GET"])
@login_required
def get_servers_of_current_user():
    servers = Server.query.join(Server_Member).filter(
        Server_Member.user_id == current_user.id,
        Server.private == False
        ).all() 
    return jsonify([server.to_dict() for server in servers])

#create public server route
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

    channel_post = Channel(
            server_id = server.id,
            owner_id = current_user.id,
            name = "general",
            private=False,
            created_at=datetime.utcnow()
        )
    db.session.add(channel_post)
    db.session.commit()
    # adds user as member of new server
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
    if server.private is True:
        return jsonify({"error": "cannot edit private server"}), 403
    if not data or not all(key in data for key in ("name", "icon")):
        return jsonify({"error": "name & icon of server required "}), 400
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
    if server.owner_id is not current_user.id:
        return jsonify({"error": "Cannot delete another users server"}), 403
    if server.private is True:
        return jsonify({"error": "Cannot delete a private server"}), 403
    db.session.delete(server)
    db.session.commit()
    return jsonify({"success": "server was deleted"}), 200


#get all memebers of a server
@server_routes.route('/<int:server_id>/members', methods=['GET'])
@login_required
def get_server_members(server_id):

    """
    gets all members of a server
    """

    server_members = Server_Member.query.filter_by(server_id=server_id).all()
    server = Server.query.get(server_id)
    if server is None:
        return jsonify({'error': "Server doesn't exist"}), 404
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
    currentServers = Server.query.join(Server_Member).filter(Server_Member.user_id == current_user.id).all() 
    if server in currentServers:
        return jsonify({'error': 'User is already a memeber of this server'}), 400
    member = Server_Member(user_id=current_user.id, server_id=id)
    db.session.add(member)
    db.session.commit()

    return jsonify({'success': 'User joined the server successfully'})

#leave server
@server_routes.route('/<int:server_id>/leave', methods=["DELETE"])
@login_required
def leave_server(server_id):
    """
    leave server
    """
    server_member = Server_Member.query.filter_by(
        server_id=server_id, 
        user_id=current_user.id
        ).first()
    server = Server.query.get(server_id)
    if server is None:
        return jsonify({'error': "Server doesn't exist"}), 404
    if server.owner_id == current_user.id:
        return jsonify({'error': 'Cannot leave your own server. If you wish to leave this server you must delete server'}), 403
    if server_member:
        db.session.delete(server_member)
        db.session.commit()
        return jsonify({'success': 'User left the server successfully'})
    else:
        return jsonify({'error': 'User is not a member of this server'}), 404


# create private server route and add user
@server_routes.route("/dm/<string:user_name>", methods=["POST"])
@login_required
def create_private_server(user_name):
    """
    Create a private server and add current user and the user in the URL as members
    """
    data = request.get_json()
    server = Server(
        name=data['name'],
        icon=data['icon'],
        private=True,
        owner_id=current_user.id,
        created_at=datetime.utcnow()
    )
    #adds server to db
    db.session.add(server)
    db.session.commit()

    # adds current user as member of new server
    member = Server_Member(user_id=current_user.id, server_id=server.id)
    db.session.add(member)
    
    # adds user found in URL as member of new server
    friend = User.query.filter(User.username==user_name).first()

    if not friend:
        return jsonify({"error": "User not found"}), 404
    member = Server_Member(user_id=friend.id, server_id=server.id)
    db.session.add(member)

    # adds the general channel to new server
    channel_name = f"{current_user.username}-{friend.username}"

    channel = Channel(
        server_id=server.id,
        owner_id=current_user.id,
        name=channel_name,
        private=True,
        created_at=datetime.utcnow()
    )
    db.session.add(channel)

    db.session.commit()
    return channel.to_dict_dm()




#get all PRIVATE servers of current user
@server_routes.route('/me', methods=["GET"])
@login_required
def get_private_servers_of_current_user():
    servers = Server.query.join(Server_Member).filter(
        Server_Member.user_id == current_user.id,
        Server.private == True
        ).all() 
    return jsonify([server.to_dict() for server in servers])

