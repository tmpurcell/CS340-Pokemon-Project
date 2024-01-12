from marshmallow import Schema, fields


class PokemonSchema(Schema):
    pokemon_id = fields.Integer()
    name = fields.String()
    type_id = fields.String(required=True)
    description = fields.String(required=True)
    tier_rank = fields.String()
    evolves_into = fields.String()

class TypesSchema(Schema):
    type_id = fields.Integer()
    type_name = fields.String(required=True)
    weak_against = fields.Integer(required=True)
    strong_against = fields.Integer()

class PokemonToTrainerSchema(Schema):
    trainer_pokemon_id = fields.Integer()
    trainer_id = fields.Integer(required=True)
    pokemon_id = fields.Integer(required=True)
    nickname = fields.String()

class BattlesSchema(Schema):
    battle_id = fields.Integer()
    trainer_1 = fields.Integer(required=True)
    trainer_2 = fields.Integer(required=True)
    outcome = fields.String(required=True)
    timestamp = fields.DateTime(format="iso", required=True)

class StatsSchema(Schema):
    stat_id = fields.Integer()
    pokemon_id = fields.Integer(required=True)
    hit_points = fields.Integer(required=True)
    attack_power = fields.Integer(required=True)
    defense_power = fields.Integer(required=True)
    speed = fields.Integer(required=True)

class TrainerSchema(Schema):
    trainer_id = fields.Integer()
    name = fields.String(required=True)
    location = fields.String(required=True)
    wins = fields.Integer(required=True)
    losses = fields.Integer(required=True)

