var passport = require('passport');
var LocalStrategy = require('passport-local');
const AdminModel = require('../models/adminModel')

passport.use(new LocalStrategy(
  function(username, password, done) {
   try{
    const admin = AdminModel.findOne({ username: username });

   if(!admin){
    return done(null, false);
   }

    if(admin.password == password){
        return done(null, admin);
    }

   }catch(err){
    return done(err);
   }
    }

));


