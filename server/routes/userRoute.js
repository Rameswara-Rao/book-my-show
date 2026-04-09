const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/authMiddleware");
const EmailHelper = require("../utils/emailHelper");

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

// Function for otp generation
const otpGenerator = function () {
  return Math.floor(100000 + Math.random() * 900000);
};

// Forgot password
userRouter.patch("/forgetpassword", async function (req, res) {
  try {
    if (req.body.email == undefined) {
      return res.status(401).json({
        status: "failure",
        message: "Please enter the email for forget Password",
      });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user == null) {
      return res.status(404).json({
        status: "failure",
        message: "user not found for this email",
      });
    }

    const otp = otpGenerator();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await EmailHelper("otp.html", user.email, {
      name: user.name,
      otp: otp,
    });

    res.status(200).json({
      status: "success",
      message: "otp sent to your email",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
});

// Reset password
userRouter.patch("/resetpassword/:email", async function (req, res) {
  try {
    let resetDetails = req.body;

    if (!resetDetails.password || !resetDetails.otp) {
      return res.status(401).json({
        status: "failure",
        message: "invalid request",
      });
    }

    const user = await User.findOne({ email: req.params.email });
    if (user == null) {
      return res.status(404).json({
        status: "failure",
        message: "user not found",
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(401).json({
        status: "failure",
        message: "otp expired",
      });
    }

    user.password = req.body.password;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "password reset successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
});

module.exports = userRouter;
