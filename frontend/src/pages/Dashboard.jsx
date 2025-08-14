import React from "react";
import LastWatered from "../components/LastWatered";
import "../App.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="tile">
        <LastWatered />
      </div>
    </div>
  );
}

export default Dashboard;
