from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import flask_sqlalchemy

# (WIP)


class Message(db.Model):
    '''
    Relationships:
        Message has one server, user, channel
    '''
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, nullable=False, db.ForeignKey('server.id'))
    channel_id = db.Column(db.Integer, nullable=False, db.ForeignKey('channel.id'))
    owner_id = db.Column(db.Integer, nullable=False, db.ForeignKey('user.id'))
    content = db.Column(db.String(255), nullable=False)

    server = db.relationship('Server', back_populates='messages')
    channel = db.relationship('Channel', back_populates='messages')
    user = db.relationship('User', back_populates='messages')

    def to_dict(self):
        return {
            'id':self.id,
            "server_id": self.server_id,
            "channel_id": self.channel_id,
            'owner_id': self.owner_id,
            "content": self.content
        }
