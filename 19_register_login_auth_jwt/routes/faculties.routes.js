const express = require('express');
const Faculty = require('../controllers/faculty.controller')
const FacultyModel = require('../models/faculty.model')

const router = express.Router();

router.get('/getAllFaculty', Faculty.allfaculty);
router.post('/addFaculty',FacultyModel.uploadImage, Faculty.addFaculty)
router.put('/updateFaculty/:id',FacultyModel.uploadImage,Faculty.updateFaculty)
router.delete('/deleteFaculty/:id', Faculty.deleteFaculty)

module.exports = router;