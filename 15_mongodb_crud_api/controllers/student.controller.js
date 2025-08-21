const Student = require('../models/student.model');

module.exports.getAllStudent = async (req, res) => {
    try {
        const allStudent = await Student.find({});
        return res.status(200).json({ "message": "List of all students", "data": allStudent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Internal server error!!" });
    }
};

module.exports.addStudent = async (req, res) => {
    try {
        console.log(req.body);
        const newStudent = await Student.create(req.body);
        return res.status(201).json({ "message": "New Student created!!", "data": newStudent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Internal server error!!" });
    }
};

module.exports.updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });

        if (updateStudent) {
            return res.status(200).json({ "message": "Student Updated!!", "data": updateStudent });
        } else {
            return res.status(404).json({ "message": "Student not found!!" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Internal server error" });
    }
};

module.exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (deletedStudent) {
            return res.status(200).json({ "message": "Student deleted!!", "data": deletedStudent });
        } else {
            return res.status(404).json({ "message": "Student not found!!" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Internal server error" });
    }
};
