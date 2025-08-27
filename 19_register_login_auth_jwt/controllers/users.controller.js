const Users = require('../models/users.model');
const bcrypt = require('bcrypt');

module.exports.userRegister = async(req,res)=>{
    try{
        console.log(req.body)

        const existUser = await Users.findOne({email:req.body.email});

        if(!existUser){

            if(req.body.password == req.body.confirm_password){

                req.body.password = await bcrypt.hash(req.body.password,10);

                const newUser = await Users.create(req.body);

                if(newUser){

                    return res.status(201).json({message:"User Registered Successfully!!",data:newUser})
                }

            }else{

                return res.status(400).json({message:"Password not match!"})
            }

        }else{
            return res.status(400).json({message:"User already exist!"})
        }


    }catch(error){
        console.log(error)
        return res.status(400).json({message:"Internal server error!!"});
    }
}