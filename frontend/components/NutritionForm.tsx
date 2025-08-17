"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface NutritionFormProps {
  form: {
    height: string;
    weight: string;
    age: string;
    gender: string;
    activity_level: string;
    goal: string;
  };
  loading: boolean;
  handleChange: (key: string, value: string) => void;
  handleSubmit: () => void;
}

export default function NutritionForm({
  form,
  loading,
  handleChange,
  handleSubmit,
}: NutritionFormProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Nhập thông tin để nhận tư vấn dinh dưỡng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Chiều cao (cm)"
              value={form.height}
              onChange={(e) => handleChange("height", e.target.value)}
            />
            <Input
              placeholder="Cân nặng (kg)"
              value={form.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
            <Input
              placeholder="Tuổi"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />

            <div className="flex flex-col md:flex-row gap-4">
              <Select
                value={form.gender}
                onValueChange={(v) => handleChange("gender", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nam">Nam</SelectItem>
                  <SelectItem value="Nữ">Nữ</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={form.activity_level}
                onValueChange={(v) => handleChange("activity_level", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Mức độ hoạt động" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Ít vận động</SelectItem>
                  <SelectItem value="light">Nhẹ</SelectItem>
                  <SelectItem value="moderate">Trung bình</SelectItem>
                  <SelectItem value="active">Nhiều</SelectItem>
                  <SelectItem value="very_active">Rất nhiều</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={form.goal}
                onValueChange={(v) => handleChange("goal", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Mục tiêu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintain">Duy trì cân nặng</SelectItem>
                  <SelectItem value="lose">Giảm cân</SelectItem>
                  <SelectItem value="gain">Tăng cân</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Đang phân tích..." : "Phân tích"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}