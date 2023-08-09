/* Replace with your SQL commands */

CREATE TABLE  public."Orders"
(
    order_id serial PRIMARY KEY,
    address_id int NOT NULL,
    payment_id int NOT NULL,
    order_status_id int NOT NULL,
    total float not null default 0.0,
    created_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_Orders_address_id 
        FOREIGN KEY(address_id)
            REFERENCES public."Address"(address_id),

    CONSTRAINT fk_Orders_payment_id 
        FOREIGN KEY(payment_id)
            REFERENCES public."Payments"(payment_id),

    CONSTRAINT fk_Orders_order_status_id 
        FOREIGN KEY(order_status_id)
            REFERENCES public."OrderStatus"(order_status_id)

);