# 📘 Node.js Authentication Flow (Register & Login)

---

## **Step 1 : Add Users Route in `app.js`**

```js
app.use('/users', require('./routes/users.routes'));
```

➡ This mounts all **user-related routes** under `/users`.

---

## **Step 2 : Users Router (`routes/users.routes.js`)**

```js
const express = require('express');
const Users = require('../controllers/users.controller');

const routers = express.Router();

// User Routes
routers.post('/userRegister', Users.userRegister);
routers.post('/userLogin', Users.userLogin);

module.exports = routers;
```

➡ `Routers` handle API endpoints and call **controller functions**.

---

## **Step 3 : Users Model (`models/users.model.js`)**

```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
```

➡ Defines how user data will be stored in **MongoDB**.

---

## **Step 4 : Users Controller (`controllers/users.controller.js`)**

### **1. User Register**

```js
const Users = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userRegister = async (req, res) => {
    try {
        console.log(req.body);

        // Check if user already exists
        let existingUser = await Users.findOne({ email: req.body.email });
        if (!existingUser) {

            // Check password match
            if (req.body.password === req.body.confirm_password) {

                // Hash password
                req.body.password = await bcrypt.hash(req.body.password, 10);

                // Create user
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

➡ **Flow**: Check user → Validate password → Hash password → Save to DB.

---

### **2. User Login**

```js
module.exports.userLogin = async (req, res) => {
    try {
        console.log(req.body);

        // Check user exists
        let emailExist = await Users.findOne({ email: req.body.email });

        if (emailExist) {

            // Compare password
            if (await bcrypt.compare(req.body.password, emailExist.password)) {

                // Generate JWT token
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

➡ **Flow**: Find user → Compare password → Generate JWT → Send response.

---

## **Summary**

1. **app.js** → add routes.
2. **Router** → Defines API endpoints.
3. **Model** → Defines schema for users in MongoDB.
4. **Controller** → Handles business logic:

   * `userRegister`: New user signup with password hashing.
   * `userLogin`: Login with password verification + JWT token.

---

