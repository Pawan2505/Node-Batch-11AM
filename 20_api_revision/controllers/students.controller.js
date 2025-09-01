const StudentModel = require('../models/student.model')


module.exports.allstudents = async(req,res)=>{
    try{
        
        const allStudents = await StudentModel.find({});

        return res.status(200).json({message:"List of all students!",data:allStudents});
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"Internal server error"});
    }
}


module.exports.addstudents = async(req,res)=>{
    try{
         
         const newStudent = await StudentModel.create(req.body);
         return res.status(200).json({message:"New student added",data:newStudent});

    }catch(err){
        console.log(err);
        return res.status(400).json({message:"Internal server error!"});
    }
}


module.exports.updateStudent = async(req,res)=>{
    try{
        const _id = req.params._id;

        const updateData = await StudentModel.findByIdAndUpdate(_id,req.body,{new:true});

        return res.status(201).json({message:"Student updated successfully!",data:updateData});

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}


module.exports.deleteStudent = async(req,res)=>{
    try{

        const _id = req.params._id;

        const deleteData = await StudentModel.findByIdAndDelete(_id);

        return res.status(200).json({message:"Student deleted successfully!", data: deleteData});

    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal server error!"});
    }
}
