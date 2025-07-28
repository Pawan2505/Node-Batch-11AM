const express = require('express');
const fs = require('fs');
const path = require('path');

const port = 8000;


const app = express();


app.get('/', (req,res)=>{
    // return res.end("<h1>This is Home Page</h1>")
    fs.readFile(path.join(__dirname,'views',"home.html"), 'utf8', (err,data)=>{
        if(err){
            console.log(err);
            return false;
        }

        return res.end(data);
    })
})

app.get('/about',(req,res)=>{
    //  return res.end("<h1>This is About Page</h1>")
       fs.readFile(path.join(__dirname,'views',"about.html"), (err,data)=>{
        if(err){
            console.log(err);
            return false;
        }

        return res.end(data);
    })
})


app.get('/contact',(req,res)=>{
    //  return res.end("<h1>This is Contact Page</h1>")
       fs.readFile(path.join(__dirname,'views',"contact.html"), (err,data)=>{
        if(err){
            console.log(err);
            return false;
        }

        return res.end(data);
    })
})
app.get('/*"*"',(req,res)=>{
    //  return res.end("<h1>Page Not Found!</h1>")
       fs.readFile(path.join(__dirname,'views',"404.html"), (err,data)=>{
        if(err){
            console.log(err);
            return false;
        }

        return res.end(data);
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server start on port ", port)
})