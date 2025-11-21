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
 * /api/posts/{id}:
 *   get:
 *     summary: Lấy bài viết theo ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Bài viết được trả về thành công
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
 *       404:
 *         description: Không tìm thấy bài viết
 *       500:
 *         description: Lỗi server
 */
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({message: "Không tìm thấy bài viết"});
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
