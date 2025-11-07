const express = require("express");
const path = require("path");
const todoRoutes = require("./routes/todoRoutes");
require('./config/db');
const port = 8000;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'views'));

// Routes
app.use("/", todoRoutes);

// Server
app.listen(port, (err) => {
    if(err){
        console.log(err);
        return false;
    }
  console.log("Server running on :  http://localhost:8000");
});
