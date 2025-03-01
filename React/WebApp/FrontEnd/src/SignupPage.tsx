// import { useState } from "react";
import LoginComp from "./LoginComp";
import { useNavigate } from "react-router-dom";
import utilsFuncs from "./utils";
import axios from "axios";


function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = async (username: string, password: string) => {
    try {
      // 调用 Flask 后端的注册 API
      const response = await axios.post("http://127.0.0.1:5000/api/signup", {
        username,
        password,
      });

      // 根据响应结果导航到不同页面
      if (response.data.message === "User created successfully!") {
        if (username === "doctor") {
          navigate("/doctor");
        } else {
          navigate("/patient");
        }
      } else {
        alert("Signup failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
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
        buttonText="Signup"
        onLoginSubmit={handleSignup}
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
          navigate("/");
        }}
      >
        Already have an account?
      </p>
    </div>
  );
}

export default SignupPage;
