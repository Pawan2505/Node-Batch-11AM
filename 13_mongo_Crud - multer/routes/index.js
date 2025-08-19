const express = require('express');
const adminCtl = require('../controllers/adminController');

const multer = require('multer')

const routes = express.Router();

console.log("Routes loaded");


// multer start
const filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: filestorage }).single('image')

// multer end

routes.get('/', adminCtl.home);
routes.post('/addDetails',upload,adminCtl.addAdmin);
routes.get('/editDetails/:id', adminCtl.editAdmin);
routes.post('/updateDetails/:id',upload, adminCtl.updateAdmin);
routes.get('/deleteDetails/:id', adminCtl.deleteAdmin);

module.exports = routes;