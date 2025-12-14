import { Flame, Timer, MapPin, Gauge, Footprints } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import Recovery from "@/components/Recovery"; // <-- added

interface Props {
  id: number | null;
}

interface ActivityDetail {
  name: string;
  distance: number;
  moving_time: number;
  calories?: number;
  sport_type: string;
  start_date_local: string;
  // Thêm các trường khác nếu cần
}

interface ChartPoint {
  time: number;
  cadence: number;
  elev: number;
}

export default function ActivityByID({ id }: Props) {
  const [detail, setDetail] = useState<ActivityDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  // new state to show Recovery component and pass prefill values
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryPrefill, setRecoveryPrefill] = useState({
    distance: "",
    calories: "",
    moving_time: "",
    avg_speed: "",
  });

  useEffect(() => {
    if (!id) {
      setDetail(null);
      return;
    }
    async function fetchDetail() {
      setLoading(true);
      // Bước 1: Lấy access token từ BE
      const tokenRes = await fetch("https://food-suggestions-production.up.railway.app/strava/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: "177974",
          client_secret: "7092d11e41c2b89bef2b24678d29d27f587aa0b4",
          refresh_token: "0640a4dfef5184406480e3a7ae7bf61f59ccde8d",
        }),
      });
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      // Bước 2: Gọi API lấy chi tiết activity
      const res = await fetch(
        `https://food-suggestions-production.up.railway.app/strava/activities/${id}?access_token=${accessToken}`
      );
      const data = await res.json();
      setDetail(data);

      // 🔹 Tạo dữ liệu mẫu chart (sau này có thể thay bằng /streams API Strava)
      const fakeStream = Array.from({ length: 20 }, (_, i) => ({
        time: i * 10,
        cadence: Math.floor(Math.random() * 100),
        elev: Math.floor(Math.random() * 20),
      }));
      setChartData(fakeStream);

      setLoading(false);
    }
    fetchDetail();
  }, [id]);

  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] border rounded-xl bg-gray-50">
        <span className="text-gray-400 text-lg">
          Chọn một hoạt động để xem chi tiết
        </span>
      </div>
    );
  }

  if (loading || !detail) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] border rounded-xl bg-gray-50">
        <span className="text-gray-400 text-lg">Đang tải chi tiết...</span>
      </div>
    );
  }

  // Chart data
  const caloriesData = [
    { name: "Calories", value: detail.calories || 0, fill: "#f87171" },
  ];
  const avgSpeed = detail.moving_time ? (detail.distance / detail.moving_time) * 3.6 : 0;
  const speedData = [
    {
      name: "Avg Speed",
      value: Number(avgSpeed.toFixed(2)),
      fill: "#60a5fa",
    },
  ];

  return (
    <div className="p-4 border rounded-xl bg-white shadow space-y-4">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Footprints className="w-5 h-5 text-blue-500" />
          {detail.name}
        </h3>

        {/* Button -> truyền dữ liệu sang Recovery component */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              // chuyển các giá trị về dạng chuỗi như Recovery hiện đang xử lý
              setRecoveryPrefill({
                distance: ((detail.distance / 1000) || 0).toFixed(2), // km
                calories: String(detail.calories || 0),
                moving_time: (detail.moving_time / 3600).toFixed(2), // giờ
                avg_speed: avgSpeed.toFixed(2), // km/h
              });
              setShowRecovery(true);
            }}
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
          >
            Phục hồi thể trạng
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Quãng đường */}
        <div className="bg-blue-50 rounded-xl p-3 flex flex-col items-center">
          <MapPin className="w-5 h-5 text-blue-600 mb-1" />
          <span className="font-semibold">
            {(detail.distance / 1000).toFixed(2)} km
          </span>
          <span className="text-xs text-gray-500">Quãng đường</span>
        </div>
        {/* Calories */}
        <div className="bg-red-50 rounded-xl p-3 flex flex-col items-center">
          <Flame className="w-5 h-5 text-red-600 mb-1" />
          <span className="font-semibold">{detail.calories || 0}</span>
          <span className="text-xs text-gray-500">Calories</span>
          <div style={{ width: "100%", height: 40 }}>
            <ResponsiveContainer>
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                barSize={8}
                data={caloriesData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar dataKey="value" cornerRadius={50} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Tốc độ TB */}
        <div className="bg-green-50 rounded-xl p-3 flex flex-col items-center">
          <Gauge className="w-5 h-5 text-green-600 mb-1" />
          <span className="font-semibold">
            {((detail.distance / detail.moving_time) * 3.6).toFixed(2)} km/h
          </span>
          <span className="text-xs text-gray-500">Tốc độ TB</span>
          <div style={{ width: "100%", height: 40 }}>
            <ResponsiveContainer>
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                barSize={8}
                data={speedData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar dataKey="value" cornerRadius={50} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Thời gian */}
        <div className="bg-yellow-50 rounded-xl p-3 flex flex-col items-center">
          <Timer className="w-5 h-5 text-yellow-600 mb-1" />
          <span className="font-semibold">
            {(detail.moving_time / 60).toFixed(0)} phút
          </span>
          <span className="text-xs text-gray-500">Thời gian</span>
        </div>
        {/* Chart */}
        <div className="col-span-2 bg-purple-50 rounded-xl p-3">
          <h4 className="text-sm font-semibold text-purple-600 mb-2">
            Cadence / Elevation
          </h4>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={(v) => `${v}s`} />
                <YAxis />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === "elev") return [`${value} m`, "Elev"];
                    if (name === "cadence") return [`${value} spm`, "Cadence"];
                    return value;
                  }}
                  labelFormatter={(label: number) => `${label}s`}
                />
                <Line
                  type="monotone"
                  dataKey="cadence"
                  stroke="#d946ef"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="elev"
                  stroke="#3b82f6"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
         {/* Hiển thị Recovery component (ví dụ slide-down / panel) */}
      {showRecovery && (
        <div className=" items-end justify-end">
            <button
              onClick={() => setShowRecovery(false)}
              className="text-sm text-gray-500 hover:underline"
            >
              Đóng
            </button>
    
          <Recovery
            initialDistance={recoveryPrefill.distance}
            initialCalories={recoveryPrefill.calories}
            initialSpeed={recoveryPrefill.avg_speed}
            initialTime={recoveryPrefill.moving_time}
            onClose={() => setShowRecovery(false)}
          />
        </div>
      )}
    </div>
  );
}
