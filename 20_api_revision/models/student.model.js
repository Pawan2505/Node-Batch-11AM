const mongoose = require('mongoose');
const multer = require('multer');

let imgPath = "uploads/Students/"

const studentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
       type:String,
       required:true 
    }

})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/Students/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

studentSchema.statics.Studentupload = multer({ storage: storage }).single('image');

studentSchema.statics.imgPath = imgPath;

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;