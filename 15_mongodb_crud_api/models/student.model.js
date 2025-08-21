const mongoose = require('mongoose')


const StudentSchima = new mongoose.Schema({
    name:{
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
})

const Student = mongoose.model('student',StudentSchima);

module.exports = Student;