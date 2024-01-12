"""
exposes an api that allows CRUD operations for a user's contacts
"""

from flask_restx import Namespace, Resource, fields, abort
from flask import jsonify, request, make_response
from sqlalchemy import text
from sqlalchemy.exc import NoResultFound

from . import db
from .models import StatsSchema

stats_api = Namespace('stats', description="Operations related to a pokemon's statistics")

# specifies the expected structure of data in the stats_api
stats_model = stats_api.model('Stats', {
    'stat_id': fields.Integer(dump_only=True, description='Primary key'),
    'pokemon_id': fields.Integer(description='FK-pokemon_id'),
    'hit_points': fields.Integer(description='Health'),
    'attack_power': fields.Integer(description='attack power'),
    'defense_power': fields.Integer(description='defense'),
    'speed': fields.Integer(description='speed'),
})


@stats_api.route('/')
class StatsResource(Resource):
    # @stats_api.marshal_with(contact_model)
    def get(self):
        """return all stats"""
        with db.engine.connect() as connection:
            sql_query = text("SELECT * FROM public.stats")
            result = connection.execute(sql_query)
        column_names = result.keys()
        data = [dict(zip(column_names, row)) for row in result]
        return jsonify(data)


    # @stats_api.expect(contact_model, validate=True)
    def post(self):
        """create a stat"""
        data = request.get_json()
        parameters = dict(
            pokemon_id=data['pokemon_id'],
            hit_points=data['hit_points'],
            attack_power=data['attack_power'],
            defense_power=data['defense_power'],
            speed=data['speed']

        )

        query = text(f"""
        INSERT INTO stats (pokemon_id, hit_points, attack_power, defense_power, speed)
        VALUES (:pokemon_id, :hit_points, :attack_power, :defense_power, :speed)
        RETURNING stat_id;
        """)

        with db.engine.connect() as connection:
            result = connection.execute(query, parameters=parameters)
            connection.commit()
            stat_id = result.fetchone()[0]

        if result.rowcount > 0:
            data['stat_id'] = stat_id
            return StatsSchema().dump(data), 200

        return 200



@stats_api.route('/<string:id>')
class StatsResource(Resource):

    def get(self, id):
        """get a stat by stat id."""


    # @stats_api.marshal_with(contact_model)
    def put(self, id):
        """update a stat by stat id"""
        data = request.get_json()
        parameters = dict(
            stat_id= id,
            pokemon_id=data['pokemon_id'],
            hit_points=data['hit_points'],
            attack_power=data['attack_power'],
            defense_power=data['defense_power'],
            speed=data['speed']
        )

        with db.engine.connect() as connection:
            try:
                sql_query = text(f"""
                UPDATE stats 
                SET pokemon_id = :pokemon_id, hit_points = :hit_points, 
                    attack_power = :attack_power, defense_power = :defense_power, speed = :speed
                WHERE stat_id = :stat_id
                """)
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                abort(404, f"Stat with ID {id} not found")

        return make_response("", 200)



    def delete(self, id):
        """delete a stat"""
        parameters = dict(id=id)
        with db.engine.connect() as connection:
            try:
                sql_query = text(f"DELETE FROM stats WHERE stat_id = :id")
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                return 404

        return make_response("", 200)



