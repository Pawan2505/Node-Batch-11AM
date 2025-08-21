const express = require('express');
const Student = require('../controllers/student.controller')

const routes = express.Router();

routes.get('/', Student.getAllStudent);
routes.post('/addStudent', Student.addStudent);
routes.put('/updateStudent/:id',Student.updateStudent);
routes.delete('/deleteStudent/:id',Student.deleteStudent);


module.exports = routes;