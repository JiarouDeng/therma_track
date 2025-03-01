import { useState } from "react";
import LoginComp from "./LoginComp";
import utilsFuncs from "./utils";
import PopupComp from "./PopupComp";
import { useNavigate } from "react-router-dom";

const patients = [
  { id: 1, name: "Alice Johnson", age: 30, condition: "Flu" },
  { id: 2, name: "Bob Smith", age: 45, condition: "Diabetes" },
  { id: 3, name: "Charlie Brown", age: 60, condition: "Hypertension" },
];

function DoctorPage() {
  const [connectPatient, setConnectPatient] = useState(false);
  const [checkPatient, setCheckPatient] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="fixed-center"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div>
        <button
          className="spaced"
          onClick={() => {
            setCheckPatient(false);
            setConnectPatient(true);
          }}
        >
          Connect Patient
        </button>
        <button
          className="spaced"
          onClick={() => {
            setConnectPatient(false);
            setCheckPatient(true);
          }}
        >
          Check Patient
        </button>
      </div>
      {connectPatient && (
        <PopupComp
          onClose={() => setConnectPatient(false)}
          children={
            <LoginComp
              nameClass="patient id"
              auxClass="DOB"
              buttonText="Connect"
              onLoginSubmit={() => {}}
              onAuxChecker={utilsFuncs.parseDateofBirth}
            />
          }
        />
      )}
      {checkPatient && (
        <PopupComp
          onClose={() => setCheckPatient(false)}
          children={
            <ul className="space-y-2">
              {patients.map((patient) => (
                <li
                  key={patient.id}
                  className="p-3 border rounded-lg bg-gray-100"
                >
                  <button className="font-semibold">{patient.name}</button>
                </li>
              ))}
            </ul>
          }
        />
      )}
      <button className="spaced" onClick={() => navigate("/")}>
        Log out
      </button>
    </div>
  );
}

export default DoctorPage;
