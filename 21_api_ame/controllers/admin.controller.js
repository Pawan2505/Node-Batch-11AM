const AdminModel = require('../models/admin.model');
const bcrypt =  require('bcrypt');
const moment = require('moment');

module.exports.adminRegister = async(req,res)=>{
    try{

        const existAdmin = await AdminModel.findOne({email:req.body.email});

        if(!existAdmin){

            if(req.body.password ==  req.body.confirm_password){

                if(req.file){
                    req.body.image = AdminModel.adminPath + '/' + req.file.filename;
                }

                req.body.password = await bcrypt.hash(req.body.password, 10);
                req.body.status = "Active";
                req.body.created_date = moment().format("MMM Do YY");;
                req.body.updated_date = Date.now();

                const newAdmin = await AdminModel.create(req.body);

                return res.status(200).json({message:"new admin created successfully!",data:newAdmin})

            }else{

                return res.status(200).json({message:"Password not same!"})
            }

        }else{
            return res.status(200).json({message:"Admin already Register!, Please Login"})
        }

    }catch(err){
        console.log(err)
        return res.status(400).json({message:"Internal server error!"})
    }
}