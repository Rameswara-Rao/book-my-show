const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/authMiddleware");

const userRouter = express.Router();

// Register a user
userRouter.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User Already Exists",
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "Registration Successful, Please login",
    });
  } catch (error) {
    console.log(error);
  }
});

// Login a user
userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist. Please register.",
      });
    }

    if (req.body.password !== user.password) {
      return res.send({
        success: false,
        message: "Sorry, invalid password entered!",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "You've successfully logged in!",
      data: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

// Get current authenticated user
userRouter.get("/get-current-user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "You are authorized to go to the protected route!",
      data: user,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = userRouter;
