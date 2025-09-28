const UserModel = require('../models/users.model');


module.exports.insert_data = async(req,res)=>{
    try{
 console.log("Insert data controller run...");

        if(req.file){
            req.body.file = UserModel.imgPath + "/" + req.file.filename;
        }

        const useradded = await UserModel.create(req.body);

        return res.status(200).json({message:"User inserted successfully!",data:useradded});
        
    }catch(err){
        
        return res.status(400).json({message:"Internal server error",data:err.message});
    }
}

module.exports.view_data = async(req,res)=>{
    try{
        
        const allusers = await UserModel.find({});
        
        return res.status(200).json({message:"All Users!",data:allusers});


    }catch(err){
        
        return res.status(400).json({message:"Internal server error",data:err.message});
    }
}

module.exports.delete_data = async(req,res)=>{
    try{
        console.log("Delete controller is running..."); 
        const id = req.params._id;
        console.log(id);
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return res.status(200).json({message:"User deleted successfully!",data:deletedUser});
    }catch(err){
        return res.status(400).json({message:"Internal server error",data:err.message});
    }
}


module.exports.edit_data = async(req,res)=>{
    try{
        console.log("Edit controller is running...");   
        const id = req.params._id;
        console.log(id);
        const editUser = await UserModel.findById(id);
        return res.status(200).json({message:"User fetched successfully!",data:editUser});
    }   catch(err){
        return res.status(400).json({message:"Internal server error",data:err.message});
    }   
}


module.exports.update_data = async(req,res)=>{
    try{
        console.log("Update controller is running...");   
        const id = req.params._id;
        console.log(id);    
        if(req.file){
            req.body.file = UserModel.imgPath + "/" + req.file.filename;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body);
        return res.status(200).json({ message: "User updated successfully!", data: updatedUser });
    } catch (err) {
        return res.status(400).json({ message: "Internal server error", data: err.message });
    }
};
