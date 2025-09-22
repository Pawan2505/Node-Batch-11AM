const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");


const ManagerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
  },
  created_date: {
    type: String,
  },
  updated_date: {
    type: String,
  },
});


const managerImagePath = "uploads/managerImage";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, managerImagePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});



ManagerSchema.statics.managerUpload =multer({ storage: storage }).single('image');
ManagerSchema.statics.managerImagePath = managerImagePath;

const Manager = mongoose.model("Manager", ManagerSchema);

module.exports = Manager;