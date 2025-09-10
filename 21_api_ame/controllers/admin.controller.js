const AdminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");

module.exports.adminRegister = async (req, res) => {
  try {
    const existAdmin = await AdminModel.findOne({ email: req.body.email });

    if (!existAdmin) {
      if (req.body.password == req.body.confirm_password) {
        if (req.file) {
          req.body.image = AdminModel.adminPath + "/" + req.file.filename;
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.status = "Active";
        req.body.created_date = moment().format("YYYY-MM-DD HH:mm:ss");
        req.body.updated_date = Date.now();

        const newAdmin = await AdminModel.create(req.body);

        return res
          .status(200)
          .json({ message: "new admin created successfully!", data: newAdmin });
      } else {
        return res.status(200).json({ message: "Password not same!" });
      }
    } else {
      return res
        .status(200)
        .json({ message: "Admin already Register!, Please Login" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Internal server error!" });
  }
};

module.exports.adminLogin = async (req, res) => {
  try {
    console.log(req.body);
    const existAdmin = await AdminModel.findOne({ email: req.body.email });

    if (!existAdmin) {
      return res
        .status(200)
        .json({ message: "User does not exist please register!" });
    } else {
      if (await bcrypt.compare(req.body.password, existAdmin.password)) {

        const token = jwt.sign(
          {
            admindata: existAdmin,
          },
          "secret",
          { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login Successfully!", data:token });
      } else {
        return res.status(200).json({ message: "Password Incorrect!" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Internal server error!" });
  }
};

module.exports.adminProfile = async (req, res) => {
  try {
    return res.status(200).json({ message: "Admin Profile!", data: req.user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Internal server error!" });
  }
};

module.exports.changePassword =  async(req,res)=>{
  try{
   const {cpass, npass, confirm_pass} = req.body;

   let matchPass = await bcrypt.compare(cpass,req.user.admindata.password);

   if(matchPass){

    if(npass !== confirm_pass){
      return res.status(200).json({message:"New Password and Confirm Password not matched!"});
    }

    const hashpass = await bcrypt.hash(npass,10);

    const updatepassword = await AdminModel.findByIdAndUpdate(req.user.admindata._id,{password:hashpass})

    return res.status(200).json({message:"Admin Password Changed Successfully!",data:updatepassword});
   }else{
      return res.status(400).json({ message: "Current password is incorrect!" });
   }

  }catch(err){
    console.log(err);
    return res.status(400).json({ message: "Internal server error!" });
  }
}
