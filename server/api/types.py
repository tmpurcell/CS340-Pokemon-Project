"""
exposes an api that allows CRUD operations for a pokemon's type
"""

from flask_restx import Namespace, Resource, fields, abort
from flask import request, make_response
from sqlalchemy import text
from sqlalchemy.exc import NoResultFound

from .models import TypesSchema
from . import db

types_api = Namespace('types', description="Operations related to a pokemon's type")

# specifies the expected structure of data in the types_api
types_model = types_api.model('Types', {
    'type_id': fields.Integer(dump_only=True, description='Primary key'),
    'type_name': fields.String(description='Name of the type'),
    'weak_against': fields.Integer(required=True, description='Type it is weak against'),
    'strong_against': fields.Integer(required=True, description='Type it is strong against'),
})


@types_api.route('/')
class TypesResource(Resource):
    # @types_api.marshal_with(contact_model)
    def get(self):
        """return all types"""
        data = []

        with db.engine.connect() as connection:
            sql_query = text("SELECT * FROM types")
            result = connection.execute(sql_query)
            for row in result:
                data.append(row)
            columns = result.keys()

        data = [dict(zip(columns, row)) for row in data]
        return TypesSchema().dump(data, many=True), 200


    # @types_api.expect(contact_model, validate=True)
    def post(self):
        """create a type"""
        data = request.get_json()
        parameters = dict(
            type_name=data['type_name'],
            weak_against=int(data['weak_against']) if data['weak_against'] != '0' else None,
            strong_against=int(data['strong_against']) if data['strong_against'] != '0' else None,
        )

        query = text(f"""
            INSERT INTO types (type_name, weak_against, strong_against)
            VALUES (:type_name, :weak_against, :strong_against)
            RETURNING type_id;
        """)

        with db.engine.connect() as connection:
            result = connection.execute(query, parameters=parameters)
            connection.commit()
            type_id = result.fetchone()[0]

        if result.rowcount > 0:
            data['type_id'] = type_id
            return TypesSchema().dump(data), 200

        return 200



@types_api.route('/<string:id>')
class TypesResource(Resource):

    def get(self, id):
        """get a type by type id."""


    # @types_api.marshal_with(contact_model)
    def put(self, id):
        """update a type by type id"""
        data = request.get_json()
        parameters = dict(
            type_id=id,
            type_name=data['type_name'],
            weak_against=data['weak_against'],
            strong_against=data['strong_against'],
        )

        with db.engine.connect() as connection:
            try:
                sql_query = text(f"""
                UPDATE types 
                SET type_name = :type_name, weak_against = :weak_against, 
                    strong_against = :strong_against
                WHERE type_id = :type_id
                """)
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                abort(404, f"Stat with ID {id} not found")

        return make_response("", 200)



    def delete(self, id):
        """delete a type"""
        parameters = dict(id=id)
        with db.engine.connect() as connection:
            try:
                sql_query = text(f"DELETE FROM types WHERE type_id = :id")
                connection.execute(sql_query, parameters=parameters)
                connection.commit()
            except NoResultFound as e:
                print(e)
                return 404

        return make_response("", 200)



