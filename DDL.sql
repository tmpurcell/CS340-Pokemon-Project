-- Pokemon Database Data Definitions Queries
-- October 26th, 2023


-- Created by Tyler Purcell and Eric Eaton

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -----------------------------------------------------
-- Table `Pokemon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Pokemon` (
  `pokemon_id` INT NOT NULL AUTO_INCREMENT,
  `type_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `tier_rank` VARCHAR(45) NOT NULL,
  `evolves_into` VARCHAR(45),
  PRIMARY KEY (`pokemon_id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- -----------------------------------------------------
-- Table `Types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Types` (
  `type_id` INT NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(45) NOT NULL,
  `weak_against` INT NOT NULL,
  `strong_against` INT NOT NULL,
  PRIMARY KEY (`type_id`, `weak_against`, `strong_against`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- -----------------------------------------------------
-- Adding in the FK for `Pokemon` table
-- -----------------------------------------------------
ALTER TABLE `Pokemon`
  CONSTRAINT `type_id`
  ADD FOREIGN KEY (`type_id`) REFERENCES `Types`(`type_id`)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;


-- -----------------------------------------------------
-- Table `Stats`
-- CONSTRAINTS `pokemon_id` breaks the import for some reason
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Stats` (
  `stat_id` INT NOT NULL AUTO_INCREMENT,
  `pokemon_id` INT NOT NULL,
  `hit_points` INT NOT NULL,
  `attack_power` INT NOT NULL,
  `defense_power` INT NOT NULL,
  `speed` INT NOT NULL,
  PRIMARY KEY (`stat_id`),
  CONSTRAINT `pokemon_id`
  FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`pokemon_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- -----------------------------------------------------
-- Table `Trainers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Trainers` (
  `trainer_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `wins` INT NULL,
  `losses` INT NULL,
  PRIMARY KEY (`trainer_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- -----------------------------------------------------
-- Table `Battles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Battles` (
  `battle_id` INT NOT NULL AUTO_INCREMENT,
  `trainer_1` INT NOT NULL,
  `trainer_2` INT NOT NULL,
  `pokemon_1` INT NOT NULL,
  `pokemon_2` INT NOT NULL,
  `outcome` VARCHAR(45) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  PRIMARY KEY (`battle_id`),
  FOREIGN KEY (`trainer_1`) REFERENCES `Trainers`(`trainer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (`trainer_2`) REFERENCES `Trainers`(`trainer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (`pokemon_1`) REFERENCES `Pokemon`(`pokemon_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (`pokemon_2`) REFERENCES `Pokemon`(`pokemon_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- -----------------------------------------------------
-- Table `Trainer_pokemon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Trainer_pokemon` (
  `trainer_pokemon_id` INT NOT NULL AUTO_INCREMENT,
  `trainer_id` INT NOT NULL,
  `pokemon_id` INT NOT NULL,
  `nickname` VARCHAR(45) NULL,
  PRIMARY KEY (`trainer_pokemon_id`),
  FOREIGN KEY (`trainer_id`) REFERENCES `Trainers`(`trainer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`pokemon_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    )ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;



-- Insert Statements Below

-- Pokemon
INSERT INTO Pokemon (pokemon_id, name, type, description, tier_rank, evolution)
  VALUES (1, 'Bulbasaur', 'Grass', 'A grass type pokemon', 'Starter', 'Ivysaur'),
   (2, 'Ivysaur', 'Grass', 'A grass type pokemon', 'Basic', 'Venusaur'),
   (3, 'Venusaur', 'Grass', 'A grass type pokemon', 'Final', 'Basic'),
   (3, 'Venusaur', 'Grass', 'A grass type pokemon', 'Final', NULL);

-- Pokemon Stats
INSERT INTO Stats (stat_id, pokemon_id, strong_against, weak_against, hit_points, attack_power, defense_power, speed)
VALUES (1, 1, 3, 2, 45, 49, 49, 65),
 (2, 2, 3, 2, 60, 62, 63, 80),
 (3, 3, 3, 2, 80, 100, 123, 100);

-- Trainer info
INSERT INTO Trainers (trainer_id, name, location, wins, losses)
VALUES (1, 'Ash', 'Kanto', 20, 2),
 (2, 'Brock', 'Kanto', 10, 3),
 (3, 'Misty', 'Kanto', 7, 4);

-- Battle Info
INSERT INTO Battles (BattleID, trainer_1, trainer_2, pokemon_1, pokemon_2, outcome, timestamp)
VALUES (7, 14, 15, 35, 11, 'Trainer 1 wins', '2023-11-01 14:55:00'),
 (8, 16, 11, 3, 24, 'Trainer 2 wins', '2023-10-05 08:40:00'),
 (9, 13, 12, 18, 32, 'Trainer 1 wins', '2023-10-13 21:05:00');

-- Pokemon types
INSERT INTO Types (type_id, type_name, weak_against, strong_against)
VALUES (1, 'Fire', 2, 3),
 (2, 'Water', 3, 1),
 (3, 'Grass', 1, 2);

-- Trainer-Pokemon intersection table
INSERT INTO trainer_pokemon (trainer_pokemon_id, trainer_id, pokemon_id, nickname)
VALUES (1, 1, 12, 'Butterfree'),
 (2, 1, 25, 'Pikachu'),
 (3, 4, 1, 'Bulbasaur');