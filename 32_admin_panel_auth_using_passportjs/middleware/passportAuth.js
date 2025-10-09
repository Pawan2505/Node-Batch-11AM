const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admin.model");

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: "email",
}, async (email, password, done) => {
    try {
        const adminRecord = await Admin.findOne({ email: email });
        if (!adminRecord) return done(null, false);

        if (adminRecord.password === password) return done(null, adminRecord);
        return done(null, false);
    } catch (err) {
        return done(err);
    }
}));

// Serialize & Deserialize
passport.serializeUser((admin, done) => done(null, admin.id));

passport.deserializeUser(async (id, done) => {
    try {
        const adminRecord = await Admin.findById(id);
        if (adminRecord) done(null, adminRecord);
        else done(new Error("Admin not found"));
    } catch (err) {
        done(err);
    }
});

// Authentication check
passport.checkauthentication = (req, res, next) => {
    if (req.isAuthenticated()){
      return next();
    }
    return res.redirect('/');
};

// Set authenticated user in session
passport.setAuthenticatedUser = (req, res, next) => {
    if (req.session){
       req.session.user = req.user;
    }
    next();
};

module.exports = passport;