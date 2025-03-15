import axios from "axios";
import { API_BASE_URL } from "./config_constants";

const handleLogin = async (
  username: string,
  password: string
): Promise<[boolean, string]> => {
  if (username === "" || password === "") {
    return [false, "Please enter a username and password"];
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    if (response.data.message === null) {
      return [
        true,
        (response.data.user_type === 1 ? "doctor/" : "patient/p/") +
          response.data.id,
      ];
    } else return [false, "Login failed: " + response.data.message];
  } catch (error) {
    alert("Login failed. Please try again.");
    return [false, "Log in failed. Error message: " + error];
  }
};

const parseConnectPatient = async (
  doctor_id: string,
  patient_id: string
): Promise<[boolean, string]> => {
  const response = await axios.post(`${API_BASE_URL}/doctor/connect_patient`, {
    doctor_id,
    patient_id,
  });
  return response.data.message === null
    ? [true, ""]
    : [false, response.data.message];
};

export default { handleLogin, parseConnectPatient };
