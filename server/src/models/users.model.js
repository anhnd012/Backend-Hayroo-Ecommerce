const { query } = require('express');
const joi = require('joi');

// const { query } = require('../config/db.config');
// const { sign_up } = require('../sql/query');

const Users = joi.object().keys({

    user_id: joi.number().integer(),
    username: joi.string().required(),
    user_password: joi.string().required(),
    confirm_password: joi.ref("user_password"),
    gmail: joi.string().email({ tlds: { allow : ['com', 'net'] }}).required(),
    phone_number: joi.number().integer(),
    user_role: joi.number().integer().max(1).default(0).valid(0,1),
    user_image: joi.any().meta({swaggerType: 'file'}).optional()
            .description('Image File').default('user.png'),
    created_on: joi.date().iso(),

});



module.exports = {
    Users,
    constructor
}

