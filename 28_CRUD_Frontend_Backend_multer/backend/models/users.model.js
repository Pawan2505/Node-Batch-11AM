const mongoose = require('mongoose');
const multer = require('multer');

const UserSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    file:{
        type:String,
    }
})

const userPath = 'uploads/usersImage';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userPath)
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  }
})


UserSchema.statics.uploadUser = multer({ storage: storage }).single('file');
UserSchema.statics.imgPath = userPath;

const User = mongoose.model('users',UserSchema);

module.exports = User;