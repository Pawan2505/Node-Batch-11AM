const mongoose = require('mongoose');

const multer = require('multer')

const AdminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    hobby: {
        type: Array,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true
    }

});

const adminPath = "uploads/adminImages";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, adminPath);
  },
  filename: function(req, file, cb) {

    cb(null, file.originalname);
  }
});


AdminSchema.statics.uploadadmin = multer({ storage: storage }).single('avatar');
AdminSchema.statics.adminImagePath = adminPath;

const Admin = mongoose.model('admin',AdminSchema);
module.exports = Admin;

