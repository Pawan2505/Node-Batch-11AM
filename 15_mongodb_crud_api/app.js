const express = require('express');
const db = require('./config/db')
const path = require('path');

const port = 8000;
const app = express();

app.use(express.urlencoded({extended:true}))

app.use('/',require('./routes/student.routes'))


app.listen(port, (err) => {
    if(err){
        console.log(err);
        return false;

    }
  console.log(`Server is running on http://localhost:${port}`);
});