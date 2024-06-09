const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  if (!req.body.username || !req.body.email) {
    return res.status(400).json({ error: "Username and email are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login
router.post("/login", async (req, res) => {
  console.log("api call", req.body)
  try {
    const users = await User.find();
    // console.log(users)
    const user = await User.findOne({
      username: req.body.username,
    });
    console.log(user)
    if (!user) {
      console.log("user not found")
      return res.status(401).json("wrong credentials");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (OriginalPassword !== req.body.password) {
      console.log("wrong pasword");
      return res.status(401).json("wrong credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn :'3d'}
    );
    const { password, ...others } = user._doc;
    // const { password, ...others } = user;
     console.log("reached>>>>>>>")
    res.status(200).json({...others, accessToken});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
