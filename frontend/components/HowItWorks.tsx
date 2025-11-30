"use client";

import React from "react";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import { Sparkles } from "lucide-react";

export default function HowItWorks() {
  const dummyFoods = [
    { id: 1, name: "Gà kho gừng", img: "/2.avif" },
    { id: 2, name: "Bò xào ớt chuông", img: "/3.avif" },
    { id: 3, name: "Cơm chiên trứng", img: "/3.avif" },
    { id: 4, name: "Canh chua cá", img: "/2.avif" },
  ];

  return (
    <div className="bg-white py-16 px-4 md:px-8  text-black max-w-7xl mx-auto">
      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        {/* ========================== THẺ 1 ========================== */}
        <div className="col-span-4 p-6 rounded-2xl bg-gradient-to-r from-orange-300 to-orange-100 flex flex-col gap-4 relative overflow-hidden">
          <h2 className="text-3xl font-bold">Nấu gì hôm nay?</h2>

          {/* gợi ý món */}
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32 rounded-xl overflow-hidden">
              <Image
                src="/2.avif"
                fill
                alt="suggestion"
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="text-xl font-semibold">Gợi ý: Gà kho gừng</p>
            </div>

            {/* button đổi món */}
            <button className="px-4 py-2 flex items-center gap-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
              <RefreshCw size={18} /> Đổi món
            </button>
          </div>
        </div>

        {/* ========================== THẺ 2 (dọc) ========================== */}
        <div
          className="row-span-2 row-start-2 flex flex-col items-center justify-center 
  bg-gradient-to-b from-purple-400 to-purple-200 rounded-2xl p-4 shadow-md"
        >
          <div className="flex flex-col items-center gap-1 text-white font-bold text-xl">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span>Lựa</span>
            </div>
            <span>chọn</span>
            <span>bởi</span>
            <span>NutriAI</span>
          </div>
        </div>

        {/* ========================== THẺ 3 ========================== */}
        <div className="col-span-3 row-start-2 p-4">
          <FoodGrid title="" />
        </div>

        {/* ========================== THẺ 4 ========================== */}
        <div className="col-span-3 col-start-2 row-start-3 p-4">
          <FoodGrid title="" />
        </div>

        {/* ========================== THẺ 5 (dọc) ========================== */}
        <div
          className="row-span-2 col-start-4 row-start-4 flex flex-col items-center justify-center 
  bg-gradient-to-b from-green-400 to-green-200 rounded-2xl p-4 shadow-md"
        >
          <div className="flex flex-col items-center gap-1 text-white font-bold text-xl">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span>Món</span>
            </div>
            <span>ăn</span>
            <span>mới</span>
            <span>nhất</span>
          </div>
        </div>

        {/* ========================== THẺ 6 ========================== */}
        <div className="col-span-3 col-start-1 row-start-4 p-4">
          <FoodGrid title="" />
        </div>

        {/* ========================== THẺ 7 ========================== */}
        <div className="col-span-3 row-start-5 p-4">
          <FoodGrid title="" />
        </div>
      </div>
    </div>
  );
}

/* ------------------ COMPONENT GRID MÓN ĂN ------------------- */
function FoodGrid({ title }: { title: string }) {
  const foods = [
    { id: 1, name: "Mì xào bò", img: "/1.avif" },
    { id: 2, name: "Súp bí đỏ", img: "/1.avif" },
    { id: 3, name: "Salad trộn", img: "/1.avif" },
    { id: 4, name: "Tôm rim mặn", img: "/1.avif" },
  ];

  return (
    <div>
      {title && <h3 className="font-bold text-xl mb-3">{title}</h3>}

      <div className="grid grid-cols-4 gap-4">
        {foods.map((food) => (
          <div key={food.id} className="flex flex-col items-center">
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              <Image
                src={food.img}
                fill
                alt={food.name}
                className="object-cover"
              />
            </div>
            <p className="mt-1 text-sm font-medium text-center">{food.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
