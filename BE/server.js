require("dotenv").config(); // Thêm dòng này ở đầu file

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const swaggerDocs = require("./swagger");
const mongoose = require("mongoose");

// Import các routes
const foodRoutes = require("./routes/food");
const recipeRoutes = require("./routes/recipes"); // File đầu tiên (food-suggest)
const recipeSaveRoutes = require("./routes/recipesave"); // ✅ File thứ hai (save, saved)
const foodRecipesRoutes = require("./routes/food-recipes");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const imageSearchRouter = require("./routes/imageSearch");
const mealPlannerRoutes = require("./routes/mealPlanner");
const nutritionRoutes = require("./routes/nutritionAdvice");
const stravaRoutes = require("./routes/strava");

const app = express();
const PORT = process.env.PORT || 5000; // Cho phép cấu hình PORT qua env

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(upload.none()); // Cho phép multer đọc form-data

// MongoDB Connect
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/food", foodRoutes);
app.use("/api/recipes", recipeRoutes); // ✅ route cho food-suggest
app.use("/api/recipes", recipeSaveRoutes); // ✅ route cho save, saved
app.use("/api/food-recipes", foodRecipesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/", imageSearchRouter);
app.use("/api/recipes", mealPlannerRoutes);
app.use("/api/recipes", nutritionRoutes);
app.use("/strava", stravaRoutes);

// Swagger Docs
swaggerDocs(app);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 API Server is running...");
});

app.listen(PORT, () => {
  console.log(
    `✅ Server chạy tại ${
      process.env.API_BASE_URL || `http://localhost:${PORT}`
    }`
  );
  console.log(
    `📄 Swagger Docs tại ${
      process.env.API_BASE_URL || `http://localhost:${PORT}`
    }/api-docs`
  );
});
