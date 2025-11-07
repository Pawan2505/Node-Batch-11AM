const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/auth_otp")

const db = mongoose.connection;


db.once("open", (err) => {
    if (err) {
        console.log("DB Connection Failed!", err);
        return false;
    } else {    
        console.log("MongoDB Connected Successfully");
    }   
});

module.exports = db;
