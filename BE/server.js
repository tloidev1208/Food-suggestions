const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerDocs = require("./swagger");

// Import các routes
const foodRoutes = require("./routes/food");
const recipeRoutes = require("./routes/recipes");
const foodRecipesRoutes = require("./routes/food-recipes");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connect
mongoose
  .connect("mongodb://127.0.0.1:27017/food_project", {
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

// Swagger Docs
swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
  console.log(`📄 Swagger Docs tại http://localhost:${PORT}/api-docs`);
});
