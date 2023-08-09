/* Replace with your SQL commands */

CREATE TABLE  public."Carts"
(
    cart_id serial PRIMARY KEY,
    user_id int NOT NULL,
    total_price float not null default 0.0,

    CONSTRAINT fk_Carts_user_id 
        FOREIGN KEY(user_id)
            REFERENCES public."Users"(user_id)
);