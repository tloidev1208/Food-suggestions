"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Calendar, Flame, Drumstick, Beef, Wheat } from "lucide-react";

interface NutritionTarget {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}
const defaultImagesByIndex = [
  "/images/morning.png",
  "/images/noon.png",
  "/images/night.png",
];
interface Meal {
  meal: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
  nutrition: NutritionTarget;
}

interface DayPlan {
  day: number;
  meals: Meal[];
}

export default function Meal() {
  const [days, setDays] = useState(2);
  const [nutrition, setNutrition] = useState<NutritionTarget>({
    calories: 2000,
    protein: 100,
    fat: 70,
    carbs: 250,
  });
  const [mealPlan, setMealPlan] = useState<DayPlan[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/recipes/meal-planner",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            days,
            nutrition_target: nutrition,
          }),
        }
      );
      const data = await res.json();
      if (data.meal_plan) {
        setMealPlan(data.meal_plan);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 py-20">
      <header className="text-center space-y-4 max-w-3xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Calendar className="w-8 h-8 text-blue-500" />
          Tạo kế hoạch bữa ăn
        </h1>
        <p className="text-lg text-gray-600">
         Nhập vào số ngày và mục tiêu dinh dưỡng của bạn, chúng tôi sẽ tạo kế
          hoạch bữa ăn hoàn hảo cho bạn. Dễ dàng điều chỉnh và tùy chỉnh theo sở
          thích cá nhân.
        </p>
      </header>
      {/* Form */}
      <Card className="mb-8 shadow-lg border-2 border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-700 text-2xl flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Nhập thông tin kế hoạch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Hàng trên: số ngày + các input dinh dưỡng */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <Input
                  className="pl-10"
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  placeholder="Số ngày VD: 2"
                />
              </div>
              <div className="relative">
                <Flame className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5" />
                <Input
                  className="pl-10"
                  type="number"
                  value={nutrition.calories}
                  onChange={(e) =>
                    setNutrition({
                      ...nutrition,
                      calories: Number(e.target.value),
                    })
                  }
                  placeholder="Calories VD: 2000"
                />
              </div>
              <div className="relative">
                <Drumstick className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <Input
                  className="pl-10"
                  type="number"
                  value={nutrition.protein}
                  onChange={(e) =>
                    setNutrition({
                      ...nutrition,
                      protein: Number(e.target.value),
                    })
                  }
                  placeholder="Protein VD: 100"
                />
              </div>
              <div className="relative">
                <Beef className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400 w-5 h-5" />
                <Input
                  className="pl-10"
                  type="number"
                  value={nutrition.fat}
                  onChange={(e) =>
                    setNutrition({ ...nutrition, fat: Number(e.target.value) })
                  }
                  placeholder="Fat VD: 70"
                />
              </div>
              <div className="relative">
                <Wheat className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 w-5 h-5" />
                <Input
                  className="pl-10"
                  type="number"
                  value={nutrition.carbs}
                  onChange={(e) =>
                    setNutrition({ ...nutrition, carbs: Number(e.target.value) })
                  }
                  placeholder="Carbs VD: 250"
                />
              </div>
            </div>
            {/* Hàng dưới: nút tạo kế hoạch */}
            <div className="flex justify-center mt-2">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full md:w-1/2 bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold text-lg py-2"
              >
                {loading ? "Đang tạo..." : "Tạo kế hoạch"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kết quả */}
      {mealPlan.length > 0 && (
        <div className="space-y-8">
          {mealPlan.map((day) => (
            <div key={day.day}>
              <h2 className="text-2xl font-bold mb-4 text-blue-700">Ngày {day.day}</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {day.meals.map((meal, index) => (
                  <Card
                    key={index}
                    className="flex flex-col hover:shadow-lg transition-shadow border-2 border-blue-100"
                  >
                    <div className="relative w-full h-64">
                      <Image
                        src={
                          defaultImagesByIndex[index] || "/images/default.png"
                        }
                        alt={meal.name || "Meal Image"}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardContent className="flex-1 flex flex-col justify-between p-4">
                      <div>
                        <h3 className="text-lg font-semibold text-pink-600">
                          {meal.meal.toUpperCase()} - {meal.name}
                        </h3>
                        <p className="text-sm mt-2">
                          <strong>Nguyên liệu:</strong> {meal.ingredients.join(", ")}
                        </p>
                        <p className="text-sm mt-2">
                          <strong>Cách làm:</strong> {meal.instructions}
                        </p>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          {meal.nutrition.calories} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Drumstick className="w-4 h-4 text-blue-500" />
                          {meal.nutrition.protein}g
                        </span>
                        <span className="flex items-center gap-1">
                          <Beef className="w-4 h-4 text-yellow-500" />
                          {meal.nutrition.fat}g
                        </span>
                        <span className="flex items-center gap-1">
                          <Wheat className="w-4 h-4 text-green-500" />
                          {meal.nutrition.carbs}g
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
