const express = require('express');
const Admin = require('../controllers/admin.controller');

const router = express.Router();

console.log("Router connected..");


router.get('/dashboard', Admin.dashboard);


module.exports = router;