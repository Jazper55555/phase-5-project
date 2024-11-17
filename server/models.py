from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class Show(db.Model, SerializerMixin):
    __tablename__ = 'shows'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    description = db.Column(db.String)
    instrumentation = db.Column(db.String)
    price = db.Column(db.Integer)
    audio = db.Column(db.String)

    def __repr__(self):
        return f'<Show {self.id}: {self.name}>'
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<User {self.id}: {self.name}>' 
    
class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<Client {self.id}: {self.name}>'  

class Testimonial(db.Model, SerializerMixin):
    __tablename__ = 'testimonials'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'<Client {self.id}: {self.name}>'   
    
class Sponsor(db.Model, SerializerMixin):
    __tablename__ = 'sponsors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    link = db.Column(db.String)

    def __repr__(self):
        return f'<Sponsor {self.id}: {self.name}>'