-- Pokemon Database Data Manipulation Queries
-- October 31ST, 2023
-- Version: 2

-- Created by Tyler Purcell and Eric Eaton


-- Statements for Pokemon Table --

-- Selecting the Pokemon Table with Type information
SELECT Pokemon.*, Type.type_name
FROM Pokemon
JOIN Types  ON type_id = type_id
WHERE
  (:searchKeyword IS NULL OR
    (LOWER(Pokemon.name) LIKE CONCAT('%', LOWER(:searchKeyword), '%') OR
    LOWER(Pokemon.pokemon_id) LIKE CONCAT('%', LOWER(:searchKeyword), '%') OR
    LOWER(Pokemon.tier_rank) LIKE CONCAT('%', LOWER(:searchKeyword), '%') OR
    LOWER(Pokemon.evolution) LIKE CONCAT('%', LOWER(:searchKeyword), '%')));

-- Insert into the Pokemon Table --
INSERT INTO Pokemon (pokemon_id, name, description, tier_rank, evolves_into, type_id)
VALUES (:pokID, :pokName, :pokDesc, :pokTier, :pokEvo, :typeID);

-- Deleting a Pokemon from the Pokemon Table
DELETE FROM Pokemon 
WHERE pokemon_id = :pokID
ON DELETE CASCADE;


-- Statements for Stats Table --

-- Selecting the Stats Table with Pokemon information
SELECT Stats.*, Pokemon.name AS pokemon_name
FROM Stats
JOIN Pokemon ON Stats.pokemon_id = Pokemon.pokemon_id
WHERE Stats.stat_id = :pokStat;

-- Insert into the Pokemon Stats Table
INSERT INTO Stats (stat_id, pokemon_id, hit_points, attack_power, defense_power, speed)
VALUES (:pokStat, :pokID, :pokHP, :pokAP, :pokDP, :pokSpeed);

-- Update the Stats Table with New Stats from the game 
UPDATE Stats
SET pokemon_id = :pokID, hit_points = :pokHP, attack_power = :pokAP, 
  defense_power = :pokDP, speed = :pokSpeed
WHERE stat_id = :pokStat
ON UPDATE CASCADE;


-- Statements for Types Table -- 

-- Selecting the Pokemon Types Table
SELECT * FROM Types WHERE type_id = :typeID;

-- Insert into the Pokemon Types Table
INSERT INTO Types (type_id, type_name, weak_against, strong_against)
VALUES (:typeID, :typeName, :typeWA, :typeSA);

-- Types do not need to be deleted or updated as the type information does not change -- 


-- Statements for the Trainer info table --

-- Selecting the Trainer info Table
SELECT * FROM Trainers WHERE trainer_id = :trainerID;

-- Insert into the Trainer info Table
INSERT INTO Trainers (trainer_id, name, location, wins, losses)
VALUES (:trainerID, :trainerName, :trainerLocation, :trainerWins, :trainerLosses);

-- Update the Trainer Info based on received information
UPDATE Trainers
SET name = :trainerName, location = :trainerLocation, wins = :trainerWins,
  losses = :trainerLosses
WHERE trainer_id = :trainerID;

-- Deleting a Trainer from Trainers Table
DELETE FROM Trainers
WHERE trainer_id = :trainerID
ON DELETE CASCADE;


-- Statements for the Battle Info Table --

-- Selecting the Battle info Table
SELECT * FROM Battles WHERE battle_id = :battleID;

-- Insert into the Battle Info Table
INSERT INTO Battles (battle_id, trainer_1, trainer_2, pokemon_1, pokemon_2, outcome, timestamp)
VALUES (:battleID, :trainer1, :trainer2, :pokemon1, :pokemon2, :outcome, :time);

-- Updating the Battle Info Table
UPDATE Battles
SET trainer_1 = :trainer1, trainer_2 = :trainer2, outcome = :outcome, timestamp = :time
WHERE battle_id = :battleID;

-- Statements for the Trainer-Pokemon intersection Table -- 

-- Selecting the Trainer-Pokemon intersection table with Trainer and Pokemon names
SELECT Trainer_pokemon.*, Trainer.name AS trainer_name, Pokemon.name AS pokemon_name
FROM Trainer_pokemon
JOIN Trainers ON Trainer_pokemon.trainer_id = Trainers.trainer_id
JOIN Pokemon ON Trainer_pokemon.pokemon_id = Pokemon.pokemon_id;

-- Select all resources from the Trainer-Pokemon intersection Table
SELECT * FROM trainer_pokemon;

-- Insert into the Trainer-Pokemon intersection table
INSERT INTO trainer_pokemon (trainer_pokemon_id, trainer_id, pokemon_id, nickname)
VALUES (:trainerPok, :trainerID, :pokID, :trainerNic);

-- Update the Trainer-Pokemon intersection table
UPDATE trainer_pokemon
SET trainer_id = :trainer_id, pokemon_id = :pokemon_id, nickname = :nickname
WHERE trainer_pokemon_id = :trainer_pokemon_id;

-- Delete a resource from the Trainer-Pokemon intersection table
DELETE FROM trainer_pokemon WHERE trainer_pokemon_id = :trainer_pokemon_id;