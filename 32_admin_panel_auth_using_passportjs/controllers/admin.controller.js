const AdminModel = require("../models/admin.model");
const fs = require("fs");
const path = require("path");

module.exports.SignIn = async (req, res) => {
  try {
    return res.render("SignIn");
  } catch (err) {}
};

module.exports.checkEmail = async (req, res) => {
  try {
   
    console.log(req.body);
    const existAdmin = await AdminModel.findOne({email:req.body.email});

    if(existAdmin){

      if(req.body.password === existAdmin.password){
       
        return res.redirect('/dashboard');
      }

    }else{
      console.log("Please register!");
    }

  } catch (err) {
    console.log(err.message);
  }
};


module.exports.logout = async(req,res)=>{
  req.logout((err) => {
    if (err) {
      console.log("Logout error:", err.message);
    }
    return res.render("SignIn");
  });
}

module.exports.changePassword = async(req,res)=>{
  try{

    return res.render('changePassword',{data:req.user});

  }catch(err){
    console.log(err.message);
    return res.render('404',{err});
  }
}


module.exports.checkChangePassword = async(req,res)=>{
  try{

    const oldPassword = req.cookies.userId.password;

    if(oldPassword === req.body.cpassword){
      
      if(req.body.npassword === req.body.confirm_password){


        req.body.password = req.body.npassword;

        await AdminModel.findByIdAndUpdate(req.cookies.userId._id,{password:req.body.password});

        return res.redirect('/dashboard');
      }
    }

  }catch(err){
     console.log(err.message);
    return res.render('404',{err});
  }
}

module.exports.dashboard = async (req, res) => {
  console.log(req.user);
  try {
     return res.render("dashboard", {
      data: req.user, // Pass the authenticated user to the view
    });
  } catch (err) {
    console.log("Error loading dashboard:", err.message);
    return res.redirect("back");
  }
};

module.exports.profile = async(req,res)=>{
  try{

    return res.render('profile',{data:req.cookies.userId});

  }catch(err){
    console.log("Error loading profile page:", err.message);
    return res.redirect("back");
  }
}

module.exports.add_admin = async (req, res) => {
  try {
    const userData = req.user; 
    res.render('add_admin', { data: userData });
  } catch (err) {
    console.log("Error loading add_admin page:", err.message);
    return res.redirect("back");
  }
};

module.exports.view_admin = async (req, res) => {
  try {
     const userData = req.user; 
    let alladmindetails = await AdminModel.find();
    res.render("view_admin", {
      alladmindetails: alladmindetails,
      data: userData
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching admin details");
  }
};

module.exports.insertData = async (req, res) => {
  try {
    req.body.name = req.body.fname + " " + req.body.lname;
    req.body.avatar = "";

    if (req.file) {
      req.body.avatar = AdminModel.adminImagePath + "/" + req.file.filename;
    }

    let adminRecord = await AdminModel.create(req.body);

    if (adminRecord) {
      console.log("Admin Record Inserted");
      return res.redirect("/add_admin");
    } else {
      console.log("Error in Inserting Admin Record!");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in Inserting Admin Record: ", err);
    return res.redirect("back");
  }
};

module.exports.editdetails = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);

    let adminDetails = await AdminModel.findById(id);
    console.log(adminDetails);
 const userData = req.user; 
    return res.render("edit_admin", { adminDetails:adminDetails,data:userData });
  } catch (error) {
    console.log(error);
    return res.redirect("/editdetails");
  }
};

module.exports.update_admin = async (req, res) => {
  try {
    const _id = req.params._id;
    let oldAdmin = await AdminModel.findById(_id);

    if (!oldAdmin) {
      console.log("Admin not found");
      return res.redirect("back");
    }

    req.body.name = req.body.fname + " " + req.body.lname;

    if (req.file) {
      let oldPath = path.join(__dirname, "..", oldAdmin.avatar);
      try {
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
          console.log("Old image deleted");
        }
      } catch (err) {
        console.log("Image delete error:", err.message);
      }

      req.body.avatar = AdminModel.adminImagePath + "/" + req.file.filename;
    } else {
      req.body.avatar = oldAdmin.avatar;
    }

    await AdminModel.findByIdAndUpdate(_id, req.body);

    console.log("Admin updated successfully");
    return res.redirect("/view_admin");
  } catch (error) {
    console.log("Error updating admin:", error.message);
    return res.redirect("back");
  }
};

module.exports.deleteData = async (req, res) => {
  try {
    let id = req.params.id;
    console.log("ID to delete:", id);

    let adminData = await AdminModel.findById(id);

    if (adminData) {
      let imgPath = path.join(__dirname, "..", adminData.avatar);
      console.log("Deleting file:", imgPath);

      try {
        fs.unlinkSync(imgPath);
      } catch (err) {
        console.log("Image delete failed or already removed:", err.message);
      }

      await AdminModel.findByIdAndDelete(id);
      console.log("Admin deleted successfully");
      return res.redirect("/view_admin");
    } else {
      console.log("Admin not found");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in deleting admin: ", error.message);
    return res.redirect("back");
  }
};
