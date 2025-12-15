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
  const [loading, setLoading] = useState(false);

  // Sync data from parent
  useEffect(() => {
    setDistance(initialDistance);
    setCalories(initialCalories);
    setSpeed(initialSpeed);
    setTime(initialTime);
  }, [initialDistance, initialCalories, initialSpeed, initialTime]);

  // Gọi API recovery
  const handleAnalyze = async () => {
    if (!distance || !calories || !speed || !time) {
      setResult("Vui lòng nhập đầy đủ dữ liệu!");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distance: Number(distance),
          calories: Number(calories),
          avg_speed: Number(speed),
          duration: Number(time),
        }),
      });

      const data = await res.json();

      if (data?.result) {
        setResult(JSON.stringify(data.result, null, 2));
      } else {
        setResult("Không nhận được dữ liệu từ server!");
      }
    } catch (error) {
      console.error("API error:", error);
      setResult("Lỗi kết nối tới API!");
    } finally {
      setLoading(false);
    }
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
          <label className="block mb-2 text-sm font-medium">
            Quãng đường (km)
          </label>
          <input
            type="number"
            step="0.01"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Calories đã tiêu
          </label>
          <input
            type="number"
            step="1"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Tốc độ trung bình (km/h)
          </label>
          <input
            type="number"
            step="0.01"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Thời gian (giờ)
          </label>
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
            disabled={loading}
          >
            {loading ? "Đang phân tích..." : "Phân tích"}
          </button>
        </div>
      </form>

   {(() => {
  if (!result) return null;

  let r;
  try {
    r = JSON.parse(result);
  } catch {
    return (
      <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-lg">
        {result}
      </div>
    );
  }
interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
  const SectionCard = ({ title, icon, children }: SectionCardProps) => (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-700 text-sm">{children}</div>
    </div>
  );

  return (
    <div className="mt-6 space-y-4">
      <SectionCard title="Cường độ buổi tập" icon={<span className="text-blue-500 text-xl">🔥</span>}>
        <p className="text-lg font-bold text-blue-600 capitalize">{r.intensity}</p>
        <p className="text-gray-600 mt-1">{r.summary}</p>
      </SectionCard>

      <SectionCard title="Bổ sung nước & điện giải" icon={<span className="text-cyan-500 text-xl">💧</span>}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nước cần nạp</p>
            <p className="text-lg font-semibold text-cyan-600">{r.water_intake} ml</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Điện giải</p>
            <p className="text-lg font-semibold text-cyan-600">{r.electrolytes}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Dinh dưỡng khuyến nghị" icon={<span className="text-green-600 text-xl">🥗</span>}>
        <ul className="space-y-2">
          {r.nutrition?.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Bài giãn cơ" icon={<span className="text-purple-500 text-xl">🧘‍♂️</span>}>
        <ul className="space-y-2">
          {r.stretching?.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Thời gian nghỉ" icon={<span className="text-orange-500 text-xl">⏱️</span>}>
        <p className="text-lg font-semibold text-orange-600">{r.rest_time}</p>
      </SectionCard>

      {r.warnings?.length > 0 && (
        <SectionCard title="Cảnh báo" icon={<span className="text-red-500 text-xl">⚠️</span>}>
          <ul className="space-y-2">
            {r.warnings.map((w: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-red-600">{w}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}
    </div>
  );
})()}



    </div>
  );
}
