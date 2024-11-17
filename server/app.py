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
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }

        response.append(user_data)

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

    username_data = data.get('username')
    email_data = data.get('email')

    if not username_data or not email_data:
        return make_response(jsonify({'error': 'Missing data'}), 400)

    existing_user = User.query.filter_by(email=email_data).first()

    if existing_user:
        return make_response(jsonify({'error': 'User already exists'}), 409)

    new_user = User(username=username_data, email=email_data)

    try:
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify({'message': 'User created successfully'}), 201)

    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({'error': str(e)}), 500)


if __name__ == '__main__':
    app.run(port=5555, debug=True)