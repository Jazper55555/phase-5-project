"""remove accolades from Client table

Revision ID: 4f7a9f335f28
Revises: 7f924fee599f
Create Date: 2024-11-04 13:19:39.327318

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f7a9f335f28'
down_revision = '7f924fee599f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clients', schema=None) as batch_op:
        batch_op.drop_column('accolades')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('accolades', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
