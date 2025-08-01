const express = require('express')

const path = require('path')

const port = 8000

const app = express();

app.set("view engine",'ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded());

app.use((req,res,next)=>{
  console.log("You can go to next routes");
  next();
})

app.use('/',express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server start on port ",port);
})