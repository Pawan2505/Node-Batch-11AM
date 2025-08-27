const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    confirm_password:{
        type:String,
        require:true
    },
})

const UserModels = mongoose.model('Users',UserModel);

module.exports = UserModels;