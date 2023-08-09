/* Replace with your SQL commands */

CREATE TABLE  public."Categories"
(
    category_id serial PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    cate_description text NOT NULL,
    cate_image text NOT NULL default 'category.png',
    cate_status int default 0 NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL 
);