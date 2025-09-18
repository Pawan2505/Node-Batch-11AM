const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/authRoutes.routes"));

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
        return false;
    }else{
        console.log("server start on port :",PORT);
    }
})
