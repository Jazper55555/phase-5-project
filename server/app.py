#!/usr/bin/env python3

from config import app, db
from models import *

from flask import jsonify, make_response, request

# My Code
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/shows')
def get_shows():
    shows = Show.query.all()
    response = []

    for show in shows:
        show_data = {
            'id': show.id,
            'name': show.name,
            'image': show.image,
            'description': show.description,
            'instrumentation': show.instrumentation,
            'price': show.price,
            'audio': show.audio
        }

        response.append(show_data)

    return make_response(jsonify(response), 200)

@app.route('/shows/<int:id>')
def get_show_by_id(id):
    show = Show.query.filter(Show.id==id).first()

    response = {
            'id': show.id,
            'name': show.name,
            'image': show.image,
            'description': show.description,
            'instrumentation': show.instrumentation,
            'price': show.price,
            'audio': show.audio
        }
    
    return make_response(jsonify(response), 200)

@app.route('/users')
def get_users():
    users = User.query.all()
    response = []

    for user in users:
        testimonials_list = [{'content': testimonial.content} for testimonial in user.testimonials]

        user_data = {
            'id': user.id,
            'auth0_id': user.auth0_id,
            'username': user.username,
            'email': user.email,
            'testimonials': testimonials_list
        }

        response.append(user_data)

    return make_response(jsonify(response), 200)

@app.route('/testimonials')
def get_testimonials():
    testimonials = Testimonial.query.all()
    response = []

    for testimonial in testimonials:
        user = testimonial.user
        show = testimonial.show

        testimonial_data = {
            'id': testimonial.id,
            'content': testimonial.content,
            'show_id': testimonial.show_id,
            'user_id': testimonial.user_id,
            'user': {
                'username': testimonial.user.username if user else 'Unknown User'
            },
            'show': {
                'name': testimonial.show.name if show else 'Unknown Show',
                'image': testimonial.show.image if show else 'Unknown Show'
            }
        }

        response.append(testimonial_data)

    return make_response(jsonify(response), 200)

@app.route('/clients')
def get_clients():
    clients = Client.query.all()
    response = []

    for client in clients:
        client_data = {
            'id': client.id,
            'name': client.name
        }

        response.append(client_data)

    return make_response(jsonify(response), 200)

@app.route('/sponsors')
def get_sponsors():
    sponsors = Sponsor.query.all()
    response = []

    for sponsor in sponsors:
        sponsor_data = {
            'name': sponsor.name,
            'image': sponsor.image,
            'link': sponsor.link
        }

        response.append(sponsor_data)

    return make_response(jsonify(response), 200)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    auth0_id = data.get('auth0_id')
    username_data = data.get('username')
    email_data = data.get('email')

    if not auth0_id or not username_data or not email_data:
        return make_response(jsonify({'error': 'Missing data'}), 400)

    existing_user = User.query.filter_by(auth0_id=auth0_id).first()

    if existing_user:
        return make_response(jsonify({'error': 'User already exists'}), 409)

    new_user = User(auth0_id=auth0_id, username=username_data, email=email_data)

    try:
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify({'message': 'User created successfully'}), 201)

    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({'error': str(e)}), 500)
    
    
@app.route('/users/<auth0_id>/testimonials', methods=['GET'])
def get_user_testimonials(auth0_id):
    user = User.query.filter_by(auth0_id=auth0_id).first()
    if not user:
        return make_response(jsonify({'error': 'User not found'}), 404)

    testimonials_list = [{'id': t.id, 'content': t.content} for t in user.testimonials]
    return make_response(jsonify(testimonials_list), 200)


@app.route('/testimonials/<int:id>', methods=['PUT'])
def update_testimonial(id):
    data = request.get_json()
    testimonial = Testimonial.query.get(id)
    if not testimonial:
        return make_response(jsonify({'error': 'Testimonial not found'}), 404)

    testimonial.content = data.get('content', testimonial.content)
    try:
        db.session.commit()
        return make_response(jsonify({'message': 'Testimonial updated successfully'}), 200)
    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({'error': str(e)}), 500)
    

@app.route('/testimonials/<int:id>', methods=['DELETE'])
def delete_testimonial(id):
    testimonial = Testimonial.query.get(id)
    if not testimonial:
        return make_response(jsonify({'error': 'Testimonial not found'}), 404)

    try:
        db.session.delete(testimonial)
        db.session.commit()
        return make_response(jsonify({'message': 'Testimonial deleted successfully'}), 200)
    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({'error': str(e)}), 500)


if __name__ == '__main__':
    app.run(port=5555, debug=True)