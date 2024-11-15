#!/usr/bin/env python3

# Standard library imports
# from random import randint, choice as rc
# from sqlalchemy import text

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Show, Client, Testimonial, Sponsor


def create_shows():
    shows = [
        Show(name='Gift of Time', image='data:image/jpeg;base64,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ICIiAiIgIiICIiAiIgIiICIiAiIgKVyfPq2HGljyGE7bx4hRSI2XTRuG638S8VK1XXoPdbsAeRjr5rT8LhRpvtH6L83UK7mODmktcOYWlZH7SWtphtYFrgLkCQfEdPJTrTvh5PlWYYZoxLJEAktM/wA23zAUxnHD1MNIIBtvCy3iPjgPjsJnU06iI90gwPgvvW9p9VzNPZyY/FA/K6SNyzx2r2f1HUMSWtPdaZgW3Wg8H5IytSbVc27gDfx2WTY7FuqvdUeZc43/AGC13gTPKZoMGoS0AEdPAojCy2vpnuTtD2UmgDWb+TeXxsrfleBa2iGwPh81T+LuJqLa9CXCACDHKYufCyseE4nw4piKjTbfUE1y6biH4vAY1r4/w3tcRzgWMehUvkec0XDUHhzSOqy7jvjTt3mnR9wWL/xddPh4qlMruGznCehIW65RfJGle0TiunLqVEy/Ykfd6+qzIleEWuWWVoiIiRERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAXs1xGxIPgvVEHkleERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH/2Q==', instrumentation='Battery + FE', description='The Gift of Time is a meditation on the nature of time and how it affects everything around us. What starts as a cacophony of sound becomes the simplest tick of the clock and slowly evolves into the rhythmic complexity of the world around us. Reptetitious motives, cyclical patterns, and long-paced builds best describe the nature of this show.', price=1500, audio='audio/Gift-of-Time.mp3'),
    ]

    return shows

def create_clients():
    clients = [
        Client(name='Westminster High School'),
        Client(name='Haltom High School'),
        Client(name='Edison High School'),
        Client(name='Oceanview High School'),
        Client(name='Loara High School'),
        Client(name='Katella High School'),
        Client(name='Instinct Percussion'),
        Client(name='Impulse Drum & Bugle Corps')
    ]

    return clients
    
def create_sponsors():
    sponsors = [
        Sponsor(name='Vic Firth', image='https://static.wixstatic.com/media/8a84be_15bbf3ab1ff541e185c24af205896b08~mv2.png/v1/fill/w_544,h_146,al_c,lg_1,q_85,enc_auto/vicfirth-logo-2x.png', link='https://vicfirth.com/'),
        Sponsor(name='Zildjian', image='https://static.wixstatic.com/media/8a84be_213905a2749245199171a4dca11901ec~mv2.png/v1/fill/w_560,h_240,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ziljian.png', link='https://zildjian.com/'),
        Sponsor(name='Creative Costuming & Designs', image='https://static.wixstatic.com/media/8a84be_5298a9a644c14c43a107d4da9e84f851~mv2.png/v1/fill/w_464,h_336,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/CCD_logo_white.png', link='https://www.creative-costuming.com/'),
        Sponsor(name='Ludwig Musser', image='https://static.wixstatic.com/media/8a84be_59dbebe7469349e8b13bf4ad28d10ad4~mv2.png/v1/crop/x_0,y_371,w_1080,h_329/fill/w_618,h_186,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/LM%20white%20transparent.png', link='https://www.connselmer.eu/our-brands/Ludwig-Musser'),
        Sponsor(name='Remo', image='https://static.wixstatic.com/media/8a84be_baebb1f3f62d44ffb244eda9a40786c5~mv2.png/v1/crop/x_0,y_292,w_1080,h_391/fill/w_522,h_194,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/even%20better%20remo.png', link='https://remo.com/'),
        Sponsor(name='Digital Performance Gear', image='https://static.wixstatic.com/media/8a84be_fbfa20b2d11246f2bd3465f26a1d463a~mv2.png/v1/fill/w_367,h_218,al_c,lg_1,q_85,enc_auto/dpg%20white.png', link='https://dpgperforms.com/')
    ]

    return sponsors

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print('Clearing db...')
        Show.query.delete()
        db.session.commit()
        Client.query.delete()
        db.session.commit()
        Sponsor.query.delete()
        db.session.commit()

        print('Seeding Shows...')
        shows = create_shows()
        db.session.add_all(shows)
        db.session.commit()

        print('Seeding Clients...')
        clients = create_clients()
        db.session.add_all(clients)
        db.session.commit()

        print('Seeding Sponsors...')
        sponsors = create_sponsors()
        db.session.add_all(sponsors)
        db.session.commit()

        print('Done')
