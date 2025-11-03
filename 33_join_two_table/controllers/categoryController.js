const Category = require("../models/Category");

// ✅ View all categories
exports.viewCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("category/cat_view", { categories });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching categories");
  }
};

// ✅ Show add category form
exports.addCategoryForm = (req, res) => {
  res.render("category/cat_add");
};

// ✅ Save category
exports.saveCategory = async (req, res) => {
  try {
    await Category.create({ name: req.body.name });
    res.redirect("/category");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding category");
  }
};
