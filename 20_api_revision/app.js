const express = require('express');

const db = require('./config/db')

const port = 8000;

const app = express();
app.use(express.urlencoded({extended:true}))

app.use('/student', require('./routes/students.routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    else{
        console.log("server start at port",port);
    }
})
