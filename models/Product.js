const mongoose = require("mongoose");

const ProductData = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    stock : { type: Number, default: 1}
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductData);