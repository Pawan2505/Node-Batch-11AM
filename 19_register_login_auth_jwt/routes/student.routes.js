const express = require('express');
const Student = require('../controllers/student.controller');
const router = express.Router();

console.log("Router configured");

router.get('/', Student.getAllStudents);

router.post('/addStudent', Student.addStudent);

router.put('/updateStudent/:id', Student.updateStudent);

router.delete('/deleteStudent/:id', Student.deleteStudent);

module.exports = router;
