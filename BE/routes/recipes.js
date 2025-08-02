const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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", // 🔐 Thay bằng OpenAI API Key của bạn
});

/**
 * @swagger
 * /api/recipes/food-suggest:
 *   post:
 *     summary: Gợi ý công thức món ăn bằng OpenAI dựa trên nguyên liệu
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
 *         description: Danh sách món ăn gợi ý từ OpenAI
 */
router.post("/food-suggest", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "Vui lòng cung cấp ingredients" });
  }

  try {
    const prompt = `Tôi có các nguyên liệu: ${ingredients.join(", ")}.
Hãy gợi ý cho tôi 4 món ăn ngon, trả về dưới dạng JSON:
[
  {
    "name": "Tên món",
    "ingredients": ["nguyên liệu1", "nguyên liệu2"],
    "instructions": "Cách nấu ngắn gọn",
    "image": "Link ảnh thật từ Wikimedia hoặc Pixabay"
  }
]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 1.0,
    });

    let text = completion.choices[0].message.content;

    let cleanText = text.replace(/```json|```/g, "").trim();

    let recipes;
    try {
      recipes = JSON.parse(cleanText);
    } catch (err) {
      recipes = [{ note: "OpenAI trả về không phải JSON chuẩn", raw: text }];
    }

    res.json({ status: "success", recipes });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({
      error: "Lỗi khi gọi OpenAI API",
      details: error.message,
    });
  }
});

module.exports = router;
