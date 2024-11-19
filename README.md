# Percussion Playground - A Full-Stack Application

## Purpose

- Create a full-stack application using React and Flask with both front and backend servers running through Render
- Give users an opportunity to purchase/collaborate on custom designed shows for the competitve marching arts

### Walkthrough

[![Instinct Creative Arts](/ICA-LOGO.PNG)](https://youtu.be/4QydtNIWxtQ)

---

## Introduction/Setup

Navigate to the following web address to see the website in action:

- [Instinct Creative Arts](https://ica-static-webpage.onrender.com)


## Directory Structure

Following the root directory structure below, there is a brief discussion on the function and purpose of each .js and .py file located in the `client` & `server` folders.

```console
.
├── CONTRIBUTING.md
├── ICA-LOGO.PNG
├── LICENSE.md
├── Pipfile
├── Pipfile.lock
├── README.md
├── client
│   ├── README.md
│   ├── build
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
└── server
    ├── __pycache__
    ├── app.db
    ├── app.py
    ├── config.py
    ├── migrations
    ├── models.py
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── requirements.txt
    ├── seed.py
    ├── sqlite_dump.sql
    ├── static
    └── test_api.py
```

Note: My `instance` and `migrations` files were for initially configuring my locally run SQLite database. Because the database is now deployed through Render, they are not necessary for running the application.

---

## Server Folder

### `app.py`

Contains all of the RESTful routes connecting the Front-End React Application to the backend server on Render.

`app.route()`

The first is utilized for CREATE, READ, UPDATE, & DELETE Methods.

```py
@app.route('/')
def home():
    return '<h1>Project Server</h1>'
```

### `config.py`

#### Flask

There are a number of Flask related packages implemented in the application including `flask_migrate`, `flask_sqlalchemy`, `flask_cors`, & `flask_restful`. Each of these serves a specific purpose in getting the backend Flask application to run smoothly.

```py
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
import os
```

#### App

The primary configuration for proper connection to the database comes from `app.config['SQLALCHEMY_DATABASE_URI']`. This connects the Flask application to the online server through the 'External Database URL'.

#### SQLAlchemy & Migrate

By passing `app` (through `Flask`) & `db` (through `SQLAlchemy`) through `Migrate`, we are able to properly instantiate the newly created database.

```py
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)
```

#### CORS

CORS (Cross-Origin Resource Sharing) is configured to connect my Front-End React Application to the backend server deployed through Render. It includes multiple sources for CORS access.

```py
CORS(app, resources={r"/*": {"origins": 
["http://localhost:3000", 
"https://ica-static-webpage.onrender.com"]}})
```

### `models.py`

There are 5 tables/models represented:

- Shows
- Users
- Testimonials
- Clients
- Sponsors

#### Shows

```py
class Show(db.Model, SerializerMixin):
    __tablename__ = 'shows'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    description = db.Column(db.String)
    instrumentation = db.Column(db.String)
    price = db.Column(db.Integer)
    audio = db.Column(db.String)
```
This displays the attributes for each instance of `Shows`.

#### Users

```py
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    auth0_id = db.Column(db.String, primary_key=True, nullable=False, unique=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
 ```

This displays the attributes for each instance of `User`.

#### Testimonials

```py
class Testimonial(db.Model, SerializerMixin):
    __tablename__ = 'testimonials'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'))
    user_id = db.Column(db.String, db.ForeignKey('users.auth0_id'))
```

This displays the attributes for each instance of `Testimonial`. As you can see, there are two `ForeignKeys` that constitute the `primary_key` for each instance of `Show` and `User`.

#### Clients

```py
class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
 ```

This displays the attributes for each instance of `Client`.

#### Sponsors

```py
class Sponsor(db.Model, SerializerMixin):
    __tablename__ = 'sponsors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    link = db.Column(db.String)
 ```

This displays the attributes for each instance of `Sponsor`.

### Relationships

The table relationships are represented below:

- Shows to Users = Many to Many Relationship through Testimonials
- Shows to Testimonials = One to Many Relationship
- Users to Shows = Many to Many Relationship through Testimonials
- Users to Testimonials = One to Many Relationship

![Table Relationship Diagram](/Phase-5-Project-Diagram.png)

### `seed.py`

This file contains all of the seed data for the `Shows`, `Users`, `Testimonials`, `Clients`, and `Sponsors` tables. 

- All classes are generated through hardcoded instances of the respective class with the slight exception of `Users` and `Testimonials` having data POSTed through the React Application.

---

## Client Folder

#### `index.js`

Contains the `Browser Router` and `Root` for my React application.

#### `index.css`

Contains ALL of the styling options for each component rendered in the browser application

### Components Folder

This houses all of the components that comrpise the Front-End of the React application. Here is a visual representation of the directory:

``` console
components
.
├── About.js
├── AddReview.js
├── App.js
├── AuthContext.js
├── Clients.js
├── Home.js
├── Login.js
├── Logout.js
├── NavBar.js
├── ShowDetails.js
├── Shows.js
├── Sponsors.js
├── Testimonials.js
├── UserContext.js
└── UserProfile.js
```

#### `About.js`

Displays information on the creative team behind Instinct Creative Arts.

#### `AddReview.js`

Allows the user (when logged in) to add (POST) a testimonial to any show (based on its show_id) to the backend database.

#### `App.js`

Contains the major components that are housed within `NavBar.js` and connects them to their exact path (URL) through _React Router_.

#### `AuthContext.js`

Provides `useContext()` and `createContext()` hooks for user authentication across all routes in the React Application.

#### `Clients.js`

Displays all the clients that Instinct Creative Arts has collaborated with over the last decade.

#### `Home.js`

Displays Instinct Creative Arts Logo and serves as the Home Base for user navigation.

#### `Login.js`

Allows user to navigate to the third party authentication server (Auth0) for login purposes.

#### `Logout.js`

Allows user to navigate to the third party authentication server (Auth0) for logout purposes.

#### `NavBar.js`

Contains URL pathways for each clickable link in `NavBar.js`. Pathways include:

- Home
- About
- Shows
- Clients
- Testimonials
- Login
- Logout
- Profile

#### `ShowDetails.js`

Displays specific show information related to whichever show a user clicks on from the `Shows` catalog.

#### `Shows.js`

Displays the full catalog of purchasable shows. Allows user to click on any image for specific show information.

#### `Sponsors.js`

Displays sponsor/partner logos on each page/route. They are all clickable as well allowing you to navigate to their home page.

#### `Testimonials.js`

Displays all the testimonials from users regarding specific shows they are attached to.

#### `UserContext.js`

Allows the useContext() and createContext() hooks to apply to all children in the App.py component.

#### `UserProfile.js`

Allows a user (when logged in) to view their profile details including testimonials. It also allows full CRUD actions on testimonials for any show.

## Resources

- [Database Relationship Diagram](https://dbdiagram.io/home)
- [Flask-SQLAlchemy](https://flask-sqlalchemy.readthedocs.io/en/3.1.x/)
- [Flask](https://flask.palletsprojects.com/en/3.0.x/)
- [Python](https://www.python.org/)
- [SQLite](https://www.sqlite.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Auth0](https://auth0.com/)
- [Render](https://render.com/)