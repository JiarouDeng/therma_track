import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  patient_id: string;
}

function PatientStatsComp({ patient_id }: Props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.1.11:4000/temperature/${patient_id}`)
      .then((res) => {
        const formatted_data = res.data.map(
          (entry: { timestamp: Date; temp_data: number }) => ({
            timestamp: entry.timestamp,
            // format(new Date(entry.timestamp), "yyyy-MM-dd HH:mm:ss"),
            temp_data: entry.temp_data,
          })
        );
        console.log(formatted_data);
        setData(formatted_data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [patient_id]);

  const chartData = {
    labels: data.map(
      (item: { timestamp: Date; temp_data: string }) => item.timestamp
    ),
    datasets: [
      {
        data: data.map((item: { timestamp: Date; temp_data: string }) =>
          Number(item.temp_data)
        ),
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 115, 0, ${opacity})`, // line color
      },
    ],
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        {data.length === 0
          ? "No data stored currently. Waiting for more data"
          : "Patient Temperature Over Time"}
      </Text>
      {data.length > 0 && (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 40} // chart width
          height={300}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#f7f7f7",
            backgroundGradientTo: "#fff",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#ff7300",
            },
          }}
          bezier
        />
      )}
    </View>
  );
}

export default PatientStatsComp;
