

### **Step 1: `app.js` → Passport Configuration**

```javascript
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');

app.use(session({
    name: 'testing',
    secret: 'mybatch',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
```

---

### **Step 2: Passport Local Strategy**

```javascript
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admin");

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
    if (req.isAuthenticated()) return next();
    return res.redirect('/');
};

// Set authenticated user in session
passport.setAuthenticatedUser = (req, res, next) => {
    if (req.session) req.session.user = req.user;
    next();
};

module.exports = passport;
```

---

### **Step 3: Routes**

```javascript
const passport = require('passport');

// Public Routes
routes.get('/', adminCtl.SignIn);
routes.post('/checkLogin', passport.authenticate('local', {
    failureRedirect: '/', 
    failureFlash: true
}), adminCtl.checkLogin);

routes.get('/changePassword', adminCtl.changePassword);
routes.post('/checkChangePassword', adminCtl.checkChangePassword);

routes.get('/profile', passport.checkauthentication, adminCtl.profile);
```
