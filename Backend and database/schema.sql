Create table user(
    id VARCHAR(50) Primary Key,
    username VARCHAR(50) Unique,
    email VARCHAR(50) unique NOT NULL,
    passwod varchar(50) NOT NULL
);