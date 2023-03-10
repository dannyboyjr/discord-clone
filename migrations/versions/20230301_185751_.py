"""empty message

Revision ID: 941fcdca703c
Revises: 62aa2ea7de06
Create Date: 2023-03-01 18:57:51.628228

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '941fcdca703c'
down_revision = '62aa2ea7de06'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('channels', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))

    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))

    with op.batch_alter_table('servers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('servers', schema=None) as batch_op:
        batch_op.drop_column('created_at')

    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.drop_column('created_at')

    with op.batch_alter_table('channels', schema=None) as batch_op:
        batch_op.drop_column('created_at')

    # ### end Alembic commands ###