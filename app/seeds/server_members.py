from ..models import db, Server_Member, environment, SCHEMA

server_members = [
    {
        "id": 1,
        "user_id": 1,
        "server_id": 1
    },
    {
        "id": 2,
        "user_id": 2,
        "server_id": 2
    },
    {
        "id": 3,
        "user_id": 3,
        "server_id": 3,
    },
]


def seed_server_members():
    db.session.add_all([Server_Member(**server_member) for server_member in server_members])
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
