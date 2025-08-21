const Faculty = require("../models/faculty.model");


module.exports.getAllFaculties = async (req, res) => {
    try{
        const faculties = await Faculty.find();
       return res.status(200).json({ message: "Faculties fetched successfully", data: faculties });
    }catch(error){
        console.error("Error fetching faculties:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.addFaculty = async (req, res) => {
    try {
        const facultyData = req.body;

        // Agar image bheja hai to uska filename save karo
        if (req.file) {
            facultyData.image = req.file.filename;
        }

        const newFaculty = await Faculty.create(facultyData);
        return res.status(201).json({ message: "Faculty added successfully", data: newFaculty });
    } catch (error) {
        console.error("Error adding faculty:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.updateFaculty = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Agar naya image bheja hai to uska filename update karo
        if (req.file) {
            updateData.image = req.file.filename;
        }

        // Har update ke time updated_date ko current time pe set karo
        updateData.updated_date = Date.now();

        const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedFaculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        return res.status(200).json({ message: "Faculty updated successfully", data: updatedFaculty });
    } catch (error) {
        console.error("Error updating faculty:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




module.exports.deleteFaculty = async (req, res) => {
    try{

        const id = req.params.id;
        const deletedFaculty = await Faculty.findByIdAndDelete(id);
        if (!deletedFaculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        return res.status(200).json({ message: "Faculty deleted successfully", data: deletedFaculty });
    }catch(error){
        console.error("Error deleting faculty:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}