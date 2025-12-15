# 🍱 AI Food Suggestion App

Ứng dụng cho phép người dùng tải ảnh món ăn và sử dụng AI để gợi ý công thức nấu ăn, nguyên liệu, và hướng dẫn chế biến.

---

## 🖥️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Ant Design
- **Backend**: Node.js, Express.js, Multer
- **Database**: MongoDB (MongoDB Atlas)
- **AI**: Google Generative AI API (Gemini)

---

## 📦 Folder Structure

project-root/
│
├── FE/ # Next.js app (FE)
└── BE/ # Express.js API (BE)

## 🚀 How to Run Frontend

```bash
cd FE
npm install
npm run dev
✅ Frontend chạy tại: http://localhost:3000

🛠️ How to Run Backend
cd BE
npm install
node server.js
✅ Backend chạy tại: http://localhost:5000

🍃 How to Connect to MongoDB
Truy cập: https://cloud.mongodb.com và tạo một Cluster mới.

Tạo Database, User và mật khẩu.

Lấy connection string (MongoDB URI), ví dụ:

mongodb+srv://<username>:<password>@cluster0.mongodb.net/food-app?retryWrites=true&w=majority
Trong thư mục food-backend/, tạo file .env:

env

PORT=5000
MONGO_URI=your_mongo_uri_here
GOOGLE_API_KEY=your_google_generative_ai_key

Khởi động lại server:
node server.js
📸 Upload Ảnh
Bạn có thể upload tối đa 3 ảnh món ăn.

Ảnh sẽ được gửi đến API backend tại:

POST /api/food-recipes/suggest
Backend sẽ xử lý ảnh, nhận diện nguyên liệu, và dùng AI để gợi ý món ăn tương ứng.

📚 API Docs
Swagger Docs:

bash
Copy
Edit
${process.env.NEXT_PUBLIC_API_URL}-docs


Run code
B1: cd BE -> 