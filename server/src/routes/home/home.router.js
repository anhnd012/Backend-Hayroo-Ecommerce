const express = require('express');
const passport = require('passport');

const homeRouter = express.Router();

function checkLogin (req, res, next){
    if(!req.isAuthenticated()){
        return  res.status(401).json({
            error: 'You must log in'
        })
    }
    next();
}

homeRouter.get('/', checkLogin, (req, res) => {
    // console.log(req.user);
    // return res.redirect('/v1/users/')
    return res.status(200).json({
        message: 'success'
    })
});


module.exports = {
    homeRouter,
    checkLogin,
}