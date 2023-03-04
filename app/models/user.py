from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    '''
    Relationships:
        User has many servers, channels, messages, server_members
    '''
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar = db.Column(db.String(500), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    server = db.relationship('Server', back_populates='user', cascade='all, delete-orphan')
    channel = db.relationship('Channel', back_populates='user', cascade='all, delete-orphan')
    message = db.relationship('Message', back_populates='user', cascade='all,delete-orphan')
    server_member = db.relationship('Server_Member', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'avatar': self.avatar
        }
