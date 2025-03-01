import PatientStatsComp from "./PatientStatsComp";
import { useParams, useNavigate } from "react-router-dom";

function PatientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      className="fixed-center"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <PatientStatsComp />
      {id === "0" ? (
        <button className="spaced" onClick={() => navigate("/")}>
          Log out
        </button>
      ) : (
        <button className="spaced" onClick={() => navigate("/doctor")}>
          Return
        </button>
      )}
    </div>
  );
}

export default PatientPage;
