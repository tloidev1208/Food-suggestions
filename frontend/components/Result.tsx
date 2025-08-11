"use client";
import Image from "next/image";

type Nutrition = {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
};

type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
  cook_time: string;
  nutrition: Nutrition;
};

type Props = {
  result: {
    ingredients: string[];
    recipes: Recipe[];
  };
};

export default function SuggestionResult({ result }: Props) {
  return (
    <div className="w-full mt-6 text-left space-y-4">
      <h2 className="text-xl font-bold text-center">
        🥦 Nguyên liệu nhận diện:
      </h2>
      <p className="text-center">{result.ingredients.join(", ")}</p>

      <h2 className="text-xl font-bold mt-4">🍽️ Gợi ý món ăn:</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {result.recipes.map((r, i) => (
          <div
            key={i}
            className="p-4 border rounded shadow-sm bg-white transform hover:-translate-y-1 transition duration-200 ease-in-out cursor-pointer"
          >
            <h3 className="text-lg font-semibold">{r.name}</h3>
            <p className="mt-1">
              <strong>⏱ Thời gian nấu:</strong> {r.cook_time}
            </p>
            <p className="mt-1">
              <strong>Nguyên liệu:</strong> {r.ingredients.join(", ")}
            </p>
            <p className="mt-1">
              <strong>Cách nấu:</strong> {r.instructions}
            </p>

            {/* Thông tin dinh dưỡng */}
            {r.nutrition && (
              <div className="mt-2 text-sm text-gray-700">
                <strong>Thông tin dinh dưỡng:</strong>
                <ul className="list-disc list-inside">
                  <li>Calories: {r.nutrition.calories}</li>
                  <li>Protein: {r.nutrition.protein}</li>
                  <li>Fat: {r.nutrition.fat}</li>
                  <li>Carbs: {r.nutrition.carbs}</li>
                </ul>
              </div>
            )}

            {/* Hình ảnh */}
            {r.image && (
              <Image
                src={r.image}
                alt={r.name}
                width={800}
                height={256}
                className="mt-2 w-full object-cover rounded"
                style={{ maxHeight: "256px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
