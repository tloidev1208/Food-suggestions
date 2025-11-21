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
 *   delete:
 *     summary: Xóa bài viết theo ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết cần xóa
 *     responses:
 *       200:
 *         description: Xóa bài viết thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Xóa bài viết thành công!
 *       404:
 *         description: Không tìm thấy bài viết
 *       500:
 *         description: Lỗi server
 */
router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({message: "Không tìm thấy bài viết"});
    }

    res.json({message: "Xóa bài viết thành công!"});
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
