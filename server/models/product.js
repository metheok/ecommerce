const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  image: String,
  description: String,
  type: String,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);
