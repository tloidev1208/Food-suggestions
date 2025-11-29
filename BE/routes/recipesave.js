const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");

/**
 * @swagger
 * /api/recipes/save:
 *   post:
 *     summary: Lưu một công thức vào tài khoản người dùng
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               recipe:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Salad cà chua"
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["cà chua", "hành tây", "rau thơm"]
 *                   instructions:
 *                     type: string
 *                     example: "Cắt cà chua, trộn với hành tây và rau thơm. Thêm gia vị vừa ăn."
 *                   image:
 *                     type: string
 *                     example: "https://example.com/salad.jpg"
 *                   cook_time:
 *                     type: string
 *                     example: "30 phút"
 *                   nutrition:
 *                     type: object
 *                     properties:
 *                       calories:
 *                         type: string
 *                         example: "200 kcal"
 *                       protein:
 *                         type: string
 *                         example: "5g"
 *                       fat:
 *                         type: string
 *                         example: "8g"
 *                       carbs:
 *                         type: string
 *                         example: "15g"
 *     responses:
 *       200:
 *         description: Lưu thành công
 */
router.post("/save", async (req, res) => {
  try {
    const {userId, recipe} = req.body;

    // 🔍 Kiểm tra người dùng tồn tại
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({error: "Không tìm thấy người dùng"});
    }

    // ✅ Tạo công thức mới
    const newRecipe = await Recipe.create({
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: recipe.image,
      cook_time: recipe.cook_time,
      nutrition: {
        calories: recipe.nutrition?.calories || "Không rõ",
        protein: recipe.nutrition?.protein || "Không rõ",
        fat: recipe.nutrition?.fat || "Không rõ",
        carbs: recipe.nutrition?.carbs || "Không rõ",
      },
    });

    // ✅ Lưu công thức này vào tài khoản người dùng
    user.savedRecipes.push(newRecipe._id);
    await user.save();

    res.json({
      message: "Đã lưu công thức vào tài khoản",
      recipe: newRecipe,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/recipes/saved/{userId}:
 *   get:
 *     summary: Xem danh sách công thức đã lưu của người dùng
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách công thức đã lưu
 */
router.get("/saved/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "savedRecipes"
    );
    if (!user) {
      return res.status(404).json({error: "Không tìm thấy người dùng"});
    }

    res.json({
      savedRecipes: user.savedRecipes,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
