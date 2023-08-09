const joi = require('joi');

const cartDetailModel = joi.object({
    cart_detail_id : joi.number().integer(),
    prod_id : joi.number().integer().required(),
    quantity: joi.number().integer().required(),
    subtotal: joi.number(),
    cart_id: joi.number().integer().required()
})

const cartDetailModel_cartID = joi.number().integer().required();



module.exports = {
    cartDetailModel,
    cartDetailModel_cartID
}