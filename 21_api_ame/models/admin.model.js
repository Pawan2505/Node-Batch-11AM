const mongoose = require("mongoose");

const multer = require('multer');

const adminImgPath = "uploads/adminImage";


const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
  },
  updated_date: {
    type: Date,
    required: false,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, adminImgPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

adminSchema.statics.adminUpload = multer({ storage: storage }).single('image')
adminSchema.statics.adminPath = adminImgPath;


const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
