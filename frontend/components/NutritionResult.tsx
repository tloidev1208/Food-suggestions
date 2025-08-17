"use client";
import { ChartArea, Heart, Flame } from "lucide-react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

interface NutritionResultProps {
  result: any;
  bmiData: any[];
  tdeeData: any[];
}

export default function NutritionResult({ result, bmiData, tdeeData }: NutritionResultProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mx-auto">
      {/* BMI */}
      <div className="bg-blue-50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-blue-700 font-medium">
          <ChartArea className="w-5 h-5" />
          CHỈ SỐ CƠ THỂ (BMI)
        </div>
        <div style={{ width: "100%", height: 100 }}>
          <ResponsiveContainer>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={10}
              data={bmiData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar dataKey="value" cornerRadius={50} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-2xl font-semibold mt-2">{result.bmi}</p>
      </div>

      {/* BMI status */}
      <div className="bg-orange-50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-orange-700 font-medium">
          <ChartArea className="w-5 h-5" />
          TRẠNG THÁI BMI
        </div>
         <div style={{ width: "100%", height: 100 }}>
          <ResponsiveContainer>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={10}
              data={tdeeData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar dataKey="value" cornerRadius={50} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-lg font-semibold text-center">{result.bmi_status}</p>
      </div>

      {/* BMR */}
      <div className="bg-green-50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-green-700 font-medium">
          <Heart className="w-5 h-5" />
          BMR
        </div>
        <div style={{ width: "100%", height: 100 }}>
          <ResponsiveContainer>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={10}
              data={[{ name: "BMR", value: result.bmr }]}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar dataKey="value" cornerRadius={50} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-2xl font-semibold mt-2">{result.bmr}</p>
      </div>

      {/* TDEE */}
      <div className="bg-pink-50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-pink-700 font-medium">
          <Flame className="w-5 h-5" />
          TDEE
        </div>
        <div style={{ width: "100%", height: 100 }}>
          <ResponsiveContainer>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={10}
              data={tdeeData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar dataKey="value" cornerRadius={50} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-2xl font-semibold mt-2">{result.tdee}</p>
      </div>

      {/* Calories khuyến nghị */}
      <div className="bg-purple-50 rounded-2xl p-4 shadow-sm col-span-2">
        <div className="text-purple-700 font-medium text-center mb-2">
          Calories khuyến nghị
        </div>
        <p className="text-lg font-semibold text-center">
          {result.recommended_calories}
        </p>
      </div>
    </div>
  );
}