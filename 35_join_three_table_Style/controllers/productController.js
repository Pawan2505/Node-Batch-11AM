const Product = require("../models/Product");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

// ✅ View all products
exports.viewProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subCategory");
    res.render("product/pro_view", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching products");
  }
};

// ✅ Show add product form
exports.addProductForm = async (req, res) => {
  try {
    const categories = await Category.find();
    const subCategories = await SubCategory.find();
    res.render("product/pro_add", { categories, subCategories });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading form");
  }
};

// ✅ Save product
exports.saveProduct = async (req, res) => {
  try {
    const { name, price, category, subCategory } = req.body;
    await Product.create({ name, price, category, subCategory });
    res.redirect("/product");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving product");
  }
};
