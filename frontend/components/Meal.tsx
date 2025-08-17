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
    <div className="max-w-5xl mx-auto p-4">
      {/* Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Tạo kế hoạch bữa ăn
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Số ngày */}
            <div>
              <label className="block mb-1 text-sm font-medium flex items-center gap-1">
                <Calendar className="w-4 h-4 text-red-500" /> Số ngày
              </label>
              <Input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                placeholder="VD: 2"
              />
            </div>

            {/* Calories */}
            <div>
              <label className="block mb-1 text-sm font-medium flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" /> Calories
              </label>
              <Input
                type="number"
                value={nutrition.calories}
                onChange={(e) =>
                  setNutrition({
                    ...nutrition,
                    calories: Number(e.target.value),
                  })
                }
                placeholder="VD: 2000"
              />
            </div>

            {/* Protein */}
            <div>
              <label className="block mb-1 text-sm font-medium flex items-center gap-1">
                <Drumstick className="w-4 h-4 text-blue-500" /> Protein (g)
              </label>
              <Input
                type="number"
                value={nutrition.protein}
                onChange={(e) =>
                  setNutrition({
                    ...nutrition,
                    protein: Number(e.target.value),
                  })
                }
                placeholder="VD: 100"
              />
            </div>

            {/* Fat */}
            <div>
              <label className="block mb-1 text-sm font-medium flex items-center gap-1">
                <Beef className="w-4 h-4 text-yellow-500" /> Fat (g)
              </label>
              <Input
                type="number"
                value={nutrition.fat}
                onChange={(e) =>
                  setNutrition({ ...nutrition, fat: Number(e.target.value) })
                }
                placeholder="VD: 70"
              />
            </div>

            {/* Carbs */}
            <div>
              <label className=" mb-1 text-sm font-medium flex items-center gap-1">
                <Wheat className="w-4 h-4 text-green-500" /> Carbs (g)
              </label>
              <Input
                type="number"
                value={nutrition.carbs}
                onChange={(e) =>
                  setNutrition({ ...nutrition, carbs: Number(e.target.value) })
                }
                placeholder="VD: 250"
              />
            </div>
          </div>
          <div className="justify-center flex mt-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-2 w-lg cursor-pointer"
            >
              {loading ? "Đang tạo..." : "Tạo kế hoạch"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kết quả */}
      {mealPlan.length > 0 && (
        <div className="space-y-8">
          {mealPlan.map((day) => (
            <div key={day.day}>
              <h2 className="text-2xl font-bold mb-4">Ngày {day.day}</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {day.meals.map((meal, index) => (
                  <Card
                    key={index}
                    className="flex flex-col hover:shadow-lg transition-shadow"
                  >
                    <div className="relative w-full h-72">
                      <Image
                        src={
                          defaultImagesByIndex[index] || "/images/default.png"
                        }
                        alt={meal.name || "Meal Image"}
                        fill
                        className="object-cover rounded-t-lg "
                      />
                    </div>

                    <CardContent className="flex-1 flex flex-col justify-between p-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {meal.meal.toUpperCase()} - {meal.name}
                        </h3>
                        <p className="text-sm mt-2">
                          <strong>Nguyên liệu:</strong>{" "}
                          {meal.ingredients.join(", ")}
                        </p>
                        <p className="text-sm mt-2">
                          <strong>Cách làm:</strong> {meal.instructions}
                        </p>
                      </div>
                      <div className="mt-3 text-xs text-gray-600">
                        Calories: {meal.nutrition.calories} | Protein:{" "}
                        {meal.nutrition.protein}g | Fat: {meal.nutrition.fat}g |
                        Carbs: {meal.nutrition.carbs}g
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
