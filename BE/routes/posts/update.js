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
 * /api/posts/food/{foodId}:
 *   put:
 *     summary: Cập nhật bài viết theo foodId
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: foodId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID món ăn cần cập nhật (userId + số thứ tự)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodName:
 *                 type: string
 *                 description: Tên món ăn mới
 *               content:
 *                 type: string
 *                 description: Nội dung bài viết mới
 *     responses:
 *       200:
 *         description: Cập nhật bài viết thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 foodId:
 *                   type: string
 *                 foodName:
 *                   type: string
 *                 content:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Không tìm thấy bài viết
 *       500:
 *         description: Lỗi server
 */

router.put("/food/:foodId", async (req, res) => {
  try {
    const {foodId} = req.params;
    const {foodName, content} = req.body;

    // Kiểm tra dữ liệu
    if (!foodName && !content) {
      return res
        .status(400)
        .json({message: "Phải có ít nhất foodName hoặc content để cập nhật"});
    }

    const updatedPost = await Post.findOne({foodId});

    if (!updatedPost) {
      return res.status(404).json({message: "Không tìm thấy bài viết"});
    }

    // Cập nhật các trường nếu được gửi
    if (foodName) updatedPost.foodName = foodName;
    if (content) updatedPost.content = content;

    await updatedPost.save();

    // Trả về dữ liệu đã format
    const formattedPost = {
      user: updatedPost.user, // bạn có thể populate nếu muốn tên user
      foodId: updatedPost.foodId,
      foodName: updatedPost.foodName,
      content: updatedPost.content,
      createdAt: updatedPost.createdAt,
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    console.error("Lỗi khi cập nhật bài viết:", error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
