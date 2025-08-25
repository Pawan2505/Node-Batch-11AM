const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imgPath = "uploads/faculties";

const facultySchema = new mongoose.Schema({
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
     required:false
     },
  created_date: {
     type: Date,
      default: Date.now 
    },
  updated_date: { 
    type: Date,
     default: Date.now 
    },
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,"..",imgPath) )
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

facultySchema.statics.uploadImage = multer({ storage: storage }).single("image");
facultySchema.statics.imagePath = imgPath;


const Faculty = mongoose.model('Faculty',facultySchema);

module.exports = Faculty;