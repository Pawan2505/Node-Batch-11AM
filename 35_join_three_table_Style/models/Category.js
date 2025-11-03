const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const category = mongoose.model("Category", categorySchema);

module.exports = category;
