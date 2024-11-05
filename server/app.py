#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import *

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/shows')
def get():
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