const express = require('express');
const db = require('./config/db')
const port = 8000;

const app = express();
app.use(express.urlencoded());

app.use('/',require('./routes/index.routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`server started at port : http://localhost:${port}`);
    }
})