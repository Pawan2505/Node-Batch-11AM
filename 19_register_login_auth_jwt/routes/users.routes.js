const express = require('express');
const Users = require('../controllers/users.controller')

const router = express.Router();

console.log("User routes");

router.post('/userRegister',Users.userRegister)


module.exports = router;