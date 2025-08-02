'use client';

type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
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
      <h2 className="text-xl font-bold text-center">🥦 Nguyên liệu nhận diện:</h2>
      <p className="text-center">{result.ingredients.join(', ')}</p>

      <h2 className="text-xl font-bold mt-4">🍽️ Gợi ý món ăn:</h2>

      {/* Grid hiển thị 2 món trên 1 hàng */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {result.recipes.map((r, i) => (
          <div key={i} className="p-4 border rounded shadow-sm bg-white    transform hover:-translate-y-1 transition duration-200 ease-in-out cursor-pointer">
            <h3 className="text-lg font-semibold">{r.name}</h3>
            <p className="mt-1">
              <strong>Nguyên liệu:</strong> {r.ingredients.join(', ')}
            </p>
            <p className="mt-1">
              <strong>Cách nấu:</strong> {r.instructions}
            </p>
            {r.image && (
              <img
                src={r.image}
                alt={r.name}
                className="mt-2 w-full max-h-64 object-cover rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
