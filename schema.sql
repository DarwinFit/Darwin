
CREATE DATABASE IF NOT EXISTS russell;

USE russell;

CREATE TABLE if not exists users (
  id int NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  age int NOT NULL,
  weight int NOT NULL,
  height int NOT NULL,
  gender VARCHAR(20) NOT NULL,
  avg_calories int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE if not exists food_history (
  id int NOT NULL AUTO_INCREMENT,
  food_name VARCHAR(255) NOT NULL,
  user_id int NOT NULL,
  date date NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE if not exists exercise_history (
  id int NOT NULL AUTO_INCREMENT,
  exercise_name VARCHAR(255) NOT NULL,
  user_id int NOT NULL,
  date date NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE if not exists daily (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  date date NOT NULL,
  burnt float NOT NULL,
  calories float NOT NULL,
  total_fat float NOT NULL,
  carbs float NOT NULL,
  protein float NOT NULL,
  sugars float NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);