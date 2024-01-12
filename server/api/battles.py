"""
exposes an api that allows CRUD operations for a battle
"""

from flask_restx import Namespace, Resource, fields, abort
from flask import jsonify, request, make_response
from sqlalchemy import text
from sqlalchemy.exc import NoResultFound

from . import db
from .models import BattlesSchema

battles_api = Namespace('battles', description="Operations related to a battle")

# specifies the expected structure of data in the battles_api
battles_model = battles_api.model('Battles', {
    'battle_id': fields.Integer(dump_only=True, description='Primary key'),
    'trainer_1': fields.Integer(description='FK-Trainer 1 name'),
    'trainer_2': fields.Integer(required=True, description='FK-Trainer 2 name'),
    'outcome': fields.String(required=True, description='Outcome of battle'),
    'timestamp': fields.DateTime(description='Time battle occurred'),
})


@battles_api.route('/')
class BattlesResource(Resource):
    # @battles_api.marshal_with(contact_model)
    def get(self):
        """return all trainers"""
        with db.engine.connect() as connection:
            sql_query = text("SELECT * FROM public.battles")
            result = connection.execute(sql_query)
        column_names = result.keys()
        data = [dict(zip(column_names, row)) for row in result]
        return BattlesSchema().dump(data, many=True), 200


    # @battles_api.expect(contact_model, validate=True)
    def post(self):
        """create a battle"""
        data = request.get_json()
        parameters = dict(
            trainer_1=data['trainer_1'],
            trainer_2=data['trainer_2'],
            outcome=data['outcome'],
            timestamp=data['timestamp']
        )

        query = text(f"""
        INSERT INTO battles (trainer_1, trainer_2, outcome, timestamp)
        VALUES (:trainer_1, :trainer_2, :outcome, :timestamp)
        RETURNING battle_id;
        """)

        with db.engine.connect() as connection:
            result = connection.execute(query, parameters=parameters)
            connection.commit()
            battle_id = result.fetchone()[0]

        if result.rowcount > 0:
            data['battle_id'] = battle_id
            return BattlesSchema().dump(data), 200

        return 200



@battles_api.route('/<string:id>')
class BattlesResource(Resource):

    def get(self, id):
        """get a battle by battle id."""


    # @battles_api.marshal_with(contact_model)
    def put(self, id):
        """update a battle by battle id"""
        data = request.get_json()
        parameters = dict(
            battle_id=id,
            trainer_1=data['trainer_1'],
            trainer_2=data['trainer_2'],
            outcome=data['outcome'],
            timestamp=data['timestamp']
        )

        with db.engine.connect() as connection:
            try:
                sql_query = text(f"""
                UPDATE battles 
                SET trainer_1 = :trainer_1, trainer_2 = :trainer_2, outcome = :outcome, timestamp = :timestamp
                WHERE battle_id = :battle_id
                """)
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                abort(404, f"Battle with ID {id} not found")

        return make_response("", 200)


    def delete(self, id):
        """delete a battle"""
        parameters = dict(id=id)
        with db.engine.connect() as connection:
            try:
                sql_query = text(f"DELETE FROM battles WHERE battle_id = :id")
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                return 404

        return make_response("", 200)



