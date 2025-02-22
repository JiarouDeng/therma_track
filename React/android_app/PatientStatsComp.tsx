import React from "react";
import { View, Text, Button, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";

const data = [
  { time: "08:00", temperature: 98.6 },
  { time: "10:00", temperature: 99.1 },
  { time: "12:00", temperature: 99.5 },
  { time: "14:00", temperature: 100.2 },
  { time: "16:00", temperature: 101.0 },
];

function PatientStatsComp() {
  const navigation = useNavigation();

  const chartData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        data: data.map((item) => item.temperature),
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 115, 0, ${opacity})`, // line color
      },
    ],
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Patient Temperature Over Time
      </Text>
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
      <Button
        title="Log out"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        }
      />
    </View>
  );
}

export default PatientStatsComp;
