const express = require('express');
const db = require('./config/db');
var cors = require('cors')
const path = require('path');
const port = 8000;

const app = express();
app.use(express.urlencoded());
app.use(cors())
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/api/user',require('./routes/user.route'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }else{
        console.log("server start at port : ",port);
    }
})