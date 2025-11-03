const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const subCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = subCategory;
