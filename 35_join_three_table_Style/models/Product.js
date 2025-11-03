const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory"
  }
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
