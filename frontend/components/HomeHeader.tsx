"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Dish {
  name: string;
  image: string;
  time: string;
  description: string;
}

export default function HomeHeader() {
  const dishesToday: Dish[] = [
    {
      name: "Phở bò",
      image: "/images/pho-bo.avif",
      time: "30 phút",
      description: "Nguyên liệu: Bò, bánh phở, hành, gia vị. Cách nấu: Hầm xương, nấu nước dùng, trụng bánh phở...",
    },
    {
      name: "Bún chả",
      image: "/images/bun-cha.avif",
      time: "25 phút",
      description: "Nguyên liệu: Thịt heo, bún, rau sống, nước mắm. Cách nấu: Ướp thịt, nướng, pha nước chấm...",
    },
    {
      name: "Gỏi cuốn",
      image: "/images/goi-cuon.avif",
      time: "20 phút",
      description: "Nguyên liệu: Bánh tráng, tôm, thịt, rau sống. Cách làm: Cuốn tôm, thịt với rau, chấm nước mắm pha...",
    },
  ];

  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 pt-12">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <p className="uppercase text-sm tracking-wide text-gray-500">
            Xin chào! Chào mừng đến với thế giới ẩm thực tinh tế ✨!{" "}
            <span className="ml-1">🔥</span>
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="block">MÓN NGON</span>
            <span className="block text-red-500">GỢI Ý NHANH</span>
            <span className="block">TRỌN SỨC KHỎE</span>
          </h1>
          <p className="text-gray-600 max-w-md">
            Chúng tôi yêu bạn hơn cả món ăn — và luôn mang đến lựa chọn tốt nhất
            cho sức khỏe của bạn.
          </p>
          <div className="flex items-center gap-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg">
              Gợi ý Công Thức
            </Button>
            <div className="relative">
              <Button className="text-base md:text-lg px-6 py-3 bg-white text-black border border-gray-200 hover:bg-gray-100">
                Phân tích món ăn
              </Button>
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black px-2 py-0.5 rounded-full shadow">
                Coming soon
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[400px] h-[400px]">
            <Image
              src="/images/Bieu-do-dinh-duong21.jpg"
              alt="Delicious Food"
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Nấu gì hôm nay */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Nấu gì hôm nay?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishesToday.map((dish, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedDish(dish)}
            >
              <div className="relative w-full h-48">
                <Image src={dish.image} alt={dish.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{dish.name}</h3>
                <p className="text-gray-500 mt-1">{dish.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup hiển thị chi tiết món ăn */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
            <h3 className="text-2xl font-bold mb-2">{selectedDish.name}</h3>
            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
              <Image src={selectedDish.image} alt={selectedDish.name} fill className="object-cover" />
            </div>
            <p className="text-gray-700 mb-4">{selectedDish.description}</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSelectedDish(null)}>
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
