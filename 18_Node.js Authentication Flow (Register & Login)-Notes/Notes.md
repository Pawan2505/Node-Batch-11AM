# 📘 Node.js Backend – Authentication & Authorization (Register, Login, Middleware)

---

## **Step 1 : Main Server (`app.js`)**

```js
const express = require('express');
const db = require('./config/db');
const path = require('path');
const port = 8000;
const authUser = require('./config/authUser');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', authUser, require('./routes/student.routes'));
app.use('/faculty', authUser, require('./routes/faculties.routes'));
app.use('/users', require('./routes/users.routes'));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(port, (err) => {
  if (err) console.error(`Error starting server: ${err}`);
  else console.log(`Server is running on http://localhost:${port}`);
});
```

➡ Sets up server, middleware, routes, and static file handling.

---

## **Step 2 : Users Router (`routes/users.routes.js`)**

```js
const express = require('express');
const Users = require('../controllers/users.controller');

const routers = express.Router();

routers.post('/userRegister', Users.userRegister);
routers.post('/userLogin', Users.userLogin);

module.exports = routers;
```

➡ Defines **API endpoints** for user registration & login.

---

## **Step 3 : Users Model (`models/users.model.js`)**

```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
```

➡ Mongoose schema for storing user data.

---

## **Step 4 : Users Controller (`controllers/users.controller.js`)**

### **User Register**

```js
const Users = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userRegister = async (req, res) => {
  try {
    console.log(req.body);

    let existingUser = await Users.findOne({ email: req.body.email });
    if (!existingUser) {
      if (req.body.password === req.body.confirm_password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);

        let newUser = await Users.create(req.body);
        if (newUser) {
          return res.status(201).json({ 
            message: 'User registered successfully', 
            data: newUser 
          });
        }
      } else {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
    } else {
      return res.status(400).json({ message: 'User already exists' });
    }
  } catch (error) {
    console.error(`Error in userRegister: ${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
```

---

### **User Login**

```js
module.exports.userLogin = async (req, res) => {
  try {
    console.log(req.body);

    let emailExist = await Users.findOne({ email: req.body.email });
    if (emailExist) {
      if (await bcrypt.compare(req.body.password, emailExist.password)) {
        let token = jwt.sign({ userData: emailExist }, 'RNW', { expiresIn: '1h' });

        return res.status(200).json({ 
          message: 'Login successful', 
          token: token 
        });
      } else {
        return res.status(400).json({ message: 'Invalid password' });
      }
    } else {
      return res.status(400).json({ message: 'User does not exist' });
    }
  } catch (error) {
    console.error(`Error in userLogin: ${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
```

➡ Handles **password hashing**, **login validation**, and **JWT token creation**.

---

## **Step 5 : Auth Middleware (`config/authUser.js`)**

```js
const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  let token = req.header("authorization");
  const newToken = token.slice(7, token.length); // remove "Bearer "

  console.log(newToken);

  if (!newToken) {
    return res.status(401).json({ message: "Unauthorized - Token required" });
  }

  try {
    let decoded = jwt.verify(newToken, 'RNW');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};

module.exports = authUser;
```

➡ Middleware that checks JWT token before allowing access to protected routes.

---

## **Summary**

1. **app.js** → Setup server, routes, static files.
2. **Router** → Defines endpoints (`/userRegister`, `/userLogin`).
3. **Model** → User schema for MongoDB.
4. **Controller** → Business logic: Register + Login with JWT.
5. **Middleware** → Protect routes using JWT authentication.

---
