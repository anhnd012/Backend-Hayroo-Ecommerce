const joi = require('joi');

const cartsModel = joi.object({
    cart_id : joi.number().integer(),
    user_id : joi.number().integer(),
    total_price: joi.number()
})

const cartsModel_id = joi.number().integer();


module.exports = {
    cartsModel_id,
    cartsModel
};
