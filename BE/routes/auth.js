const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // ✅ dùng env

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Auth]
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Vui lòng nhập đủ thông tin" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Vui lòng nhập đủ thông tin" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Sai email hoặc mật khẩu" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Sai email hoặc mật khẩu" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ SET COOKIE httpOnly
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // 👉 true nếu HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    res.json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Đăng xuất
 *     tags: [Auth]
 */
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({
    status: "success",
    message: "Đăng xuất thành công",
  });
});

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Lấy tất cả người dùng
 *     tags: [Auth]
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
