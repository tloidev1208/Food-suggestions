const express = require("express");
const router = express.Router();
const Post = require("../../models/post");
const multer = require("multer");

// Cấu hình Multer lưu file tạm (hoặc memoryStorage nếu không muốn lưu)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder lưu file
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
 *   description: Quản lý bài viết về món ăn
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Tạo bài viết mới về món ăn
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - foodName
 *               - content
 *             properties:
 *               userId:
 *                 type: string
 *               foodName:
 *                 type: string
 *               content:
 *                 type: string

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
 *                 foodId:
 *                   type: string
 *                 foodName:
 *                   type: string
 *                 content:
 *                   type: string
 *               
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Thiếu userId, foodName hoặc content
 *       500:
 *         description: Lỗi server
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {userId, content, foodName} = req.body;

    if (!userId || !content || !foodName) {
      return res.status(400).json({
        message: "userId, foodName và content là bắt buộc",
      });
    }

    const count = await Post.countDocuments({user: userId});
    const foodId = `${userId}_${count + 1}`;
    const post = new Post({
      user: userId,
      foodId,
      foodName,
      content,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
