import React, { useState, useEffect } from "react";
import "../App.css";

function SensorStatus() {
  const [sensorStatus, setSensorStatus] = useState("offline");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLastReading() {
      try {
        const res = await fetch("https://plantapp-q6a5.onrender.com/latest");
        const data = await res.json();

        const now = new Date();
        const timestampDate = new Date(data.timestamp);
        const diffInMs = now - timestampDate;
        const timeDiffInMinutes = diffInMs / (1000 * 60);

        if (timeDiffInMinutes > 120) {
          setSensorStatus("offline");
        } else {
          setSensorStatus("online");
        }
      } catch (err) {
        console.error("Error fetching last reading:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLastReading();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="status-container">
      <span className={`status-dot ${sensorStatus}`} />
      <p>{sensorStatus}</p>
    </div>
  );
}

export default SensorStatus;
