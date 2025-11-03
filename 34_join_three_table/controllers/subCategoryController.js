const SubCategory = require("../models/SubCategory");

// ✅ View all Sub categories
exports.viewSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.render("subCategory/subcat_view", { subcategories });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching categories");
  }
};

// ✅ Show add sub category form
exports.addSubCategoryForm = (req, res) => {
  res.render("subCategory/subcat_add");
};

// ✅ Save category
exports.saveSubCategory = async (req, res) => {
  try {
    await SubCategory.create({ name: req.body.name });
    res.redirect("/subCategory");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding category");
  }
};
