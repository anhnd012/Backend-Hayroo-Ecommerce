/* Replace with your SQL commands */

CREATE TABLE  public."OrderDetail"
(
    order_detail_id serial PRIMARY KEY,
    prod_id int NOT NULL,
    quantity int NOT NULL default 0,
    subtotal float NOT NULL default 0.0,
    order_id int NOT NULL,

    CONSTRAINT fk_OrderDetail_prod_id 
        FOREIGN KEY(prod_id)
            REFERENCES public."Products"(prod_id),

    CONSTRAINT fk_OrderDetail_order_id 
        FOREIGN KEY(order_id)
            REFERENCES public."Orders"(order_id)

);