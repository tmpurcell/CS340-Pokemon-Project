"""
exposes an api that allows CRUD operations for a user's contacts
"""

from flask import make_response, request
from flask_restx import Namespace, Resource, fields, abort
from sqlalchemy import text
from sqlalchemy.exc import NoResultFound

from .models import PokemonSchema
from . import db

pokemon_api = Namespace('pokemon', description="Operations related to a pokemon")

# specifies the expected structure of data in the pokemon_api
pokemon_model = pokemon_api.model('Pokemon', {
    'pokemon_id': fields.Integer(required=True, dump_only=True, description='Primary Key'),
    'name': fields.String(required=True, description='Pokemon Name'),
    'type_id': fields.Integer(required=True, description='FK-Pokemon Type'),
    'description': fields.String(description='Description of Pokemon'),
    'tier_rank': fields.String(description=''),
    'evolves_into': fields.String(description='Next evolution'),
})


@pokemon_api.route('/')
class PokemonResource(Resource):
    def get(self):
        """return all pokemon"""
        data = []

        with db.engine.connect() as connection:
            sql_query = text("SELECT * FROM pokemon")
            result = connection.execute(sql_query)
            for row in result:
                data.append(row)
            columns = result.keys()

        data = [dict(zip(columns, row)) for row in data]
        return PokemonSchema().dump(data, many=True), 200



    # @pokemon_api.expect(contact_model, validate=True)
    def post(self):
        """create a pokemon"""
        data = request.get_json()
        parameters = dict(
            name = data['name'],
            type_id = data['type_id'],
            description = data['description'],
            tier_rank = data['tier_rank'],
            evolves_into = data['evolves_into'],
        )

        query = text(f"""
        INSERT INTO pokemon (name, type_id, description, tier_rank, evolves_into)
        VALUES (:name, :type_id, :description, :tier_rank, :evolves_into)
        RETURNING pokemon_id;
        """)

        with db.engine.connect() as connection:
            result = connection.execute(query, parameters=parameters)
            connection.commit()
            pokemon_id = result.fetchone()[0]
        
        if result.rowcount > 0:
            data['pokemon_id'] = pokemon_id
            return PokemonSchema().dump(data), 200

        return 200



@pokemon_api.route('/<string:id>')
class PokemonResource(Resource):

    def get(self, id):
        """get a pokemon by pokemon id."""
        pokemon_name = request.args.get('name')  # Get the name parameter from the query string

        if pokemon_name:
            # Search by name
            with db.engine.connect() as connection:
                sql_query = text("SELECT * FROM pokemon WHERE name = :name")
                result = connection.execute(sql_query, name=pokemon_name)
                data = [dict(row) for row in result]

            if data:
                return PokemonSchema().dump(data), 200
            else:
                return {'message': 'Pokemon not found'}, 404
        else:
            # Return all pokemon if no name is provided
            data = []
            with db.engine.connect() as connection:
                sql_query = text("SELECT * FROM pokemon")
                result = connection.execute(sql_query)
                columns = result.keys()
                for row in result:
                    data.append(dict(zip(columns, row)))

            return PokemonSchema().dump(data, many=True), 200


    def put(self, id):
        """update a pokemon by pokemon id"""
        data = request.get_json()
        parameters = dict(
            pokemon_id = data['pokemon_id'],
            name = data['name'],
            type_id = data['type_id'],
            description = data['description'],
            tier_rank = data['tier_rank'],
            evolves_into = data['evolves_into'],
            id=id
        )

        # TODO: update query
        with db.engine.connect() as connection:
            try:

                sql_query = text(f"""
                UPDATE pokemon 
                SET name = :name, type_id = :type_id, description = :description, tier_rank = :tier_rank, evolves_into = :evolves_into
                WHERE pokemon_id = :id;
                """)

                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                abort(404, f"Trainer_Pokemon with ID {id} not found")

        return make_response("", 200)


    def delete(self, id):
        """delete a pokemon"""
        parameters = dict(id=id)
        with db.engine.connect() as connection:
            try:
                sql_query = text(f"""
                DELETE FROM pokemon WHERE pokemon_id = :id
                """)
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)

        return make_response("", 200)



