const express = require('express');
const fs = require('fs');
const path = require('path');

const port = 8000;


const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))


const person = [
    {
        name:'Pawan',
        age:21
    }
]


app.get('/', (req,res)=>{
    return res.render('home',{person});
})

app.get('/about',(req,res)=>{
  return res.render('about')
})


app.get('/contact',(req,res)=>{
    return res.render('contact')
})
app.get('/*"*"',(req,res)=>{
  return res.render('404')
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server start on port ", port)
})