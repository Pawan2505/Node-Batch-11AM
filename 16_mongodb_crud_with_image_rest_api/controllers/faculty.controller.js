const Faculty = require("../models/faculty.model");
const path = require("path");
const fs = require("fs");

module.exports.allfaculty = async (req, res) => {
  try {
    console.log("List of faculty!!");

    const allFaculty = await Faculty.find({});

    return res.status(200).json({ message: "All Faculty!!", data: allFaculty });
  } catch (err) {
    return res
      .status(200)
      .json({ message: "Internal server error!!", data: error });
  }
};

module.exports.addFaculty = async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(req.file)
    const facultyData = req.body;

    // Agar image bheja hai to uska filename save karo
    if (req.file) {
      facultyData.image = Faculty.imagePath + "/" + req.file.filename;
    }
    const newFaculty = await Faculty.create(facultyData);
    return res
      .status(200)
      .json({ message: "New Faculty Added!!", data: newFaculty });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: "Not added new Faculty!!", data: error });
  }
};

module.exports.updateFaculty = async (req, res) => {
  try {
    console.log("updated faculty controller!!");
    const id = req.params.id;

    // Find existing faculty
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    let updateData = req.body;

    // If new image uploaded
    if (req.file) {
      // delete old image (if exists)
      if (faculty.image) {
        const oldPath = path.join(__dirname, "..", faculty.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // save new image
      updateData.image = Faculty.imagePath + "/" + req.file.filename;
    }

    // update faculty
    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Faculty updated successfully",
      data: updatedFaculty,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "Faculty not updated", data: error.message });
  }
};



module.exports.deleteFaculty = async(req,res)=>{
    try{
      console.log("delete routes");

        const id = req.params.id;

        const deleteFacult = await Faculty.findByIdAndDelete(id);

        if(deleteFacult.image){
            const oldPath = path.join(__dirname,deleteFacult.image)

            if(fs.existsSync(oldPath)){
                fs.unlinkSync(oldPath);
            }
        }

        return res.status(200).json({"message":"Faculty Deleted Successfully!!",data:deleteFacult});

    }catch(error){
      console.log(error)
      return res.status(400).json({"message":"Internal server error!!"});

    }
}


