const express = require('express');
const passport = require('passport');

// Passport


const userRouter = express.Router();

const { signUp, signIn } = require('../../controllers/users.controller');
// const { checkLogin } = require('../passport_config');

userRouter.post('/signup', signUp);
// userRouter.post('/signin', signIn);

userRouter.post('/signin', passport.authenticate('local', 
    { failureRedirect: '/v1/users/signin-failure', successRedirect: '/v1/'}));


userRouter.get('/signin-failure', (req, res) => {
    return res.status(404).json({
        message: "Wrong password or gmail"
    })
})

userRouter.get('/logout', (req, res) => {
    req.logout();
    return res.status(200).json({
        message: "Delete success"
    })
})


module.exports = userRouter;