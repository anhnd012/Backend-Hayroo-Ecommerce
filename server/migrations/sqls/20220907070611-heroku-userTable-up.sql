/* Replace with your SQL commands */

CREATE TABLE  public."Users"
(
    user_id serial PRIMARY KEY,
    userName VARCHAR(50) UNIQUE NOT NULL,
    user_password text NOT NULL,
    gmail VARCHAR(35) UNIQUE NOT NULL,
    phoneNumber bigint UNIQUE,
    user_role int default 0 NOT NULL,
    user_image text default 'user.png', 
    created_on TIMESTAMP NOT NULL
);