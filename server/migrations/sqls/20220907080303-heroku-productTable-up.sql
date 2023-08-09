/* Replace with your SQL commands */

CREATE TABLE  public."Products"
(
    prod_id serial PRIMARY KEY,
    prod_name text UNIQUE NOT NULL,
    prod_description text NOT NULL,
    category_id int not null,
    sold int default 0 NOT NULL,
    quantity int default 0 NOT NULL,
    prod_image text default 'product.png',
    price float NOT NULL default 0.0,
    prod_status int default 0 NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_Products_category_id 
        FOREIGN KEY(category_id)
            REFERENCES public."Categories"(category_id)
);