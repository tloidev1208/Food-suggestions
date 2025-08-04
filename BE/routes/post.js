const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post');

// Cấu hình Multer để nhận file ảnh (tạm dùng bộ nhớ RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Quản lý bài đăng
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Tạo bài viết mới
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
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Bài viết được tạo thành công
 *       500:
 *         description: Lỗi server
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { userId, content } = req.body;

    // Nếu có ảnh, dùng ảnh đó. Ở đây demo chỉ lấy 1 ảnh.
    const image = req.file
      ? 'https://binhminhdigital.com/StoreData/PageData/3429/Tim-hieu-ve-ban-quyen-hinh-anh%20(3).jpg' // hoặc upload thực tế
      : null;

    const post = new Post({
      user: userId,
      content,
      images: image ? [image] : [],
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Lỗi khi đăng bài:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lấy danh sách bài viết mới nhất
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Danh sách bài viết
 *       500:
 *         description: Lỗi server
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .exec();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Xóa một bài viết theo ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của bài viết cần xóa
 *     responses:
 *       200:
 *         description: Đã xóa bài viết thành công
 *       404:
 *         description: Không tìm thấy bài viết
 *       500:
 *         description: Lỗi server
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết để xóa' });
    }

    res.json({ message: 'Đã xóa bài viết thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa bài viết:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
