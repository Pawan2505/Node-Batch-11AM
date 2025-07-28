const express = require('express');

const port = 8000;


const app = express();


app.get('/', (req,res)=>{
    return res.end("<h1>This is Home Page</h1>")
})

app.get('/about',(req,res)=>{
     return res.end("<h1>This is About Page</h1>")
})


app.get('/contact',(req,res)=>{
     return res.end("<h1>This is Contact Page</h1>")
})
app.get('/*"*"',(req,res)=>{
     return res.end("<h1>Page Not Found!</h1>")
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server start on port ", port)
})