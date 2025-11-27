"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Post {
  name: string;
  image: string; // data URL
  description: string;
}

export default function BlogPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // ⭐ preview ảnh
  const [description, setDescription] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  // Khi chọn ảnh -> tạo preview
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

  // Submit form
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

  // Reset form
  const handleReset = () => {
    setName("");
    setImage(null);
    setPreviewImage(null); // reset preview ⭐
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 lg:px-12">
      <div className="max-w-xl mx-auto mb-6">

        {/* Tiêu đề form */}
        <h2 className="text-3xl font-bold mb-6 text-center">
          Chia sẻ món ăn của bạn
        </h2>

        {/* Slogan */}
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-700">
            🍲 Hãy chia sẻ công thức yêu thích của bạn và truyền cảm hứng cho mọi người!
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            <div>
              <label className="font-medium">Tên món ăn</label>
              <Input
                type="text"
                placeholder="Ví dụ: Phở bò"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Hình ảnh món ăn</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1"
              />

              {/* ⭐ Preview ảnh khi chọn file */}
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full max-h-60 object-cover rounded mt-3 shadow"
                />
              )}
            </div>

            <div>
              <label className="font-medium">Công thức & Cách làm</label>
              <Textarea
                placeholder="Nhập mô tả, nguyên liệu, cách chế biến…"
                className="mt-1 h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <Button type="button" variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <Button type="submit" className="bg-red-500 hover:bg-red-600">
                Đồng ý
              </Button>
            </div>

          </form>
        </div>

        {/* Hiển thị bài viết đã post */}
        <div className="mt-8 space-y-6">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2">{post.name}</h3>

              {post.image && (
                <img
                  src={post.image}
                  alt={post.name}
                  className="w-full max-h-60 object-cover rounded mb-2"
                />
              )}

              <div>
                <h4 className="font-medium text-gray-700 mb-1">
                  Công thức & Cách làm:
                </h4>
                <p className="text-gray-600">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup cảm ơn */}
      {openPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-6 shadow max-w-sm w-full">
            <h3 className="text-xl font-bold">🎉 Cảm ơn bạn!</h3>
            <p className="mt-2 text-gray-600">
              Món ăn của bạn đã được gửi thành công.
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="border px-3 py-1 rounded"
                onClick={() => setOpenPopup(false)}
              >
                Đóng
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => setOpenPopup(false)}
              >
                Tiếp tục thêm món ăn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
