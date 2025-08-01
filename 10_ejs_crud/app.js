
const express = require('express')
const path = require('path')

const port = 8000;

const app = express();

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname,'views'))

app.use(express.urlencoded());

const data = [
    {
        username:"Pawan",
        age:25
    },
    {
        username:"Manish",
        age:22
    },
]

app.post('/updatePerson/:pId',(req,res)=>{

    let pId = req.params.pId;

    data[pId] = req.body;

    return res.redirect('/');
})

app.get('/editPerson/:pId',(req,res)=>{

    let pId = req.params.pId;
    console.log(pId)

    let person = data[pId];

    return res.render('editPage',{person,pId});
})


app.get('/deletePerson/:pId',(req,res)=>{
    console.log(req.params.pId);
    data.splice(req.params.pId,1);
    return res.redirect('/');
})

app.post('/addPerson', (req,res)=>{
    data.push(req.body);

    return res.redirect("/");
})

app.get('/',(req,res)=>{

    return res.render('home',{data});
})

app.listen(port, (err)=>{
    if(err){
        console.log(err)
        return false;
    }
    console.log("Server started at port :- ",port);
})