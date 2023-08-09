const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { query } = require('./db.config');
const { sign_in, get_user_from_gmail } = require('../sql/query');
const bcrypt = require('bcrypt');

const verifyCallback = async (gmail, password, done) => {
    try{
        const response = await query(sign_in, [gmail]);
        const userPassword = response.rows[0].user_password;
        console.log(userPassword);
        if(!userPassword){
            return done(null, false);
        } else{
            if(await bcrypt.compare(password, userPassword)){
                const User = await query(get_user_from_gmail,[gmail]);
                console.log(User.rows);
                return done(null, User.rows);
            }else{
                return done(null, false);
            }
        }

    }catch(err){
        console.log(err.stack);
    }
}

const customFields = {
    usernameField: 'gmail',
    passwordField: 'password',
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user[0].user_id);
});

passport.deserializeUser((userID, done) => {
    done(null, userID);
})





