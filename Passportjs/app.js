const express = require('express');
const port = 8000;
const path = require('path')
const db = require('./config/db')
const app = express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded());


// passport and session start

const session = require('express-session');
const MongoStore = require('connect-mongo');
var passport = require('passport');

app.use(session({
    name: 'testing',
    secret: 'mybatch',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));



// passport and session end




app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }

    console.log("server start at port : ", port);
})