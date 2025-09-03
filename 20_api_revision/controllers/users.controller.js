const UserModel = require("../models/users.model");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);

    const existEmail = await UserModel.findOne({ email: req.body.email });

    if (!existEmail) {
      if (req.body.password == req.body.confirm_password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const newUser = await UserModel.create(req.body);

        return res
          .status(201)
          .json({ message: "User registration successflly", data: newUser });
      }
    } else {
      return res.status(200).json({ message: "User already exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
};


module.exports.loginUser = async(req,res)=>{
    try{

        const checkUser = await UserModel.findOne({email:req.body.email});

        if(checkUser){
            if(await bcrypt.compare(req.body.password, checkUser.password)){

                let token = jwt.sign({ userData: checkUser }, 'RNW', { expiresIn: '1h' });

            return res.status(200).json({ 
            message: 'Login successful', 
            token: token 
            });
            }

        }else{
            return res.status(200).json({message:"User does not exist. Please register!"});

        }

    }catch(error){
        console.log(error)
        return res.status(400).json({message:"Internal server error!"});
    }
}
