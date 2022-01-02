const router = require("express").Router();
const Banner = require("../models/Banner");
const { verifyTokenAndAdmin } = require("./verifyToken");

//Them banner
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newBanner = new Banner(req.body);
  try {
    const savedBanner = await newBanner.save();
    res.status(200).json(savedBanner);
  } catch (err) {
    res.status(500).json(err);
  }
});
//CapNhat
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBanner);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //Xoa
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json("Đã xóa Banner có id: " + req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get toan bo Banner
router.get("/", async (req, res) => {
  try {
    let banners;
    banners = await Banner.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get 1 Banner
router.get("/find/:id", async (req, res) => {
  try {
    let banners;
    banners = await Banner.findById(req.params.id);
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
