const express = require('express');
const Student = require('../controllers/students.controller')
const StudentModel = require('../models/student.model')
const router = express.Router();

console.log("router is connected successfuly!");

router.get('/allstudents',Student.allstudents);
router.post('/addstudents',StudentModel.Studentupload,Student.addstudents);
router.put('/updateStudent/:_id',Student.updateStudent);
router.delete('/deleteStudent/:_id',Student.deleteStudent);
module.exports = router;