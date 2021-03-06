"""Anything

Revision ID: d6a9abb87169
Revises: 5c105f17728b
Create Date: 2021-02-25 14:15:31.591862

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd6a9abb87169'
down_revision = '5c105f17728b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('quickmessages_user_Id_key', 'quickmessages', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('quickmessages_user_Id_key', 'quickmessages', ['user_Id'])
    # ### end Alembic commands ###
