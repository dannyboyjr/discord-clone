from flask_socketio import SocketIO, emit, join_room
import os
import json
from app.models import Message, db

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://discourse-clone.onrender.com",
        "https://discourse-clone.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
    print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!howdy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    print(data)
    message = Message(
        content=data["content"],
        owner_id=data["owner_id"],
        channel_id=data["channel_id"],
        server_id=data["server_id"]
    )

    db.session.add(message)
    db.session.commit()
    chat_data = message.to_dict()
    room = str(data["channel_id"])
    emit("chat", json.dumps(chat_data, indent=4, sort_keys=True, default=str), room=room)

@socketio.on("join")
def on_join(data):
    username = data['username']
    room = data['channelId']
    join_room(room)
    print(username + ' has joined room ' + room)
    send(username + ' has entered the room.', to=room)
