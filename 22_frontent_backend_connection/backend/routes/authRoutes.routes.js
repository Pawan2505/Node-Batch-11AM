const express = require('express');
const User = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post("/signup", User.signup);
router.post("/login", User.login);

router.get("/dashboard", authMiddleware, User.dashboard); 

module.exports = router;