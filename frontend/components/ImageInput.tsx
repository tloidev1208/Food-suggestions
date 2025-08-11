"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type ImageInputProps = {
  images: File[];
  setImages: (images: File[]) => void;
  previews: string[];
  setPreviews: (previews: string[]) => void;
};

export default function ImageInput({
  images,
  setImages,
  previews,
  setPreviews,
}: ImageInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, 3);
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  return (
    <div className="space-y-4 px-4 pt-4 mb-12">
      <Input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        placeholder="Chọn ảnh (tối đa 3)"
        onChange={handleChange}
        disabled={images.length >= 3}
      />

      <div className="grid grid-cols-3 gap-4 mt-4 w-full">
        {previews.map((src, index) => (
          <div
            key={index}
            className="relative w-full aspect-square border rounded overflow-hidden group"
          >
            <Image
              src={src}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1 opacity-80 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
