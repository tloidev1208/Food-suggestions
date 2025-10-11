require("dotenv").config(); // Thêm dòng này ở đầu file

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");        
const upload = multer();                  
const swaggerDocs = require("./swagger");

// Import các routes
const foodRoutes = require("./routes/food");
const recipeRoutes = require("./routes/recipes");
const foodRecipesRoutes = require("./routes/food-recipes");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const mongoose = require("mongoose");
const imageSearchRouter = require("./routes/imageSearch");
const mealPlannerRoutes = require("./routes/mealPlanner");
const nutritionRoutes = require("./routes/nutritionAdvice");
const stravaRoutes = require("./routes/strava");

const app = express();
const PORT = process.env.PORT || 5000; // Cho phép cấu hình PORT qua env
app.use(cors());
// Middleware

app.use(bodyParser.json());

// MongoDB Connect
mongoose
  .connect(process.env.MONGODB_URI, { // Sử dụng biến môi trường
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/food", foodRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/food-recipes", foodRecipesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/", imageSearchRouter);
app.use("/api/recipes", mealPlannerRoutes);
app.use("/api/recipes", nutritionRoutes);
app.use("/strava", stravaRoutes);

// Swagger Docs
swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`✅ Server chạy tại ${process.env.API_BASE_URL || `http://localhost:${PORT}`}`);
  console.log(`📄 Swagger Docs tại ${process.env.API_BASE_URL || `http://localhost:${PORT}`}/api-docs`);
});
