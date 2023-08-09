const joi = require('joi');

const categoryModel = joi.object({

    category_id : joi.number().integer().disallow(null),
    category_name : joi.string().required(),
    cate_description: joi.string().required(),
    cate_image: joi.any().meta({swaggerType: 'file'}).optional()
    .description('Image File'),
    cate_status: joi.number().valid(0, 1),
    created_at: joi.date().iso(),
    updated_at: joi.date().iso()

});

const categoryModel_category_id = joi.number().integer().disallow(null);

module.exports = {
    categoryModel,
    categoryModel_category_id
}

