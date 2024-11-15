#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, jsonify
from authlib.integrations.flask_oauth2 import ResourceProtector
# from flask_restful import Resource

# Local imports
from config import app, db, api
from validator import Auth0JWTBearerTokenValidator
from models import *

# Initialize Auth0 resource protector
require_auth = ResourceProtector()
validator = Auth0JWTBearerTokenValidator(
    "dev-xd7ykqvwbz8sm235.us.auth0.com",
    "http://localhost:5555" # Replace with your actual API Identifier
)
require_auth.register_token_validator(validator)


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
@require_auth(None)
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