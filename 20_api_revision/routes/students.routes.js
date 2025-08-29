const express = require('express');
const Student = require('../controllers/students.controller')

const router = express.Router();

console.log("router is connected successfuly!");

router.get('/allstudents',Student.allstudents);
router.post('/addstudents',Student.addstudents);
module.exports = router;