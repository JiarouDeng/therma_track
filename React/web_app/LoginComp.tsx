import { useState } from "react";

interface props {
  nameClass: string;
  auxClass: string;
  buttonText: string;
  onLoginSubmit: (username: string, password: string) => void;
  onAuxChecker: (aux: string) => [boolean, string];
}

function LoginComp({
  nameClass,
  auxClass,
  buttonText,
  onLoginSubmit,
  onAuxChecker,
}: props) {
  const [name, setName] = useState("");
  const [aux, setAux] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <div className="spaced">
        <label>{nameClass}: </label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="spaced">
        <label>{auxClass}: </label>
        <input
          type={auxClass === "password" ? "password" : ""}
          value={aux}
          onChange={(e) => {
            setAux(e.target.value);
          }}
        />
      </div>
      {error && (
        <p
          className="spaced"
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}
      <button
        className="spaced"
        onClick={() => {
          if (!name || !aux) {
            setError("Incomplete information");
            return;
          }
          const [result, errorMsg] = onAuxChecker(aux);
          setError(errorMsg);
          if (result) onLoginSubmit(name, aux);
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default LoginComp;
