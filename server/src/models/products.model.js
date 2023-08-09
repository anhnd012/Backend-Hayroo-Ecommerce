const joi = require('joi');

const productModel = joi.object({

    prod_id : joi.number().integer(),
    prod_name : joi.string().required(),
    prod_description: joi.string().required(),
    category_id: joi.number().integer().required(),
    sold: joi.number().integer(),
    quantity: joi.number().integer().required(),
    prod_image: joi.any().meta({swaggerType: 'file'}).optional()
    .description('Image File'),
    price: joi.number().required(),
    prod_status: joi.number().valid(0, 1).required(),
    created_at: joi.date().iso(),
    updated_at: joi.date().iso()

});


const productModel_prod_id = joi.number().integer();


module.exports = {
    productModel,
    productModel_prod_id,

}
