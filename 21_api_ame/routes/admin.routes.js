const express = require('express');
const Admin = require('../controllers/admin.controller');
const AdminModel = require('../models/admin.model');

const auth = require('../config/authAdmin');

const router = express.Router();

router.post('/adminRegistration',AdminModel.adminUpload, Admin.adminRegister)
router.post('/adminLogin',Admin.adminLogin);
router.get('/adminProfile',auth, Admin.adminProfile);
router.post('/changePassword',auth,Admin.changePassword);

// Foprget Password

router.post('/checkEmail', Admin.checkEmail);
router.post('/verifyOTP' ,Admin.verifyOTP);

module.exports = router;