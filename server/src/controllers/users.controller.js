const { query } = require('../config/db.config')
const { sign_up, sign_in } = require('../sql/query');
const bcrypt = require('bcrypt');

const { Users } = require('../models/users.model');
const { create } = require('../sql/query');




async function signUp(req, res) {

    //Get data
    const created_on = new Date();
    // Initialize userObject
    const userObject = {
        ...req.body,
        created_on
    };

    console.log(userObject);

    try {
        // Encrypt password 
        const hashedPassword = await bcrypt.hash(req.body.user_password, 10);
        const validate = await Users.validateAsync(userObject);
        // const response = await query(sign_up, [userObject.user_name, 
        //     hashedPassword, userObject.gmail, created_on]);

        delete userObject.confirm_password;
        userObject.user_password = hashedPassword;
        console.log(userObject);
        let userCreated = Object.values(userObject);
        const sqlCreate = await create("Users", userObject);
        
        const response = await query(sqlCreate, userCreated);
        return res.status(200).json({
            message: validate
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
    
}

async function signIn(req, res) {

    const userObject = {
        ...req.body,
        created_on
    }
    console.log(userObject);
    try {
        const validate = await user.validateAsync(userObject);
        const response = await query(sign_in, [userObject.gmail]);
        const userPassword = response.rows[0].user_password;
        console.log(userPassword);
        if (!userPassword) {
            return res.status(404).json({
                error: "Wrong gmail"
            })
        } else {

            if (await bcrypt.compare(password, userPassword)) {
                return res.status(200).json({
                    message: 'Sign in success'
                })

            } else {
                return res.status(404).json({
                    error: "Wrong password"
                })
            }
        }

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}



async function settingUser(req, res) {
    const { } = req.body;
}



module.exports = {
    signUp,
    signIn

}