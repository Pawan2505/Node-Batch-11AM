const AdminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


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

        return res
          .status(200)
          .json({ message: "Login Successfully!", data: token });
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

module.exports.changePassword = async (req, res) => {
  try {
    const { cpass, npass, confirm_pass } = req.body;

    let matchPass = await bcrypt.compare(cpass, req.user.admindata.password);

    if (matchPass) {
      if (npass !== confirm_pass) {
        return res
          .status(200)
          .json({ message: "New Password and Confirm Password not matched!" });
      }

      const hashpass = await bcrypt.hash(npass, 10);

      const updatepassword = await AdminModel.findByIdAndUpdate(
        req.user.admindata._id,
        { password: hashpass }
      );

      return res
        .status(200)
        .json({
          message: "Admin Password Changed Successfully!",
          data: updatepassword,
        });
    } else {
      return res
        .status(400)
        .json({ message: "Current password is incorrect!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Internal server error!" });
  }
};

module.exports.checkEmail = async(req,res)=>{
  try{

    console.log(req.body);
    const existAdmin = await AdminModel.findOne({email:req.body.email});

    if(existAdmin){
 
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "pawanaktu@gmail.com",
    pass: "qqfduryhxngaohjt",
  },
});

const otp = Math.floor(100000 + Math.random()*90000);
res.cookie('otp',otp);
res.cookie('email',req.body.email);
// Wrap in an async IIFE so we can use await.
(async () => {
  const info = await transporter.sendMail({
    from: 'pawanaktu@gmail.com',
    to: req.body.email,
    subject: "Password OTP",
    text: "You OTP is : ", // plain‑text body
    html: `You OTP is ${otp}`, // HTML body
  });

  console.log("Message sent:", info.messageId);
})();
return res.status(200).json({message:"Sent email!",data:otp});


    }else{
      return res.status(200).json({message:"Account does not exist!"});

    }


  }catch(error){
    console.log(error);
    return res.status(400).json({message:"Internal Server error!"})
  }
}


module.exports.verifyOTP = async(req,res)=>{
  try{

    const {otp} = req.body;

    console.log("OTP : ",otp);
    console.log("req.cookies.otp : ",req.cookies.otp);

    if(!otp){

    }

    if(otp == req.cookies.otp){

    }


  }catch(error){
    console.log(error);
    return res.status(400).json({message:"Internal server error!"});
  }
}