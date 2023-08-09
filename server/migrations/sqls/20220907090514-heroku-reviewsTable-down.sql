/* Replace with your SQL commands */

ALTER TABLE public."Reviews" DROP CONSTRAINT fk_Reviews_user_id;
ALTER TABLE public."Reviews" DROP CONSTRAINT fk_Reviews_product_id;

DROP TABLE public."Reviews";