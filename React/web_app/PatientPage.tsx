import PatientStatsComp from "./PatientStatsComp";

function PatientPage() {
  return (
    <div
      className="fixed-center"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <PatientStatsComp />
    </div>
  );
}

export default PatientPage;
