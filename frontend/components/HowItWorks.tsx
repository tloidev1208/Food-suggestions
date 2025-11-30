// app/components/HowItWorks.tsx
"use client";

import React from "react";

export default function HowItWorks() {

  // Dữ liệu mẫu món ăn
  const [dish, setDish] = React.useState({
    name: "Cơm chiên dương châu",
    image: "https://via.placeholder.com/200x150?text=Com+chien",
  });
  // Hàm đổi món ăn
  const changeDish = () => {
    // Có thể thay bằng API hoặc danh sách món ăn thực tế
    setDish(prev => prev.name === "Cơm chiên dương châu"
      ? { name: "Phở bò", image: "https://via.placeholder.com/200x150?text=Pho+bo" }
      : { name: "Cơm chiên dương châu", image: "https://via.placeholder.com/200x150?text=Com+chien" });
  };

  return (
    <div className="bg-white py-16 px-4 md:px-8 lg:px-16 text-black max-w-full mx-auto">
      <div className="grid grid-cols-3 grid-rows-4 gap-6">

        {/* Block 5 – Nấu gì hôm nay */}
        <div className="col-span-3 bg-orange-100 p-6 rounded-xl shadow flex flex-col items-center justify-center text-xl font-semibold">
          <span>Nấu gì hôm nay</span>
          <img src={dish.image} alt={dish.name} className="w-48 h-36 rounded-lg object-cover shadow my-4" />
          <span className="text-lg font-bold mb-2">{dish.name}</span>
          <button onClick={changeDish} className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition">Đổi món ăn khác</button>
        </div>

        {/* Sidebar 6 */}
<div className="row-start-2 bg-gray-100 p-6 rounded-xl shadow 
                flex flex-col items-center justify-center gap-2 
                min-h-[250px] w-[240px] mx-auto text-center">
  <h3 className="text-2xl font-semibold">🍜 Lựa chọn bởi Nutri AI</h3>
</div>

{/* Sidebar 7 */}
<div className="row-start-3 bg-gray-100 p-6 rounded-xl shadow 
                flex flex-col items-center justify-center gap-2 
                min-h-[250px] w-[240px] mx-auto text-center">
  <h3 className="text-2xl font-semibold">👨‍🍳 Món ăn mới nhất</h3>
</div>

{/* Sidebar 8 */}
<div className="row-start-4 bg-gray-100 p-6 rounded-xl shadow 
                flex flex-col items-center justify-center gap-2
                min-h-[250px] w-[240px] mx-auto text-center">
  <h3 className="text-2xl font-semibold">❤️ Bộ sưu tập nổi bật</h3>
</div>


        {/* Template render món ăn nhỏ */}
        {[0, 1, 2].map((blockIndex) => (
          <div key={blockIndex} className="col-span-2 col-start-2 bg-white p-4 rounded-xl shadow">
            <div className="grid grid-cols-4 grid-rows-2 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Hình món ăn nhỏ */}
                  <img
                    src="https://via.placeholder.com/24"
                    alt="food"
                    className="w-24 h-24 rounded-lg object-cover shadow"
                  />
                  <p className="mt-2 text-sm font-medium text-center">Món {blockIndex * 8 + i + 1}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}