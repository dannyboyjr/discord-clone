from ..models import db, Message, environment, SCHEMA
from datetime import datetime, timedelta

messages = [
    {
        "sender_id":1,
        "recipient_id": 2,
        "message": "Demo_User says hi to Marnie_Demo",
        "time_sent": datetime.now() - timedelta(hours=12)
    },
    {
        "sender_id": 2,
        "recipient_id": 1,
        "message": "Marnie_Demo says hi back to Demo_User",
        "time_sent": datetime.now() - timedelta(hours=11)
    },
    {
        "sender_id": 1,
        "recipient_id": 3,
        "message": "Demo_User says how are you Marnie_Demo",
        "time_sent": datetime.now() - timedelta(hours=10)
    },
]


def seed_messages():
    db.session.add_all([Message(**message) for message in messages])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()
