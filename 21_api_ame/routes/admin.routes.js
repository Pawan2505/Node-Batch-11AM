const express = require('express');
const Admin = require('../controllers/admin.controller');
const AdminModel = require('../models/admin.model');

const router = express.Router();

router.post('/adminRegistration',AdminModel.adminUpload, Admin.adminRegister)

module.exports = router;