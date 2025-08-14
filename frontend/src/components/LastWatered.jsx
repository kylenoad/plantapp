import React, { useState, useEffect } from "react";

function LastWatered() {
  const [lastWatered, setLastWatered] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReadings() {
      try {
        const res = await fetch(
          "https://plantapp-q6a5.onrender.com/readings?period=month"
        );
        const readings = await res.json();

        if (readings.length > 1) {
          let found = null;
          for (let i = 1; i < readings.length; i++) {
            const prev = readings[i - 1].moisture_level;
            const curr = readings[i].moisture_level;

            if (prev - curr > 100) {
              found = readings[i].timestamp;
              break;
            }
          }

          setLastWatered(found);
        }
      } catch (err) {
        console.error("Error fetching readings:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReadings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!lastWatered) return <p>Last watered: unknown</p>;

  const date = new Date(lastWatered);

  return (
    <div>
      <h2 style={{ fontSize: "1rem" }}>Last Watered</h2>
      <p>{date.toLocaleString()}</p>
    </div>
  );
}

export default LastWatered;
