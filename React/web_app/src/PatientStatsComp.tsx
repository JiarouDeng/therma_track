import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const data = [
  { time: "08:00", temperature: 98.6 },
  { time: "10:00", temperature: 99.1 },
  { time: "12:00", temperature: 99.5 },
  { time: "14:00", temperature: 100.2 },
  { time: "16:00", temperature: 101.0 },
];

function PatientStatsComp() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Patient Temperature Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            domain={[98, 102]}
            label={{ value: "°F", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ff7300"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <button className="spaced" onClick={() => navigate("/")}>
        Log out
      </button>
    </div>
  );
}

export default PatientStatsComp;
