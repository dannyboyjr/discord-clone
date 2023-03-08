from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

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
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    server = db.relationship('Server', back_populates='message')
    channel = db.relationship('Channel', back_populates='message')
    user = db.relationship('User', back_populates='message')

    def to_dict(self):
        return {
            'id':self.id,
            "server_id": self.server_id,
            "channel_id": self.channel_id,
            'owner_id': self.owner_id,
            "content": self.content,
            "created_at": self.created_at,
            "user": self.user.to_dict()
        }

        
