const express = require('express');
const adminCtl = require('../controllers/adminController');
const multer = require('multer');



const routes = express.Router();

console.log("Routes loaded");



routes.get('/', adminCtl.home);
routes.post('/addDetails', adminCtl.addAdmin);
routes.get('/editDetails/:id', adminCtl.editAdmin);
routes.post('/updateDetails/:id', adminCtl.updateAdmin);
routes.get('/deleteDetails/:id', adminCtl.deleteAdmin);

module.exports = routes;