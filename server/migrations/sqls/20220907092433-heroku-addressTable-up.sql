/* Replace with your SQL commands */

CREATE TABLE  public."Address"
(
    address_id serial PRIMARY KEY,
    user_id int NOT NULL,
    addresss text not null,

    CONSTRAINT fk_Address_user_id 
        FOREIGN KEY(user_id)
            REFERENCES public."Users"(user_id)
);