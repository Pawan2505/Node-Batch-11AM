const express = require('express');
const db = require('./config/db')
const Admin = require('./models/adminTbl');
const path = require('path');
const port = 8000;


const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use('/',require('./routes/index'));


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server start on port :",port);
})