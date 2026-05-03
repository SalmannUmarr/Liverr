import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../../Models/index.js";
import { verifyToken } from "../../Middleware/auth.js";
import {
  validateForgotPassword,
  validateLogin,
  validateResetPassword,
  validateSignup,
} from "../../Middleware/validate.js";



const router = express.Router();
router.put("/hashPasswords", async (req, res) => {
  try {
    const users = await User.find(); // Get all users

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        if (user.password.startsWith("$2b$")) return null;

        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
        await user.save();
        return user.username;
      })
    );

    res.status(200).json({
      message: "Passwords hashed successfully",
      updatedUsers: updatedUsers.filter(Boolean),
    });
  } catch (error) {
    console.error("Error hashing passwords:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signup", validateSignup, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    const currentUser = {
      id: user._id,
      username: user.username,
      role: user.role,
      isSeller: user.role === "freelancer",
      isVerified:user.verified
    };
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({ message: "Login successful", token,currentUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/forgot-password", validateForgotPassword, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    res.status(200).json({
      message: "Password reset token generated. It expires in 15 minutes.",
      resetToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/reset-password", validateResetPassword, async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful. Please login." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  res.status(200).json({
    currentUser: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      isSeller: req.user.role === "freelancer",
      isVerified: req.user.verified,
    },
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logout successful" });
});

export default router;
