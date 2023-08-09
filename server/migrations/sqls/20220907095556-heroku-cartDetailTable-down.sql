/* Replace with your SQL commands */

ALTER TABLE public."CartDetail" DROP CONSTRAINT fk_CartDetail_prod_id;
ALTER TABLE public."CartDetail" DROP CONSTRAINT fk_CartDetail_cart_id;

DROP TABLE public."CartDetail";