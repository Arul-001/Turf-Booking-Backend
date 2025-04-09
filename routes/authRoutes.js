import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import protect from "../middleware/authMiddleware.js";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
router.get("/me", protect, async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user: req.user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // console.log("Login Request Body:", req.body); // debug log

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user ) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        dob: user.dob,
        email: user.email,
      },
      token,
     });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/signup", async (req, res) => {
  try {

    const { name, dob, email, password } = req.body;
    console.log("Login data received:", req.body);

    if (!name || !dob || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      dob,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        dob: newUser.dob,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
