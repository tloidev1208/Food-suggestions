const express = require("express");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const { OpenAI } = require("openai");

const router = express.Router();

// Clarifai Config
const CLARIFAI_API_KEY = "1701be23056c4560b179b82ad0767d66";
const CLARIFAI_MODEL_ID = "food-item-recognition";
const CLARIFAI_MODEL_VERSION = "1d5fd481e0cf4826aa72ec3ff049e044";

// OpenAI Config
const openai = new OpenAI({
  apiKey:
    "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", // 🔐 Thay bằng OpenAI API Key của bạn
});

// Multer Config
const storage = multer.diskStorage({});
const upload = multer({ storage });

/**
 * @swagger
 * /api/food-recipes/suggest:
 *   post:
 *     summary: Upload ảnh → Nhận diện nguyên liệu → Gợi ý món ăn
 *     tags: [Food & Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Ảnh, nguyên liệu và danh sách món ăn gợi ý
 */
router.post("/suggest", upload.array("images", 3), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Vui lòng upload ít nhất 1 ảnh" });
    }

    let allIngredients = [];

    // Nhận diện nguyên liệu từ ảnh
    for (const file of files) {
      const fileData = fs.readFileSync(file.path);
      const base64 = fileData.toString("base64");

      const clarifaiRes = await axios.post(
        `https://api.clarifai.com/v2/models/${CLARIFAI_MODEL_ID}/versions/${CLARIFAI_MODEL_VERSION}/outputs`,
        { inputs: [{ data: { image: { base64 } } }] },
        { headers: { Authorization: `Key ${CLARIFAI_API_KEY}` } }
      );

      const concepts = clarifaiRes.data.outputs[0].data.concepts.filter(
        (c) => c.value > 0.8
      );

      allIngredients.push(...concepts.map((c) => c.name));
    }

    allIngredients = [...new Set(allIngredients)];

    // Gọi OpenAI để gợi ý món ăn
    const prompt = `Tôi có các nguyên liệu: ${allIngredients.join(", ")}.
Hãy gợi ý cho tôi 4 món ăn ngon có thể nấu từ các nguyên liệu đó.
Trả về kết quả dưới dạng JSON, mỗi món ăn có dạng:

[
  {
    "name": "Tên món",
    "ingredients": ["nguyên liệu1", "nguyên liệu2"],
    "instructions": "Cách nấu ngắn gọn, tối đa 3 câu",
    "image": "Link ảnh thực tế (jpg, png hoặc webp) từ Website trên google KHÔNG để trống"
  }
]

Chỉ trả về JSON, không giải thích thêm.`;

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

    res.json({
      status: "success",
      ingredients: allIngredients,
      recipes,
    });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Lỗi khi xử lý",
      details: err.response?.data || err.message,
    });
  }
});

module.exports = router;
