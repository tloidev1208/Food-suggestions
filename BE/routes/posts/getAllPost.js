const express = require("express");
const router = express.Router();
const Post = require("../../models/post");

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Quản lý bài viết
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lấy danh sách tất cả bài viết
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Danh sách bài viết
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   content:
 *                     type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Lỗi server
 */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({createdAt: -1})
      .populate("user", "name email");
    res.json(posts);
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
