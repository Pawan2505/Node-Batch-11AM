## 📒 CRUD with Image - REST API

### Step 1: Install Multer

```sh
npm install multer
```

---

### Step 2: `app.js`

```js
app.use('/faculty', require('./routes/faculties.routes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

---

### Step 3: `routes/faculties.routes.js`

```js
const express = require('express');
const router = express.Router();
const Faculty = require("../models/faculty.model");
const { getAllFaculties, addFaculty, updateFaculty, deleteFaculty } = require('../controllers/faculty.controller');

router.get("/allfaculties", getAllFaculties);
router.post("/addfaculty", Faculty.uploadImage, addFaculty);
router.put("/updatefaculty/:id", Faculty.uploadImage, updateFaculty);
router.delete("/deletefaculty/:id", deleteFaculty);

module.exports = router;
```

---

### Step 4: `models/faculty.model.js`

```js
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const imagePath = "uploads/faculties";

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  hobby: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", imagePath));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

FacultySchema.statics.uploadImage = multer({ storage: imageStorage }).single("image");
FacultySchema.statics.facultyImagePath = imagePath;

const Faculty = mongoose.model("Faculty", FacultySchema);
module.exports = Faculty;
```

---

### Step 5: `controllers/faculty.controller.js`

```js
const Faculty = require("../models/faculty.model");

// Get All
module.exports.getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    return res.status(200).json({ message: "Faculties fetched successfully", data: faculties });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add
module.exports.addFaculty = async (req, res) => {
  try {
    const facultyData = req.body;
    if (req.file) {
      facultyData.image = req.file.filename;
    }
    const newFaculty = await Faculty.create(facultyData);
    return res.status(201).json({ message: "Faculty added successfully", data: newFaculty });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update
module.exports.updateFaculty = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    if (req.file) {
      updateData.image = req.file.filename;
    }
    updateData.updated_date = Date.now();

    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    return res.status(200).json({ message: "Faculty updated successfully", data: updatedFaculty });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete
module.exports.deleteFaculty = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFaculty = await Faculty.findByIdAndDelete(id);
    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    return res.status(200).json({ message: "Faculty deleted successfully", data: deletedFaculty });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
```

---
