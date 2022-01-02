const mongoose = require("mongoose");

const BannerData = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    link:{ type: String},
    bgColor: { type: String, required: true}
    
  },
  { timestamps: true }
);


module.exports = mongoose.model("Banner", BannerData);