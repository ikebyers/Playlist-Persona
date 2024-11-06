-- DROP DATABASE
DROP DATABASE IF EXISTS playlist_persona;
-- CREATE DATABASE
CREATE DATABASE playlist_persona;
-- \c playlist_persona;

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name varchar(30) unique not null,
--     userName varchar(30) unique not null,
--     password varchar(30) not null
-- );
-- CREATE TABLE playlist (
--     id SERIAL PRIMARY KEY,
--     playlist_title varchar(30) NOT NULL,
--     playlist_songs varchar[] NOT NULL,
--     date_created TIMESTAMP,
--     user_id INTEGER NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );