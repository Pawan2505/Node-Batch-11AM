const express = require('express');
const Users = require('../controllers/users.controller')



const router = express.Router();

console.log("User router...");


router.post('/registerUser', Users.registerUser);
router.post('/loginUser',Users.loginUser);

module.exports = router;