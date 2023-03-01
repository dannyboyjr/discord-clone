from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        id=1, username='Demo', avatar="https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/", hashed_password='pbkdf2:sha265:260000$Xaz4DGPnjudhxhnb$85b3e27f8f55131de02359e858a064fb36609eca9d748512115d16d7a96d80ec', email='demo@aa.io', )
    marnie = User(
        id=2, username='marnie', avatar="https://www.crystalknows.com/hubfs/API/celebrities/mark_zuckerberg.jpg", hashed_password='pbkdf2:sha265:260000$Xaz4DGPnjudhxhnb$85b3e27f8f55131de02359e858a064fb36609eca9d748512115d16d7a96d80ec', email='marnie@aa.io')
    bobbie = User(
        id=3, username='bobbie',avatar="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=1480&t=st=1677631754~exp=1677632354~hmac=d2e59414a9bc9892310dece481f11a4fcfa1b63dda5f69d6f976f4157fa4c12b", hashed_password='password', email='bobbie@aa.io')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
