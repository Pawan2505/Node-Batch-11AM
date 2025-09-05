const express = require('express');
const auth = require('./config/authAdmin')
const path = require('path')
const db = require('./config/db')

const port = 8000;

const app = express();
app.use(express.urlencoded({extended:true}))

app.set('uploads',path.join(__dirname,'uploads'));

app.use('/student',auth, require('./routes/students.routes'));
app.use('/users', require('./routes/users.routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    else{
        console.log("server start at port",port);
    }
})
