const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.viewProducts);
router.get("/pro_add", productController.addProductForm);
router.post("/pro_add", productController.saveProduct);

module.exports = router;
