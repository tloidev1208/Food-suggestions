const express = require("express");
const router = express.Router();
const Post = require("../../models/post");
const multer = require("multer");
const path = require("path");

// Cấu hình Multer lưu vào folder local "uploads/posts"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({storage});

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Quản lý bài viết
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Tạo bài viết mới có ảnh (lưu local)
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - content
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID người dùng
 *               content:
 *                 type: string
 *                 description: Nội dung bài viết
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh bài viết
 *     responses:
 *       201:
 *         description: Bài viết được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 content:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Thiếu userId hoặc content
 *       500:
 *         description: Lỗi server
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {userId, content} = req.body;

    if (!userId || !content) {
      return res.status(400).json({message: "userId và content là bắt buộc"});
    }

    let imageUrl = null;

    if (req.file) {
      // Lưu đường dẫn tương đối để truy xuất
      imageUrl = `/uploads/posts/${req.file.filename}`;
    }

    const post = new Post({
      user: userId,
      content,
      images: imageUrl ? [imageUrl] : [],
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
