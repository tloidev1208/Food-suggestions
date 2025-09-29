"use client";
import NutritionResult from "@/components/NutritionResult";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Drumstick, Wheat, Droplets, Salad, Ban, Utensils, Info } from "lucide-react";
import NutritionForm from "@/components/NutritionForm";

interface NutritionResult {
  status: string;
  bmi: number;
  bmi_status: string;
  bmr: number;
  tdee: number;
  recommended_calories: number;
  macros: {
    protein: { grams: number; percent: number };
    fat: { grams: number; percent: number };
    carbs: { grams: number; percent: number };
  };
  ai?: {
    foods_to_eat: string[];
    foods_to_limit: string[];
    sample_meal_plan: {
      breakfast: string;
      lunch: string;
      dinner: string;
      snack: string;
    };
    advice: string;
  };
}

export default function NutritionAdvicePage() {
  const [form, setForm] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "Nam",
    activity_level: "moderate",
    goal: "maintain",
  });

  const [result, setResult] = useState<NutritionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/recipes/nutrition-advice",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            height: Number(form.height),
            weight: Number(form.weight),
            age: Number(form.age),
            gender: form.gender,
            activity_level: form.activity_level,
            goal: form.goal,
          }),
        }
      );
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const bmiData =
    result && result.status === "success"
      ? [{ name: "BMI", value: result.bmi, fill: "#3c8cfb" }]
      : [];
  const tdeeData =
    result && result.status === "success"
      ? [{ name: "TDEE", value: result.tdee, fill: "#C6005C" }]
      : [];

  return (
    <div className="max-w-6xl mx-auto p-6 py-20 ">
      <header className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800">
          🍽️ Tư vấn dinh dưỡng
        </h1>
        <p className="text-lg text-gray-600">
          Nhập vào thông tin cá nhân và mục tiêu dinh dưỡng của bạn, chúng tôi sẽ
          cung cấp lời khuyên dinh dưỡng chi tiết, bao gồm phân tích BMI, TDEE,
          lượng calo khuyến nghị.
        </p>
      </header>
      <NutritionForm
        form={form}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {result && result.status === "success" && (
        <Card>
          <CardHeader>
            <CardTitle>Kết quả phân tích</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hàng 1: NutritionResult + Macro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NutritionResult */}
              <div>
                <NutritionResult
                  result={result}
                  bmiData={bmiData}
                  tdeeData={tdeeData}
                />
              </div>
              {/* Macro */}
              <div className="grid grid-cols-3 gap-4">
                {/* Protein */}
                <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                  <div className="flex items-center justify-center gap-2 text-red-700 font-medium">
                    <Drumstick className="w-5 h-5" />
                    Protein
                  </div>
                  <p className="text-xl font-semibold mt-2">
                    {result.macros.protein.grams}g
                  </p>
                  <p className="text-sm text-gray-600">
                    ({result.macros.protein.percent}%)
                  </p>
                </div>
                {/* Fat */}
                <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                  <div className="flex items-center justify-center gap-2 text-yellow-700 font-medium">
                    <Droplets className="w-5 h-5" />
                    Fat
                  </div>
                  <p className="text-xl font-semibold mt-2">
                    {result.macros.fat.grams}g
                  </p>
                  <p className="text-sm text-gray-600">
                    ({result.macros.fat.percent}%)
                  </p>
                </div>
                {/* Carbs */}
                <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                  <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
                    <Wheat className="w-5 h-5" />
                    Carbs
                  </div>
                  <p className="text-xl font-semibold mt-2">
                    {result.macros.carbs.grams}g
                  </p>
                  <p className="text-sm text-gray-600">
                    ({result.macros.carbs.percent}%)
                  </p>
                </div>
              </div>
            </div>
            {/* Hàng 2: 3 list item */}
            {result.ai && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Thực phẩm nên ăn */}
                <div className="bg-green-50 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 font-medium text-green-700">
                    <Salad className="w-5 h-5" />
                    Thực phẩm nên ăn
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {result.ai.foods_to_eat.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                {/* Thực phẩm nên hạn chế */}
                <div className="bg-red-50 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 font-medium text-red-700">
                    <Ban className="w-5 h-5" />
                    Thực phẩm nên hạn chế
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {result.ai.foods_to_limit.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                {/* Gợi ý thực đơn mẫu */}
                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 font-medium text-blue-700">
                    <Utensils className="w-5 h-5" />
                    Gợi ý thực đơn mẫu
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    <li>
                      <strong>Bữa sáng:</strong>{" "}
                      {result.ai.sample_meal_plan.breakfast}
                    </li>
                    <li>
                      <strong>Bữa trưa:</strong>{" "}
                      {result.ai.sample_meal_plan.lunch}
                    </li>
                    <li>
                      <strong>Bữa tối:</strong>{" "}
                      {result.ai.sample_meal_plan.dinner}
                    </li>
                    <li>
                      <strong>Bữa phụ:</strong>{" "}
                      {result.ai.sample_meal_plan.snack}
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {/* Hàng 3: Lời khuyên */}
            {result.ai && (
              <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2 font-medium text-yellow-700">
                  <Info className="w-5 h-5" />
                  Lời khuyên
                </div>
                <p className="text-sm text-gray-700">{result.ai.advice}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
