const express = require('express');
const Admin = require('../controllers/admin.controller');
const AdminModel = require('../models/admin.model');
const router = express.Router();

console.log("Router connected..");


router.get('/', Admin.dashboard);

router.get('/add_admin', Admin.add_admin);
router.get('/view_admin', Admin.view_admin);
router.post('/insert_admin', AdminModel.uploadadmin, Admin.insertData);
router.get('/deletedetails/:id', Admin.deleteData);
router.get('/editdetails/:id', Admin.editdetails);
router.post('/update_admin/:_id', AdminModel.uploadadmin, Admin.update_admin);
module.exports = router;