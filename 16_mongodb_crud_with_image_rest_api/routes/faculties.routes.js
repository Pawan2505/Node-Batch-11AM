const express = require('express');
const router = express.Router();
const Faculty = require("../models/faculty.model");
const { getAllFaculties, addFaculty, updateFaculty, deleteFaculty } = require('../controllers/faculty.controller');

// Routes
router.get("/allfaculties", getAllFaculties);
router.post("/addfaculty", Faculty.uploadImage, addFaculty);
router.put("/updatefaculty/:id", Faculty.uploadImage, updateFaculty);
router.delete("/deletefaculty/:id", deleteFaculty);

module.exports = router;
