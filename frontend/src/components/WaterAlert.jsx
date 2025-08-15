import React, { useState, useEffect } from "react";
import "../App.css";

function WaterAlert() {
  const [alertLevel, setAlertLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("https://plantapp-q6a5.onrender.com/status");
        const status = await res.json();
        setAlertLevel(status);
      } catch (err) {
        console.error("Error fetching status:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  if (loading) return <p>Loading...</p>;

  const statusMessages = {
    "needs watering": "Your plant is thirsty! Time to water it.",
    "water soon": "Moisture is dropping. Consider watering soon.",
    "ok": "All good! Your plant is well watered."
  };
  

  return (
    <div className="alert-card">
      <h3>💧Water Status💧</h3>
      <p className="status-message">
        {statusMessages[alertLevel.status]}
      </p>
      <p className="timestamp">
        Last updated: {new Date(alertLevel.timestamp).toLocaleString()}
      </p>
    </div>
  );
  
}
export default WaterAlert;
