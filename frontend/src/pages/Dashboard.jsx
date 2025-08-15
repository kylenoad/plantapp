import React from "react";
import LastWatered from "../components/LastWatered";
import CurrentMoisture from "../components/CurrentMoisture";
import WaterChart from "../components/WaterChart";
import WaterAlert from "../components/WaterAlert";
import "../App.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="tile">
        <WaterAlert />
      </div>
      <div className="tile">
        <LastWatered />
      </div>
      <div className="tile">
        <CurrentMoisture />
      </div>
      <div className="tile">
        <WaterChart />
      </div>
    </div>
  );
}

export default Dashboard;
