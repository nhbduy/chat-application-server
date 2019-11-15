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
  seen_by text,
  PRIMARY KEY (id),
  FOREIGN KEY (sender_id) REFERENCES TA_USERS(id),
  FOREIGN KEY (room_id) REFERENCES TA_ROOMS(id)
);

/*

Execute the following query in MYSQL Workbench

ALTER USER 'root'@'localhost' IDENTIFIED
WITH mysql_native_password BY 'password'

Where root as your user localhost as your URL and password as your password

Link: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

*/
