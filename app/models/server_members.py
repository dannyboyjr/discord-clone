from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import flask_sqlalchemy

# (WIP)


class Server_Member(db.Model):
    '''
    Relationships:
        Server_Member has one server, user
    '''
    __tablename__ = 'server_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('server.id'), nullable=False)

    def to_dict(self):
        return {
            'id':self.id,
            "user_id": self.channel_id,
            "server_id": self.server_id,
        }
