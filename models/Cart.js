const mongoose = require("mongoose");

const CartData = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productList: [
      {
        _id: {
          type: String,
        },
        title: { type: String, required: true },
        amount: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPay: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartData);
