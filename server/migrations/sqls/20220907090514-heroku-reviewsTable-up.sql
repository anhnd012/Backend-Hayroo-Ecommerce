/* Replace with your SQL commands */

CREATE TABLE  public."Reviews"
(
    review_id serial PRIMARY KEY,
    rating int NOT NULL,
    user_id int NOT NULL,
    prod_id int NOT NULL,
    review_status int default 0 NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_Reviews_user_id 
        FOREIGN KEY(user_id)
            REFERENCES public."Users"(user_id),

    CONSTRAINT fk_Reviews_product_id 
        FOREIGN KEY(prod_id)
            REFERENCES public."Products"(prod_id)
);