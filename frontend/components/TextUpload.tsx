'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
};

export default function TextUpload() {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddIngredient = () => {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (
      trimmed &&
      !ingredients.includes(trimmed) &&
      ingredients.length < 3
    ) {
      setIngredients([...ingredients, trimmed]);
      setIngredientInput('');
    }
  };

  const handleIngredientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (item: string) => {
    setIngredients(ingredients.filter((ing) => ing !== item));
  };

  const fetchRecipes = async () => {
    if (ingredients.length === 0) {
      setError('Vui lòng thêm ít nhất một nguyên liệu.');
      return;
    }

    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/food-suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      const data = await res.json();
      const raw = data?.recipes?.[0]?.raw;
      const match = raw?.match(/```json\n([\s\S]+?)\n```/);

      if (match && match[1]) {
        const parsed = JSON.parse(match[1]);
        setRecipes(parsed);
      } else {
        setError('Không thể phân tích dữ liệu trả về.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi khi gọi API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Thêm vào một nguyên liệu</h1>

      <div className="flex space-x-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Nhập nguyên liệu (tối đa 3)..."
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          onKeyDown={handleIngredientKeyDown}
          disabled={ingredients.length >= 3}
        />
        <Button
          type="button"
          onClick={handleAddIngredient}
          disabled={
            !ingredientInput.trim() ||
            ingredients.length >= 3 ||
            ingredients.includes(ingredientInput.trim().toLowerCase())
          }
        >
          Thêm
        </Button>
      </div>

      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ing, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-200"
              onClick={() => handleRemoveIngredient(ing)}
              title="Bấm để xoá"
            >
              {ing} ✕
            </span>
          ))}
        </div>
      )}

      <Button
        onClick={fetchRecipes}
        disabled={loading || ingredients.length === 0}
        className="w-full"
      >
        {loading ? 'Đang gợi ý...' : 'Gợi ý món ăn'}
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      {recipes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Kết quả:</h2>
          {recipes.map((r, i) => (
            <div key={i} className="border rounded p-4 shadow">
              <h3 className="font-bold text-lg">{r.name}</h3>
              <img src={r.image} alt={r.name} className="w-full h-48 object-cover mt-2 rounded" />
              <p className="mt-2"><strong>Nguyên liệu:</strong> {r.ingredients.join(', ')}</p>
              <p><strong>Cách làm:</strong> {r.instructions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
