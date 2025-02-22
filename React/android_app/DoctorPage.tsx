import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import LoginComp from "./LoginComp";
import utilsFuncs from "./utils";
import PopupComp from "./PopupComp";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";

const patients = [
  { id: 1, name: "Alice Johnson", age: 30, condition: "Flu" },
  { id: 2, name: "Bob Smith", age: 45, condition: "Diabetes" },
  { id: 3, name: "Charlie Brown", age: 60, condition: "Hypertension" },
];

function DoctorPage() {
  const [connectPatient, setConnectPatient] = useState(false);
  const [checkPatient, setCheckPatient] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => {
            setCheckPatient(false);
            setConnectPatient(true);
          }}
          title="Connect Patient"
          color="gray"
        />
        <CustomButton
          onPress={() => {
            setCheckPatient(true);
            setConnectPatient(false);
          }}
          title="Check Patient"
          color="gray"
        />
      </View>

      {connectPatient && (
        <PopupComp onClose={() => setConnectPatient(false)}>
          <LoginComp
            nameClass="patient id"
            auxClass="DOB"
            buttonText="Connect"
            onLoginSubmit={() => {}}
            onAuxChecker={utilsFuncs.parseDateofBirth}
          />
        </PopupComp>
      )}

      {checkPatient && (
        <PopupComp onClose={() => setCheckPatient(false)}>
          <FlatList
            data={patients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.patientItem}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.patientName}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </PopupComp>
      )}

      <CustomButton
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        }
        title="Log out"
        color="red"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5", // Light gray background for a soft look
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20, // Add spacing between buttons
  },
  popupContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3, // Shadow for Android
  },
  flatListContainer: {
    marginTop: 16,
  },
  patientItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default DoctorPage;
