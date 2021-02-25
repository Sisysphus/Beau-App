"""Create Messages 

Revision ID: 5c105f17728b
Revises: d59ad87093e5
Create Date: 2021-02-25 12:55:01.332421

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5c105f17728b'
down_revision = 'd59ad87093e5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('quickmessages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_Id', sa.Integer(), nullable=False),
    sa.Column('recipient', sa.String(length=200), nullable=False),
    sa.Column('message', sa.String(length=200), nullable=False),
    sa.ForeignKeyConstraint(['user_Id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('quickmessages')
    # ### end Alembic commands ###