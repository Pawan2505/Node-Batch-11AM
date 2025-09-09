const express = require('express');


const router = express.Router();

console.log("Index routes connected....")

router.use('/admin', require('./admin.routes'));

module.exports = router;