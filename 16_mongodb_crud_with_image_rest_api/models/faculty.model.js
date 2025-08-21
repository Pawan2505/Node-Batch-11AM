const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const imagePath = "uploads/faculties";

const FacultySchema = new mongoose.Schema({
  name: {
     type: String,
      required: true 
    },
  email: {
     type: String,
      required: true
  },
  password: {
     type: String,
      required: true
  },
  phone: {
     type: String,
      required: true
  },
  gender: {
     type: String,
      required: true
  },
  hobby: {
     type: String,
      required: true
  },
  description: {
     type: String,
      required: true
  },
  image: {
     type: String,
     required: false
  },
  created_date: {
     type: Date,
     default: Date.now
  },
  updated_date: {
     type: Date,
     default: Date.now
  },
});

// Multer storage config
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", imagePath));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

FacultySchema.statics.uploadImage = multer({ storage: imageStorage }).single("image");
FacultySchema.statics.facultyImagePath = imagePath;

const Faculty = mongoose.model("Faculty", FacultySchema);
module.exports = Faculty;
