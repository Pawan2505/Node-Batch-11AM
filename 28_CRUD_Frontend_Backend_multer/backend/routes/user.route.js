const express = require('express');
const User = require('../controllers/users.controller');
const UserModel = require('../models/users.model');

const router = express.Router();

console.log("Router created...");

router.post('/insert_data',UserModel.uploadUser,User.insert_data)
router.get('/view_data',User.view_data)

router.delete('/delete_data/:_id',User.delete_data)

router.get('/edit_data/:_id',User.edit_data);

router.put('/update_data/:_id',UserModel.uploadUser,User.update_data);

module.exports = router;