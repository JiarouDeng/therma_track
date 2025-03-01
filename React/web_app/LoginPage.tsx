import LoginComp from "./LoginComp";
import { useNavigate } from "react-router-dom";
import utilsFuncs from "./utils";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div
      className="fixed-center"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <LoginComp
        nameClass="username"
        auxClass="password"
        buttonText="Login"
        onLoginSubmit={(identifier) => {
          if (identifier === "d") navigate("/doctor");
          else if (identifier === "p") navigate(`/patient/0`);
        }}
        onAuxChecker={utilsFuncs.handleLogin}
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
