const express = require("express");
const axios = require("axios");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs"); // Thêm dòng này ở đầu file

const router = express.Router();

// Clarifai Config
const CLARIFAI_API_KEY = "1701be23056c4560b179b82ad0767d66";
const CLARIFAI_MODEL_ID = "food-item-recognition";
const CLARIFAI_MODEL_VERSION = "1d5fd481e0cf4826aa72ec3ff049e044";

// Gemini Config
const GEMINI_API_KEY = "AIzaSyBtv-BDOSnUrlNxgzh3ajhOK7hWAHNWjJ4";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Multer Config (upload file tạm)
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
// 👉 API cho phép upload tối đa 3 ảnh
router.post("/suggest", upload.array("images", 4), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Vui lòng upload ít nhất 1 ảnh" });
    }

    let allIngredients = [];

    // Detect nguyên liệu từ từng ảnh
    for (const file of files) {
      // Đọc file từ ổ đĩa và chuyển sang base64
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

    // Xoá trùng lặp
    allIngredients = [...new Set(allIngredients)];

    // ✅ 3. Gọi Gemini để gợi ý công thức
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Tôi có các nguyên liệu: ${allIngredients.join(", ")}. 
Hãy gợi ý cho tôi 4 món ăn ngon có thể nấu từ các nguyên liệu đó. 
Trả lời dưới dạng JSON, mỗi món ăn có các thuộc tính sau:

[
  {
    "name": "Tên món",
    "ingredients": ["nguyên liệu1", "nguyên liệu2", ...],
    "instructions": "Cách nấu ngắn gọn, tối đa 3 câu",
    "image": "URL ảnh minh họa thực tế (định dạng .jpg, .png hoặc .webp), có thể lấy từ web như Wikimedia, Pixabay hoặc các nguồn ảnh công khai, KHÔNG ĐỂ TRỐNG"
  }
]

Chỉ trả về đúng JSON, không giải thích thêm. Đảm bảo mỗi ảnh là một link ảnh trực tiếp.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Loại bỏ ký hiệu ```json
    let cleanText = text.replace(/```json|```/g, "").trim();

    let recipes;
    try {
      recipes = JSON.parse(cleanText);
    } catch {
      recipes = [{ note: "Gemini trả về không phải JSON chuẩn", raw: text }];
    }

    res.json({
      status: "success",
      // imageUrl, // Nếu chưa có biến imageUrl thì xoá dòng này
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
