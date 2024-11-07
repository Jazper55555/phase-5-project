"""add show_id to testimonials table

Revision ID: efbc8377a191
Revises: e126393035ee
Create Date: 2024-11-06 21:34:09.511789

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'efbc8377a191'
down_revision = 'e126393035ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('testimonials', schema=None) as batch_op:
        batch_op.add_column(sa.Column('show_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_testimonials_show_id_shows'), 'shows', ['show_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('testimonials', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_testimonials_show_id_shows'), type_='foreignkey')
        batch_op.drop_column('show_id')

    # ### end Alembic commands ###
