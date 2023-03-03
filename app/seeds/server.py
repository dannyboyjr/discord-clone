from app.models import db, Server, environment, SCHEMA
from datetime import datetime

servers = [
    {
        "id": 1,
        "owner_id": 1,
        "name": "Server_Demo",
        "icon": "https://img.freepik.com/free-photo/3d-checklist-clipboard-render-illustration_107791-16457.jpg?w=1380&t=st=1677632202~exp=1677632802~hmac=2f26e735ac0f39955c0fe91a86b894cd2d4ee850c921a662ee87280b68095fb2",
        "private": False,
        "created_at": datetime.utcnow()
        
    },
    {
        "id": 2,
        "owner_id": 2,
        "name": "marns_party",
        "icon": "https://img.freepik.com/free-photo/two-festive-champagne-glasses-celebration_53876-100101.jpg?w=740&t=st=1677632160~exp=1677632760~hmac=d2ca6d99d94fde422f939dfd29ce4cf9416fc375ced34f561ca96a157c278a74",
        "private": False,
        "created_at": datetime.utcnow()
    },
    {
        "id": 3,
        "owner_id": 3,
        "name": "LoL_crew",
        "icon": "https://img.freepik.com/free-vector/modern-professional-knights-logo-mascot-game-design-template_1258-29033.jpg?w=996&t=st=1677632097~exp=1677632697~hmac=2cf7f07b5f17fd437d84da0ee870739b957235bf02dc48c9520cece6892254a0",
        "private": False,
        "created_at": datetime.utcnow()
    },
]


def seed_servers():
    db.session.add_all([Server(**server) for server in servers])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")

    db.session.commit()
