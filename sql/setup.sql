DROP TABLE IF EXISTS manufacturer CASCADE;
DROP TABLE IF EXISTS receiver; 

CREATE TABLE manufacturer (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name TEXT NOT NULL,
country TEXT NOT NULL
)

CREATE TABLE receiver (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  model TEXT NOT NULL,
  year INTEGER NOT NULL

)