const express = require('express');
const Admin = require('../controllers/admin.controller');
const AdminModel = require('../models/admin.model');
const AuthAdmin = require('../middleware/authAdmin');
const router = express.Router();

console.log("Router connected..");


router.get('/', Admin.SignIn);
router.post('/checkEmail',Admin.checkEmail)
router.get('/logout',Admin.logout);
router.get('/changePassword',Admin.changePassword);
router.post('/checkChangePassword',Admin.checkChangePassword);
router.get('/profile',Admin.profile);

router.get('/dashboard',AuthAdmin, Admin.dashboard);

router.get('/add_admin',AuthAdmin, Admin.add_admin);
router.get('/view_admin', AuthAdmin,Admin.view_admin);
router.post('/insert_admin',AuthAdmin, AdminModel.uploadadmin, Admin.insertData);
router.get('/deletedetails/:id',AuthAdmin, Admin.deleteData);
router.get('/editdetails/:id',AuthAdmin, Admin.editdetails);
router.post('/update_admin/:_id',AuthAdmin, AdminModel.uploadadmin, Admin.update_admin);
module.exports = router;