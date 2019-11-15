CREATE TABLE TA_USERS (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL UNIQUE,
  online tinyint(1),
  joined datetime,
  last_active datetime,
  PRIMARY KEY (id)
);

CREATE TABLE TA_ROOMS (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) UNIQUE,
  type int,
  PRIMARY KEY (id)
);

CREATE TABLE RE_USERS_ROOMS (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  room_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES TA_USERS(id),
  FOREIGN KEY (room_id) REFERENCES TA_ROOMS(id)
);

CREATE TABLE TA_MESSAGES (
  id int NOT NULL AUTO_INCREMENT,
  sender_id int,
  room_id int,
  content text,
  created_at datetime,
  PRIMARY KEY (id),
  FOREIGN KEY (sender_id) REFERENCES TA_USERS(id),
  FOREIGN KEY (room_id) REFERENCES TA_ROOMS(id)
);
