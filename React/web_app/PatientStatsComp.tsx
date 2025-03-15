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
import { API_BASE_URL } from "./config_constants";

interface Props {
  patient_id: string;
}

function PatientStatsComp({ patient_id }: Props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/temperature/${patient_id}`)
      .then((res) => {
        console.log(res);
        const formatted_data = res.data
          .sort(
            (a: [string, number], b: [string, number]) =>
              new Date(a[0]).getTime() - new Date(b[0]).getTime()
          )
          .map((entry: [string, number]) => ({
            time_logged: format(new Date(entry[0]), "yyyy-MM-dd HH:mm:ss"),
            temp_data: entry[1],
          }));

        console.log(formatted_data);
        setData(formatted_data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [patient_id]);

  const temp_datas = data.map(
    (entry: { time_logged: Date; temp_data: number }) => entry.temp_data
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
            <XAxis dataKey="time_logged" />
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
