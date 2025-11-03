const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.viewCategories);
router.get("/cat_add", categoryController.addCategoryForm);
router.post("/cat_add", categoryController.saveCategory);

module.exports = router;
