const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = "AIzaSyBtv-BDOSnUrlNxgzh3ajhOK7hWAHNWjJ4"; // thay bằng key của bạn
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * @swagger
 * /api/recipes/food-suggest:
 *   post:
 *     summary: Gợi ý công thức món ăn bằng Google Gemini dựa trên nguyên liệu
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["tomato", "cucumber", "egg"]
 *     responses:
 *       200:
 *         description: Danh sách món ăn gợi ý từ Gemini
 */
router.post("/food-suggest", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "Vui lòng cung cấp ingredients" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // hoặc: { model: "gemini-1.5-pro" }

   const prompt = `Tôi có các nguyên liệu: ${allIngredients.join(", ")}.
Hãy gợi ý cho tôi 4 món ăn ngon, trả về dưới dạng JSON:
[
  {
    "name": "Tên món",
    "ingredients": ["nguyên liệu1", "nguyên liệu2"],
    "instructions": "Cách nấu ngắn gọn",
    "image": "Link ảnh thật từ Google hoặc Wikipedia"
  }
]`;


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let cleanText = text.replace(/```json|```/g, "").trim();

    let recipes;
    try {
      recipes = JSON.parse(cleanText);
    } catch (err) {
      recipes = [{ note: "Gemini trả về không phải JSON chuẩn", raw: text }];
    }

    res.json({ status: "success", recipes });
  } catch (error) {
    console.error("Gemini Error:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: "Lỗi khi gọi Gemini API" });
  }
});

module.exports = router;
