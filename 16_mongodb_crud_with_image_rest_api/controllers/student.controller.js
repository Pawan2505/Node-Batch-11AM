const Student= require('../models/student.model');

module.exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    return res.status(200).json({"message": "List of all students", "data": students});
  } catch (error) {
    return res.status(500).json({ "message": "Internal Server Error" });
  }
};

module.exports.addStudent = async (req, res) => {
  try {
    let newStudent = await Student.create(req.body);
    if (newStudent) {
      return res.status(201).json({ "message": "Student added successfully", "data": newStudent });
    }else{
        return res.status(400).json({ "message": "Failed to add student" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports.updateStudent = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedStudent) {
            return res.status(200).json({ "message": "Student updated successfully", "data": updatedStudent });
        } else {
            return res.status(404).json({ "message": "Student not found" });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
}

module.exports.deleteStudent = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (deletedStudent) {
            return res.status(200).json({ "message": "Student deleted successfully", "data": deletedStudent });
        } else {
            return res.status(404).json({ "message": "Student not found" });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
}
