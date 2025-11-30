"use client";

import { useState } from "react";
import { ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function Analysis() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PREDICT_URL}/predict`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Upload failed:", error);
      setResult({ label: "Lỗi phân tích ảnh", confidence: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between py-20 px-6 max-w-6xl">
      {/* Header */}
      <header className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800">
          🔍 Nhận diện món ăn bằng hình ảnh
        </h1>
        <p className="text-lg text-gray-600">
          Tải lên hình ảnh món ăn và hệ thống AI sẽ tự động phân tích để nhận diện tên món cùng độ tin cậy.
        </p>
      </header>

      {/* Upload area */}
      <section className="mt-6 w-full max-w-7xl bg-white p-6 rounded-xl shadow-md border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ImageUp className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              Tải lên ảnh món ăn
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Input type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer" />

          {preview && (
            <div className="flex justify-center mt-2">
              <Image
                src={preview}
                alt="Preview"
                width={350}
                height={250}
                className="rounded-lg border shadow-sm object-cover"
              />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="bg-gray-500 hover:bg-gray-600 text-white mt-3"
            disabled={!file || loading}
          >
            {loading ? "Đang phân tích..." : "Phân tích hình ảnh"}
          </Button>

          {loading && (
            <div className="w-full max-w-xs mt-2">
              <Progress value={60} />
            </div>
          )}

          {result && (
            <div className="mt-6 w-full max-w-md bg-blue-50 border border-blue-200 rounded-xl p-5 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-800">
                Kết quả:{" "}
                <span className="text-blue-600">{result.label}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Độ tin cậy: {(result.confidence * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
