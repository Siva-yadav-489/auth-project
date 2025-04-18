const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ message: "user already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();
  return res.status(201).json({ message: "user registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "user does not exist" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ message: "Inavalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ token });
});

router.get("/profile", authMiddleware, async (req, res) => {
  const id = req.user.id;
  const userDetails = await User.findById(id);
  res.json({ userDetails });
});

router.put("/profile", authMiddleware, async (req, res) => {
  const id = req.user.id;
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userDetails = await User.findByIdAndUpdate(
    id,
    { name, email, hashedPassword },
    { new: true }
  );
  await userDetails.save();
  res.json({ messsage: "updated!!", userDetails });
});

router.delete("/profile", authMiddleware, async (req, res) => {
  const id = req.user.id;
  const userDetails = await User.findByIdAndDelete(id);
  res.json({ messsage: "Deleted!!", userDetails });
});

router.get("/admin", adminMiddleware, async (req, res) => {
  const allUsers = await User.find({});
  if (allUsers.length <= 0) {
    res.json({ message: "there are no users yet" });
  }
  res.status(200).json({ allUsers });
});

module.exports = router;
