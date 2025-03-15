import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import utilsFuncs from "./utils";
import PopupComp from "./PopupComp";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import axios from "axios";
import { API_BASE_URL } from "./config_constants";

function DoctorPage() {
  const route = useRoute();
  const { id, status } = route.params as { id: string; status: string };

  const [connectPatient, setConnectPatient] = useState(false);
  const [checkPatient, setCheckPatient] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const updatePatientList = () => {
    axios
      .get(`${API_BASE_URL}/doctor/check_patient/${id}`)
      .then((res) => {
        setPatients(res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    updatePatientList();
  }, []);

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
            setMessage("");
            setError("");
          }}
          title="Check Patient"
          color="gray"
        />
      </View>

      {connectPatient && (
        <PopupComp onClose={() => setConnectPatient(false)}>
          <View style={styles.inputOuterContainer}>
            <View style={styles.inputContainer}>
              <Text>patient id: </Text>
              <TextInput
                style={styles.input}
                value={patientId}
                onChangeText={setPatientId}
              />
            </View>
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            {message && <Text style={{ color: "green" }}>{message}</Text>}
            <CustomButton
              title="Connect"
              onPress={async () => {
                const [result, errorMsg] = await utilsFuncs.parseConnectPatient(
                  id ? id : "",
                  patientId
                );
                if (!result) setError(errorMsg);
                else {
                  setMessage(`successfully connected to patient ${patientId}`);
                  updatePatientList();
                }
              }}
              color="green"
            />
          </View>
        </PopupComp>
      )}

      {checkPatient && (
        <PopupComp onClose={() => setCheckPatient(false)}>
          <FlatList
            data={patients}
            keyExtractor={(item: { patient_id: string; username: string }) =>
              item.patient_id
            }
            renderItem={({ item }) => (
              //<View >
              <TouchableOpacity
                style={styles.patientItem}
                onPress={() => {
                  console.log(item.patient_id);
                  console.log(id);
                  navigation.navigate("Patient", {
                    id: item.patient_id,
                    status: id,
                  });
                }}
              >
                <Text style={styles.patientName}>{item.username}</Text>
              </TouchableOpacity>
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
  inputOuterContainer: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 200,
  },
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
