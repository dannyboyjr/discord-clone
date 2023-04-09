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

@socketio.on("event-type")
def function_to_handle_event(data_included_with_event):
    # code to follow

@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
