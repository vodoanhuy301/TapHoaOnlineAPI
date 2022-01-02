const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { rawListeners } = require("../models/User");
const jwt = require("jsonwebtoken");

//DangKi
router.post("/dangki", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DangNhap
router.post("/dangnhap", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Loi!!! Vui long kiem tra lai!!!");
    const pwd = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
    const originalPassword = pwd.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json("Loi!!! Vui long kiem tra lai password!!!");
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
