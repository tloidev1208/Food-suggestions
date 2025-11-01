"use client";

import React, { useState, useEffect } from "react";

interface RecoveryProps {
  initialDistance?: string;
  initialCalories?: string;
  initialSpeed?: string;
  initialTime?: string;
  onClose?: () => void;
}

export default function RecoveryPage({
  initialDistance = "",
  initialCalories = "",
  initialSpeed = "",
  initialTime = "",
  onClose,
}: RecoveryProps) {
  const [distance, setDistance] = useState(initialDistance);
  const [calories, setCalories] = useState(initialCalories);
  const [speed, setSpeed] = useState(initialSpeed);
  const [time, setTime] = useState(initialTime);
  const [result, setResult] = useState("");

  // keep local state in sync if parent changes props
  useEffect(() => {
    setDistance(initialDistance);
    setCalories(initialCalories);
    setSpeed(initialSpeed);
    setTime(initialTime);
  }, [initialDistance, initialCalories, initialSpeed, initialTime]);

  const handleAnalyze = () => {
    if (!distance || !calories || !speed || !time) {
      setResult("Vui lòng nhập đầy đủ dữ liệu!");
      return;
    }

    // Tạo kết quả gợi ý phục hồi (ví dụ đơn giản)
    setResult(
      `Dựa trên ${distance} km, ${calories} kcal, tốc độ ${speed} km/h và thời gian ${time} giờ: 
- Uống nước đủ và bổ sung carbohydrate nhanh (chuối, nước uống thể thao).
- Bổ sung protein sau 30-60 phút (ức gà, sữa chua).
- Nghỉ ngơi và giãn cơ nhẹ.`
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Phục hồi sức khỏe</h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAnalyze();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block mb-2 text-sm font-medium">Quãng đường (km)</label>
          <input
            type="number"
            step="0.01"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Calories đã tiêu</label>
          <input
            type="number"
            step="1"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Tốc độ trung bình (km/h)</label>
          <input
            type="number"
            step="0.01"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Thời gian (giờ)</label>
          <input
            type="number"
            step="0.01"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Phân tích
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-green-50 border border-green-100 text-green-800 rounded-lg">
          {result}
        </div>
      )}
    </div>
  );
}