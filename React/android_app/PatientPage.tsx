import { View } from "react-native";
import CustomButton from "./CustomButton";
import PatientStatsComp from "./PatientStatsComp";
import { useNavigation } from "@react-navigation/native";

function PatientPage() {
  const navigation = useNavigation();
  return (
    <View style={{ padding: 20 }}>
      <PatientStatsComp />
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
    </View>
  );
}

export default PatientPage;
