const mongoose = require("mongoose");

const OrderData = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        price: { type: Number, required: true },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "đang xử lí" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderData);
