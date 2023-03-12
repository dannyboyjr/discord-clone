from ..models import db, Channel, environment, SCHEMA
from datetime import datetime

channel_info = [
    {
        "id": 1,
        "server_id": 1,
        "owner_id":1,
        "name": "general",
        "private": False,
        "created_at": datetime.utcnow()
    },
    {
        "id": 2,
        "server_id": 2,
        "owner_id":2,
        "name": "awesome_rocks",
        "private": False,
        "created_at": datetime.utcnow()
    },
    {
        "id": 3,
        "server_id": 1,
        "owner_id":1,
        "name": "app academy reject",
        "private": False,
        "created_at": datetime.utcnow()
    },
    {
        "id": 4,
        "server_id": 3,
        "owner_id":3,
        "name": "something new",
        "private": False,
        "created_at": datetime.utcnow()
    },
]

def seed_channels():
        db.session.add_all([Channel(**channel) for channel in channel_info])
        db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channel")

    db.session.commit()
