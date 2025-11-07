const express = require('express');
const Admin = require('../controllers/admin');

const router = express.Router();

console.log("Routting...");



router.get('/',Admin.loginPage);

router.post('/checkLogin',Admin.checkLogin);

router.get('/register',Admin.registerPage);

router.post('/register_user',Admin.registerUser);

router.get('/home',Admin.homePage);
router.get('/products',Admin.productsPage);

module.exports = router;