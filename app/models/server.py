from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
# (WIP)

class Server(db.Model):
    '''
    Relationships:
        Server has many users, channels, messages, server_members
    '''
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(70), nullable=False)
    icon = db.Column(db.String(500), nullable=False)
    private = db.Column(db.Boolean, default=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='servers')
    channel = db.relationship('Channel', back_populates='server', cascade='all, delete-orphan')
    message = db.relationship('Message', back_populates='server', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id':self.id,
            'owner_id': self.owner_id,
            "name": self.name,
            "icon": self.icon,
<<<<<<< HEAD
=======
            "private": self.private,
            "created_at": self.created_at
>>>>>>> dev
        }
