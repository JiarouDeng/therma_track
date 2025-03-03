import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  patient_id: string;
}

function PatientStatsComp({ patient_id }: Props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/temperature/${patient_id}`)
      .then((res) => {
        const formatted_data = res.data.map(
          (entry: { timestamp: Date; temp_data: number }) => ({
            timestamp: format(new Date(entry.timestamp), "yyyy-MM-dd HH:mm:ss"),
            temp_data: entry.temp_data,
          })
        );
        console.log(formatted_data);
        setData(formatted_data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [patient_id]);

  const temp_datas = data.map(
    (entry: { timestamp: Date; temp_data: number }) => entry.temp_data
  );

  // Ensure there is valid data
  const min_temp: number = temp_datas.length ? Math.min(...temp_datas) - 1 : 30;
  const max_temp: number = temp_datas.length ? Math.max(...temp_datas) + 1 : 45;

  return (
    <div>
      <h2>
        {data.length === 0
          ? "No data stored currently. Waiting for more data"
          : "Patient Temperature Over Time"}
      </h2>
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis
              domain={[min_temp, max_temp]}
              label={{ value: "°C", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temp_data"
              stroke="#ff7300"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default PatientStatsComp;
