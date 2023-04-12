from flask_socketio import SocketIO, emit
import os

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
    emit("chat", data, broadcast=True)
