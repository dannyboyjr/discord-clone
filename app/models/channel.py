from .db import db, environment, SCHEMA, add_prefix_for_prod
# from flask_sqlalchemy import flask_sqlalchemy

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


    server = db.relationship('Server', back_populates='channel')
    user = db.relationship('User', back_populates='channel')
    message = db.relationship('Message', back_populates='channel')

    def to_dict(self):
        return {
            'id':self.id,
            "server_id": self.server_id,
            'owner_id': self.owner_id,
            "name": self.name
        }
