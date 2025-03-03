import { View } from "react-native";
import CustomButton from "./CustomButton";
import PatientStatsComp from "./PatientStatsComp";
import { useNavigation, useRoute } from "@react-navigation/native";

function PatientPage() {
  const route = useRoute();
  const { id, status } = route.params as { id: string; status: string };
  const navigation = useNavigation();
  return (
    <View style={{ padding: 20 }}>
      <PatientStatsComp patient_id={id} />
      {status === "p" ? (
        <CustomButton
          title="Log out"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          }
          color="green"
        />
      ) : (
        <CustomButton
          title="Return"
          onPress={() =>
            navigation.navigate("Doctor", { id: status, status: "p" })
          }
          color="green"
        />
      )}
    </View>
  );
}

export default PatientPage;
