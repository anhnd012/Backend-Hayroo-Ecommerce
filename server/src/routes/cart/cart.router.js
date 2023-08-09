const express = require('express');

const cartRouter = express.Router();

const { addCart, loadCartDetail } = require('../../controllers/cart.controller');
const { checkLogin } = require('../home/home.router');

cartRouter.get('/',checkLogin ,addCart);
cartRouter.get('/load-cart-detail',checkLogin, loadCartDetail);


module.exports = cartRouter;