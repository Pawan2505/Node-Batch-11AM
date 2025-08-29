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

