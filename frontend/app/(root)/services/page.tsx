"use client";

import React, { useState } from "react";
import { Utensils, Leaf, Calendar,BarChart3 } from "lucide-react";

import Recipes from "@/components/Recipes";
import Analysis from "@/components/Analysis";
import Nutrition from "@/components/Nutrition";
import Meal from "@/components/Meal";
import Recovery from "@/components/Recovery";



const Service = () => {
  const [active, setActive] = useState("nhanDien");

  const menuItems = [
    { id: "nhanDien", label: "Nhận diện món ăn", icon: <Utensils size={20} />, component: <Recipes /> },
    { id: "phanTich", label: "Phân tích món ăn", icon: <BarChart3 size={20} />, component: <Analysis /> },
    { id: "tuVan", label: "Tư vấn dinh dưỡng", icon: <Leaf size={20} />, component: <Nutrition /> },
    { id: "lapKeHoach", label: "Lập kế hoạch bữa ăn", icon: <Calendar size={20} />, component: <Meal/> },
    { id: "phucHoi", label: "Phục hồi thể trạng", icon: <Calendar size={20} />, component: <Recovery/> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar cố định */}
      <div className="w-1/4 border-r p-4 sticky top-0 h-screen">
        <h2 className="text-lg font-semibold mb-4 mt-16 ">Dịch vụ</h2>
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg ${
                active === item.id
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Content scroll riêng */}
      <div className="flex-1 p-6 overflow-y-auto h-screen">
        {menuItems.find((item) => item.id === active)?.component}
      </div>
    </div>
  );
};

export default Service;
