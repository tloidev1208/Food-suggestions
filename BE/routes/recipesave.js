const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");
const imagekit = require("../config/imagekit");
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
 *                 example: "692874fcf8589fcd7883cbcb"
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
 *                     example: "https://images.unsplash.com/photo-1528825871115-3581a5387919"
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

    if (!userId || !recipe) {
      return res.status(400).json({error: "Thiếu userId hoặc recipe"});
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({error: "Không tìm thấy người dùng"});
    }

    let imageUrl = "";
    let imageId = "";

    if (recipe.image && recipe.image.startsWith("http")) {
      const result = await imagekit.upload({
        file: recipe.image,
        fileName: `recipe-${Date.now()}.jpg`,
        folder: "recipes",
      });

      imageUrl = result.url;
      imageId = result.fileId;
    }

    const newRecipe = await Recipe.create({
      user: userId,
      name: recipe.name,
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || "",
      image: imageUrl,
      imageId,
      cook_time: recipe.cook_time || "",
      nutrition: {
        calories: recipe.nutrition?.calories || "Không rõ",
        protein: recipe.nutrition?.protein || "Không rõ",
        fat: recipe.nutrition?.fat || "Không rõ",
        carbs: recipe.nutrition?.carbs || "Không rõ",
      },
    });

    user.savedRecipes.push(newRecipe._id);
    await user.save();

    res.status(201).json({
      message: "Lưu thành công & upload ảnh ImageKit",
      recipe: newRecipe,
    });
  } catch (error) {
    console.error("Lỗi lưu recipe:", error);
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
