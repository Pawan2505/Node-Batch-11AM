<<<<<<< HEAD
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


const ManagerSchema = new mongoose.Schema({
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
    phone:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
    },
    status:{
        type:String,
        default:"active",
    },
    created_date:{
        type:String,
    },
    updated_date:{
        type:String,
    },
})

=======
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
>>>>>>> b069faab690183fe52ad7c726956c19ced576c76


const managerImagePath = "uploads/managerImage";

const storage = multer.diskStorage({
<<<<<<< HEAD
    destination:(req,file,cb)=>{
        cb(null,managerImagePath);
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+path(file.originalname));
    }
})


ManagerSchema.statics.managerUpload = multer({storage:storage}).single('image');
ManagerSchema.statics.mamangerImagePath = managerImagePath;


const Manager = mongoose.model('"Manager',ManagerSchema);
=======
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
>>>>>>> b069faab690183fe52ad7c726956c19ced576c76

module.exports = Manager;