"""empty message

Revision ID: 5968ab42ab89
Revises: ffdc0a98111c
Create Date: 2023-02-28 20:59:28.704938

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '5968ab42ab89'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('servers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=70), nullable=False),
    sa.Column('icon', sa.String(length=500), nullable=False),
    sa.Column('private', sa.Boolean(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE servers SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###


    op.drop_table('servers')
    # ### end Alembic commands ###
