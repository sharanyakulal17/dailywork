import { useState } from "react";
import Jobs from "../components/Jobs";

function Dashboard() {
  const [view, setView] = useState("options"); // options / add / available

  if (view === "add") return <Jobs view="add" goBack={() => setView("options")} />;
  if (view === "available") return <Jobs view="available" goBack={() => setView("options")} />;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Dashboard</h2>
      <button onClick={() => setView("add")} style={{ margin: "10px", padding: "10px 20px" }}>Add Job</button>
      <button onClick={() => setView("available")} style={{ margin: "10px", padding: "10px 20px" }}>Available Jobs</button>
    </div>
  );
}

export default Dashboard;