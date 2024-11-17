#!/usr/bin/env python3

from config import app, db
from models import *

from flask import jsonify, make_response

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
            'name': user.name,
            'username': user.username,
            'email': user.email,
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)