const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/subCategoryController");

router.get("/", subCategoryController.viewSubCategories);
router.get("/subcat_add", subCategoryController.addSubCategoryForm);
router.post("/subcat_add", subCategoryController.saveSubCategory);

module.exports = router;
