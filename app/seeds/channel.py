from ..models import db, Channel, environment, SCHEMA

channel_info = [
    {
        "id": 1,
        "server_id": 1,
        "owner_id":1,
        "channel_name": "general",
        "private": False
    },
    {
        "id": 2,
        "server_id": 2,
        "owner_id":2,
        "channel_name": "awesome_rocks",
        "private": False
    },
    {
        "id": 3,
        "server_id": 1,
        "owner_id":1,
        "channel_name": "app academy reject",
        "private": False
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
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channel")

    db.session.commit()
