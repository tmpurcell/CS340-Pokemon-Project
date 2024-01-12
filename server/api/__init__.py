import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api

from config import ProductionConfig, DevelopmentConfig


db = SQLAlchemy()


def create_app():
    app = Flask(__name__, static_folder=None, template_folder=None)
    api = Api(
        title='Pokemon API',
        version='1.0',
        description='an api that exposes endpoints for managing pokemon, trainers and battles'
    )

    # If RUNNING_IN_PRODUCTION is defined as an environment variable, then we're running on Azure
    if os.getenv('RUNNING_IN_PRODUCTION'):
        # Production, we don't load environment variables from .env file but add them as environment variables in Azure.
        app.config.from_object(ProductionConfig)
    else:
        # Local development, where we'll use environment variables.
        print("Loading config.development and environment variables from .env file.")
        app.config.from_object(DevelopmentConfig)

    # initialize db
    db.init_app(app)
    api.init_app(app)

    # register blueprints
    from api.pokemon import pokemon_api
    from api.trainers import trainers_api
    from api.battles import battles_api
    from api.stats import stats_api
    from api.types import types_api
    from api.trainer_pokemon_relationship import poke_match
    api.add_namespace(pokemon_api, path='/api/pokemon')
    api.add_namespace(trainers_api, path='/api/trainers')
    api.add_namespace(battles_api, path='/api/battles')
    api.add_namespace(stats_api, path='/api/stats')
    api.add_namespace(types_api, path='/api/types')
    api.add_namespace(poke_match, path='/api/pokematch')


    return app
