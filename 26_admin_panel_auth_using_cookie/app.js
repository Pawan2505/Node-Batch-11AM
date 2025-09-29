const express = require('express');
const db = require('./config/db');
const port = 8000;
const path = require('path');
var cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser())
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads/')));

app.use(express.urlencoded({extended:true}));

app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }else{
        console.log("server start on port :",port);
    }
})