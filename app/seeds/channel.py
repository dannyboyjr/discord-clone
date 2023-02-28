from app.models import db, Channel, environment, SCHEMA

channel_info = [
    {
        "channel_id": 1,
        "server_id": 1,
        "channel_name": "general",
        "channel_is_private": False
    },
    {
        "channel_id": 2,
        "server_id": 2,
        "channel_name": "awesome_rocks",
        "channel_is_private": False
    },
    {
        "channel_id": 3,
        "server_id": 1,
        "channel_name": "app academy reject",
        "channel_is_private": True
    }

]

def seed_channels():
        db.session.add_all([Channel(**) for message in messages])
    db.session.commit()
