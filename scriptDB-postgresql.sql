CREATE TABLE TA_USERS (
  id serial,
  name varchar(100) NOT NULL UNIQUE,
  online bool DEFAULT false,
  joined timestamp,
  last_active timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE TA_ROOMS (
  id serial,
  name varchar(255) UNIQUE,
  room_type int,
  PRIMARY KEY (id)
);

CREATE TABLE RE_USERS_ROOMS (
  id serial,
  user_id int NOT NULL,
  room_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES TA_USERS(id),
  FOREIGN KEY (room_id) REFERENCES TA_ROOMS(id)
);

CREATE TABLE TA_MESSAGES (
  id serial,
  sender_id int,
  room_id int,
  content text,
  created_at timestamp,
  seen_by text,
  PRIMARY KEY (id),
  FOREIGN KEY (sender_id) REFERENCES TA_USERS(id),
  FOREIGN KEY (room_id) REFERENCES TA_ROOMS(id)
);