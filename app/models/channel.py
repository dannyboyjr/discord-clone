from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

# (WIP)

class Channel(db.Model):
    '''
    Relationships:
        Channel has one server, user
        Channel has many messages
    '''
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False,)
    name = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    server = db.relationship('Server', back_populates='channel')
    user = db.relationship('User', back_populates='channel')
    message = db.relationship('Message', back_populates='channel')

    def to_dict(self):
        return {
            'id':self.id,
            "server_id": self.server_id,
            'owner_id': self.owner_id,
            "name": self.name,
            "private": self.private,
            "created_at": self.created_at
        }
    
    def to_dict_channel_messages(self):
        return {
            'id':self.id,
            "server_id": self.server_id,
            'owner_id': self.owner_id,
            "name": self.name,
            "private": self.private,
            "created_at": self.created_at,
            "messages": [message.to_dict() for message in self.message]
        }

    def to_dict_dm(self):
        return {
            'id':self.id,
            "server_id": self.server_id,
            'owner_id': self.owner_id,
            "name": self.name,
            "private": self.private,
            "created_at": self.created_at,
            "server": self.server.to_dict_members()

        }
