"""
exposes an api that allows CRUD operations for a junction table for pokemon and trainers
"""

from flask_restx import Namespace, Resource, fields, abort
from flask import jsonify, request, make_response
from sqlalchemy import text
from sqlalchemy.exc import NoResultFound

from . import db
from .models import PokemonToTrainerSchema

poke_match = Namespace('poke_match', description="Operations related to a pokemon and trainer mapping")

poke_match_model = poke_match.model('poke_match', {
    'trainer_pokemon_id': fields.Integer(dump_only=True, description='Primary key'),
    'trainer_id': fields.Integer(description='FK-trainer_id'),
    'pokemon_id': fields.Integer(required=True, description='FK-pokemon_id'),
    'nickname': fields.String(required=True, description='trainer\'s nickname for pokemon'),
})


@poke_match.route('/')
class PokeMatchResource(Resource):
    def get(self):
        """return all pokemon to trainer mappings"""
        with db.engine.connect() as connection:
            sql_query = text("SELECT * FROM trainer_pokemon")
            result = connection.execute(sql_query)
        column_names = result.keys()
        data = [dict(zip(column_names, row)) for row in result]
        return jsonify(data)


    # @stats_api.expect(contact_model, validate=True)
    def post(self):
        """create a pokemon to trainer mapping"""
        data = request.get_json()
        parameters = dict(
            trainer_id = data['trainer_id'],
            pokemon_id = data['pokemon_id'],
            nickname = data['nickname']
        )

        query = text(f"""
        INSERT INTO trainer_pokemon (trainer_id, pokemon_id, nickname)
        VALUES (:trainer_id, :pokemon_id, :nickname)
        RETURNING trainer_pokemon_id;
        """)

        with db.engine.connect() as connection:
            result = connection.execute(query, parameters=parameters)
            connection.commit()
            trainer_pokemon_id = result.fetchone()[0]

        if result.rowcount > 0:
            data['trainer_pokemon_id'] = trainer_pokemon_id
            return PokemonToTrainerSchema().dump(data), 200

        return 200



@poke_match.route('/<string:id>')
class PokeMatchResource(Resource):

    def get(self, id):
        """get a pokemon to trainer mapping by id."""


    def put(self, id):
        """update a pokemon to trainer mapping by id"""
        data = request.get_json()
        parameters = dict(
            trainer_id=data['trainer_id'],
            pokemon_id=data['pokemon_id'],
            nickname=data['nickname'],
            id=id
        )

        with db.engine.connect() as connection:
            try:
                sql_query = text(f"""
                UPDATE trainer_pokemon 
                SET trainer_id = :trainer_id, pokemon_id = :pokemon_id, nickname = :nickname
                WHERE trainer_pokemon_id = :id
                """)
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                abort(404, f"Trainer_Pokemon with ID {id} not found")

        return make_response("", 200)


    def delete(self, id):
        """delete a pokemon to trainer mapping"""
        parameters = dict(id=id)
        with db.engine.connect() as connection:
            try:
                sql_query = text(f"DELETE FROM trainer_pokemon WHERE trainer_pokemon_id = :id")
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                return 404

        return make_response("", 200)



