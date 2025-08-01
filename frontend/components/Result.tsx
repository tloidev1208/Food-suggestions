// components/SuggestionResult.tsx
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
      <h2 className="text-xl font-bold">🥦 Nguyên liệu nhận diện:</h2>
      <p>{result.ingredients.join(', ')}</p>

      <h2 className="text-xl font-bold mt-4">🍽️ Gợi ý món ăn:</h2>
      {result.recipes.map((r, i) => (
        <div key={i} className="p-4 border rounded shadow-sm">
          <h3 className="text-lg font-semibold">{r.name}</h3>
          <p>
            <strong>Nguyên liệu:</strong> {r.ingredients.join(', ')}
          </p>
          <p>
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
  );
}
// components/ui/ImageUpload.tsx