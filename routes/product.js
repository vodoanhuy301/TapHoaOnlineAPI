const router = require("express").Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//Them san pham
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CapNhat
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
//CapNhatSoSanPham
router.put("/stock/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {stock: -req.body.quantity},
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //Xoa
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Đã xóa product có id: " + req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get 1 product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Lay so luong cua 1 product
router.get("/stock/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product.stock);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Tim san pham
router.get("/findname/:title", async (req, res) => {
  try {
    const products = await Product.find({
      title: { $regex : req.params.title, $options: 'ig'}
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get toan bo product
router.get("/", async (req, res) => {
  const newQuery = req.query.new;
  const categoryQuery = req.query.category;
  try {
    let products;
    if (newQuery) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (categoryQuery) {
      products = await Product.find({
        categories: {
          $in: [categoryQuery],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
