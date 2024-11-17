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

    # Relationships
    testimonials = db.relationship('Testimonial', back_populates='show', cascade='all, delete-orphan')
    users = association_proxy('testimonials', 'user', creator=lambda user_obj: Testimonial(show=user_obj))

    serialize_rules = ('-testimonials.show',)

    # Validations
    @validates('name')
    def validate_name(self, key, name):
        if not (1 <= len(name) <= 50):
            raise ValueError('Must contain a name')
        return name
    
    @validates('price')
    def validate_price(self, key, price):
        if not isinstance(price, int):
            raise ValueError('Price must be an integer greater than $0')
        if not price > 0:
            raise ValueError('Price must be an integer greater than $0')
        return price

    def __repr__(self):
        return f'<Show {self.id}: {self.name}>'
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)

    testimonials = db.relationship('Testimonial', back_populates='user', cascade='all, delete-orphan')
    shows = association_proxy('testimonials', 'show', creator=lambda show_obj: Testimonial(user=show_obj))

    serialize_rules = ('-testimonials.user',)

    # Validations
    @validates('username')
    def validate_username(self, key, name):
        if not (1 <= len(name) <= 50):
            raise ValueError('Must contain a username')
        return name
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError('Email must contain the @ symbol')
        return email

    def __repr__(self):
        return f'<User {self.id}: {self.name}>'  

class Testimonial(db.Model, SerializerMixin):
    __tablename__ = 'testimonials'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationships
    show = db.relationship('Show', back_populates='testimonials')
    user = db.relationship('User', back_populates='testimonials')

    serialize_rules = ('-show.testimonials', '-user.testimonials')

    # Validations
    @validates('content')
    def validate_content(self, key, content):
        if not content:
            raise ValueError('Review cannot be empty')
        return content

    def __repr__(self):
        return f'<Client {self.id}: {self.name}>'   
    
class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

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