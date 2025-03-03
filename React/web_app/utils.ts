import axios from "axios";

const handleLogin = async (
  username: string,
  password: string
): Promise<[boolean, string]> => {
  let response;
  try {
    if (username === "doctor")
      response = await axios.post("http://127.0.0.1:4000/login/doctor", {
        username,
        password,
      });
    else
      response = await axios.post("http://127.0.0.1:4000/login/patient", {
        username,
        password,
      });

    // 根据响应结果导航到不同页面
    if (response.data.message === null) {
      return [
        true,
        (username === "doctor" ? "doctor/" : "patient/p/") + response.data.id,
      ];
    } else return [false, "Login failed: " + response.data.message];
  } catch (error) {
    alert("Login failed. Please try again.");
    return [false, "Log in failed. Error message: " + error];
  }
};

const handleSignup = async (
  username: string,
  password: string
): Promise<[boolean, string]> => {
  let response;
  try {
    if (username === "doctor")
      response = await axios.post("http://127.0.0.1:4000/signup/doctor", {
        username,
        password,
      });
    else
      response = await axios.post("http://127.0.0.1:4000/signup/patient", {
        username,
        password,
      });
    if (response.data.message === null) {
      return [
        true,
        (username === "doctor" ? "doctor/" : "patient/p/") + response.data.id,
      ];
    } else return [false, "Signup failed: " + response.data.message];
  } catch (error) {
    alert("Signup failed. Please try again.");
    return [false, "Signup failed. Error message: " + error];
  }
};

const parseConnectPatient = async (
  doctor_id: string,
  patient_id: string
): Promise<[boolean, string]> => {
  // Check for valid month, day, year

  const response = await axios.post(
    "http://localhost:4000/doctor/connect_patient/",
    { doctor_id, patient_id }
  );
  return response.data.message === null
    ? [true, ""]
    : [false, response.data.message];
};

export default { handleLogin, handleSignup, parseConnectPatient };
