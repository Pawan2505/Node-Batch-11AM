const AdminModel= require('../models/adminModel');


module.exports.homePage = (req,res)=>{
    try{

        return render("home");

    }catch(err){
        console.log(err)
        return res.render("404");
    }
};

module.exports.productsPage = (req,res)=>{
    try{
        return res.render("products");
    }catch(err){
        console.log(err)
        return res.render("404");
    }
};

module.exports.loginPage = (req,res)=>{
    try{
        return res.render("login");
    }catch(err){
        console.log(err)
        return res.render("404");
    }   
};

module.exports.checkLogin = async(req,res)=>{
    try{
        const {username, password} = req.body;
        const adminData = await AdminModel.findOne({username:username});
        if(adminData){
            if(adminData.password === password){
                return res.render("home");
            }else{
                return res.send("Invalid Password");
            }
        }else{
            return res.send("User Not Found");
        }
    }catch(err){
        console.log(err)
        return res.render("404");
    }
}

module.exports.registerPage = (req,res)=>{
    try{
        return res.render("signup");
    }catch(err){
        console.log(err)
        return res.render("404");
    }
};

module.exports.registerUser = async(req,res)=>{
    try{
        const {username, password} = req.body;
        const adminData = await AdminModel.findOne({username:username});
        if(adminData){
            return res.send("User Already Exists"); 
        }
        const newAdmin = await AdminModel.create({
            username : username,
            password : password
        });

        if(!newAdmin){
            return res.send("Error in Registration");
        }

        return res.send("Registration Successful");
    }catch(err){
        console.log(err)
        return res.render("404");
    }
};
