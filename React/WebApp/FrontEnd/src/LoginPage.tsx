import LoginComp from "./LoginComp";
import { useNavigate } from "react-router-dom";
import utilsFuncs from "./utils";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      // 调用 Flask 后端的登录 API
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        username,
        password,
      });

      // 根据响应结果导航到不同页面
      if (response.data.message === "Login successful!") {
        if (response.data.user_type === "doctor") {
          navigate("/doctor");
        } else {
          navigate("/patient");
        }
      } else {
        alert("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="fixed-center"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <LoginComp
        nameClass="username"
        auxClass="password"
        buttonText="Login"
        onLoginSubmit={handleLogin}
        onAuxChecker={utilsFuncs.parseUserNameAndPassword}
      />
      <p
        className="spaced"
        style={{
          textDecoration: "underline",
          textDecorationColor: "blue",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/signup");
        }}
      >
        Don't have an account? Sign up here!
      </p>
    </div>
  );
}

export default LoginPage;
