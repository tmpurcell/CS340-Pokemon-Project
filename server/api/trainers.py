"""
exposes an api that allows CRUD operations for a trainer
"""

from flask_restx import Namespace, Resource, fields, abort
from flask import jsonify, request, make_response
from sqlalchemy import text
from sqlalchemy.exc import NoResultFound

from . import db
from .models import TrainerSchema

trainers_api = Namespace('trainers', description="Operations related to a trainer")

# specifies the expected structure of data in the trainers_api
trainers_model = trainers_api.model('Trainers', {
    'trainer_id': fields.Integer(required=True, dump_only=True, description='Primary key'),
    'name': fields.String(description='Trainer\'s name'),
    'location': fields.String(required=True, description='Trainer\'s location'),
    'wins': fields.Integer(required=True, description='Number of wins'),
    'losses': fields.Integer(description='Number of losses'),
})


@trainers_api.route('/')
class TrainersResource(Resource):
    # @trainers_api.marshal_with(contact_model)
    def get(self):
        """return all trainers"""
        with db.engine.connect() as connection:
            sql_query = text("SELECT * FROM public.trainers")
            result = connection.execute(sql_query)
        column_names = result.keys()
        data = [dict(zip(column_names, row)) for row in result]
        return jsonify(data)


    # @trainers_api.expect(contact_model, validate=True)
    def post(self):
        """create a trainer"""
        data = request.get_json()
        parameters = dict(
            trainer_id= data['trainer_id'],
            name=data['name'],
            location=data['location'],
            wins=data['wins'],
            losses=data['losses']
        )

        query = text(f"""
        INSERT INTO trainers (name, location, wins, losses)
        VALUES (:name, :location, :wins, :losses)
        RETURNING trainer_id;
        """)

        with db.engine.connect() as connection:
            result = connection.execute(query, parameters=parameters)
            connection.commit()
            trainer_id = result.fetchone()[0]

        if result.rowcount > 0:
            data['trainer_id'] = trainer_id
            return TrainerSchema().dump(data), 200

        return 200



@trainers_api.route('/<string:id>')
class TrainersResource(Resource):

    def get(self, id):
        """get a trainer by trainer id."""


    # @trainers_api.marshal_with(contact_model)
    def put(self, id):
        """update a trainer by trainer id"""
        data = request.get_json()
        parameters = dict(
            trainer_id=id,
            name=data['name'],
            location=data['location'],
            wins=data['wins'],
            losses=data['losses']
        )

        with db.engine.connect() as connection:
            try:
                sql_query = text(f"""
                UPDATE trainers 
                SET name = :name, location = :location, wins = :wins, losses = :losses
                WHERE trainer_id = :trainer_id
                """)
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                abort(404, f"Stat with ID {id} not found")

        return make_response("", 200)


    def delete(self, id):
        """delete a trainer"""
        parameters = dict(id=id)
        with db.engine.connect() as connection:
            try:
                sql_query = text(f"DELETE FROM trainers WHERE trainer_id = :id")
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                return 404

        return make_response("", 200)



