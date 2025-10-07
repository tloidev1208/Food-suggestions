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
import { Ruler, Weight, User, HeartPulse, Dumbbell, Target } from "lucide-react";

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
      <Card className="shadow-lg border-2 border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-700 text-2xl flex items-center gap-2">
            <HeartPulse className="w-7 h-7 text-pink-500" />
            Nhập thông tin để nhận tư vấn dinh dưỡng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Hàng trên: 3 input */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <Input
                  className="pl-10"
                  placeholder="Chiều cao (cm)"
                  value={form.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                />
              </div>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 w-5 h-5" />
                <Input
                  className="pl-10"
                  placeholder="Cân nặng (kg)"
                  value={form.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
                <Input
                  className="pl-10"
                  placeholder="Tuổi"
                  value={form.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                />
              </div>
            </div>

            {/* Hàng dưới: 3 select nằm ngang */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select
                  value={form.gender}
                  onValueChange={(v) => handleChange("gender", v)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nam">Nam</SelectItem>
                    <SelectItem value="Nữ">Nữ</SelectItem>
                  </SelectContent>
                </Select>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <HeartPulse className="w-5 h-5 text-pink-400" />
                </span>
              </div>
              <div>
                <Select
                  value={form.activity_level}
                  onValueChange={(v) => handleChange("activity_level", v)}
                >
                  <SelectTrigger className="pl-10">
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Dumbbell className="w-5 h-5 text-orange-400" />
                </span>
              </div>
              <div>
                <Select
                  value={form.goal}
                  onValueChange={(v) => handleChange("goal", v)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Mục tiêu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintain">Duy trì cân nặng</SelectItem>
                    <SelectItem value="lose">Giảm cân</SelectItem>
                    <SelectItem value="gain">Tăng cân</SelectItem>
                  </SelectContent>
                </Select>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Target className="w-5 h-5 text-blue-400" />
                </span>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-2 bg-gray-500 hover:bg-gray-600 hover:text-white cursor-pointe text-white font-bold text-lg py-2"
            >
              {loading ? "Đang phân tích..." : "Phân tích"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}