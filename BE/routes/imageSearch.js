const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ImageSearch
 *   description: Tìm kiếm ảnh từ Google Images
 */

/**
 * @swagger
 * /api/images/search:
 *   get:
 *     summary: Tìm kiếm ảnh trên Google Images
 *     tags: [ImageSearch]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm ảnh
 *     responses:
 *       200:
 *         description: Danh sách link ảnh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Lỗi khi crawl ảnh
 */
router.get('/search', async (req, res) => {
  const searchQuery = req.query.query;
  if (!searchQuery) {
    return res.status(400).json({ error: 'Thiếu từ khóa query' });
  }

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery)}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });

    // Đợi ảnh load
    await page.waitForSelector('img');

    const imageLinks = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .map(img => img.src)
        .filter(src => src && src.startsWith('http'))
        .slice(0, 5); // Lấy 5 ảnh đầu tiên
    });

    await browser.close();

    res.json({ images: imageLinks });
  } catch (error) {
    console.error('Lỗi khi crawl ảnh:', error);
    res.status(500).json({ error: 'Không thể crawl ảnh' });
  }
});

module.exports = router;
