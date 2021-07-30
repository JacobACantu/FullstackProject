DROP DATABASE IF EXISTS favorite_books;
CREATE DATABASE favorite_books;
\c favorite_books;

DROP TABLE IF EXISTS customer_info CASCADE;
DROP TABLE IF EXISTS books; 

CREATE TABLE customer_info (
    user_id SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    age INTEGER
);


CREATE TABLE books (
    author VARCHAR(255),
    "title" VARCHAR(255),
    "genre" VARCHAR(255),
    user_id INT NOT NULL REFERENCES customer_info (user_id) ON DELETE CASCADE
);





