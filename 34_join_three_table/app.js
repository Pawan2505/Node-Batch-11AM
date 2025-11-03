const express = require('express');
const db = require('./config/db');
const path = require('path');
const port = 8000;
const bodyParser = require("body-parser");
const app = express();


app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'views'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
app.use("/category", categoryRoutes);
app.use("/subCategory", subCategoryRoutes);
app.use("/product", productRoutes);



app.get("/", (req, res) => {
  res.render("index");
});


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server start at port : ", port);
})