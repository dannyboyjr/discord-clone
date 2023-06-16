"""empty message

Revision ID: 0b39f5c96fda
Revises: 941fcdca703c
Create Date: 2023-03-04 10:31:54.703445

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '0b39f5c96fda'
down_revision = '941fcdca703c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('servers', schema=None) as batch_op:
        batch_op.alter_column('icon',
               existing_type=sa.VARCHAR(length=500),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('servers', schema=None) as batch_op:
        batch_op.alter_column('icon',
               existing_type=sa.VARCHAR(length=500),
               nullable=False)

    # ### end Alembic commands ###