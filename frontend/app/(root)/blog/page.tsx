"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, FileText, Utensils } from "lucide-react";

interface Post {
  name: string;
  image: string;
  description: string;
}

export default function BlogPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewImage(preview);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image || !description) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPosts([
        ...posts,
        { name, image: reader.result as string, description },
      ]);
      handleReset();
      setOpenPopup(true);
    };

    if (image) reader.readAsDataURL(image);
  };

  const handleReset = () => {
    setName("");
    setImage(null);
    setPreviewImage(null);
    setDescription("");
  };

  return (
    <div className="min-h-screen pt-24 px-4 lg:px-12 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto mb-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* RIGHT SIDE – FORM */}
        <div className="bg-white p-7 rounded-2xl shadow-lg border border-orange-100 h-fit mt-14">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Tên món ăn */}
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <Utensils size={18} /> Tên món ăn
              </label>
              <Input
                type="text"
                placeholder="Ví dụ: Phở bò"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 border-gray-300 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Hình ảnh */}
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <ImagePlus size={18} /> Hình ảnh món ăn
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 border-gray-300 focus:ring-2 focus:ring-orange-300"
              />

              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-xl mt-3 shadow-md border"
                />
              )}
            </div>

            {/* Mô tả */}
            <div>
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <FileText size={18} /> Công thức & Cách làm
              </label>
              <Textarea
                placeholder="Nhập mô tả, nguyên liệu, cách chế biến…"
                className="mt-1 h-32 border-gray-300 focus:ring-2 focus:ring-orange-300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleReset}>
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Đăng món
              </Button>
            </div>
          </form>
        </div>
        {/* LEFT SIDE – text + banner */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            📸 Chia sẻ món ăn của bạn
          </h2>

          <p className="text-lg text-gray-600 mb-6">
            Hãy chia sẻ món ăn yêu thích của bạn và truyền cảm hứng cho cộng
            đồng FoodAI. Cùng nhau lan tỏa những món ăn ngon nhất!
          </p>

          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800"
            className="rounded-2xl shadow-lg border"
            alt="Food Banner"
          />
        </div>
      </div>

      {/* DANH SÁCH BÀI VIẾT */}
      <div className="max-w-4xl mx-auto mt-14 space-y-7">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {post.name}
            </h3>

            {post.image && (
              <img
                src={post.image}
                alt={post.name}
                className="w-full max-h-72 object-cover rounded-xl mb-4 shadow"
              />
            )}

            <h4 className="font-semibold text-gray-700 mb-1">
              Công thức & Cách làm
            </h4>

            <p className="text-gray-600 leading-relaxed">{post.description}</p>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {openPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-2xl p-6 shadow-xl max-w-sm w-full">
            <h3 className="text-2xl font-bold text-gray-800">🎉 Cảm ơn bạn!</h3>
            <p className="mt-2 text-gray-600">
              Món ăn của bạn đã được gửi thành công.
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                className="border px-3 py-1 rounded-xl hover:bg-gray-100 transition"
                onClick={() => setOpenPopup(false)}
              >
                Đóng
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-xl transition"
                onClick={() => setOpenPopup(false)}
              >
                Thêm món khác
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
