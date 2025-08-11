//Nhập và quản lý nguyên liệu
"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type IngredientInputProps = {
  ingredientInput: string;
  setIngredientInput: (v: string) => void;
  ingredients: string[];
  setIngredients: (arr: string[]) => void;
};

export default function IngredientInput({
  ingredientInput,
  setIngredientInput,
  ingredients,
  setIngredients,
}: IngredientInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddIngredient = () => {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed) && ingredients.length < 3) {
      setIngredients([...ingredients, trimmed]);
      setIngredientInput("");
    }
  };

  const handleIngredientKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (item: string) => {
    setIngredients(ingredients.filter((ing) => ing !== item));
  };

  return (
    <div className="p-4 space-y-4">
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
    </div>
  );
}
