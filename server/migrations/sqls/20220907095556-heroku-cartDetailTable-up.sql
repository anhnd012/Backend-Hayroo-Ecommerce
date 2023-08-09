/* Replace with your SQL commands */

CREATE TABLE  public."CartDetail"
(
    cart_detail_id serial PRIMARY KEY,
    prod_id int NOT NULL,
    quantity int NOT NULL default 0,
    subtotal float NOT NULL default 0.0,
    cart_id int NOT NULL,

    CONSTRAINT fk_CartDetail_prod_id 
        FOREIGN KEY(prod_id)
            REFERENCES public."Products"(prod_id),

    CONSTRAINT fk_CartDetail_cart_id 
        FOREIGN KEY(cart_id)
            REFERENCES public."Carts"(cart_id)

);