import React, { useState, useEffect, useRef } from "react";
import { convertToPercent } from "../utils/convertToPercent";
import { Chart, DoughnutController, ArcElement, Title } from "chart.js";

Chart.register(DoughnutController, ArcElement, Title);

function CurrentMoisture() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("https://plantapp-q6a5.onrender.com/latest");
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error("Error fetching status:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    const moisturePercent = convertToPercent(data.moisture_level);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const centerTextPlugin = {
      id: "centerText",
      afterDraw(chart) {
        const { ctx, chartArea } = chart;
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${moisturePercent.toFixed(0)}%`, centerX, centerY);
        ctx.restore();
      },
    };

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [moisturePercent, 100 - moisturePercent],
            backgroundColor: ["#f32c12cc", "#E0E0E0"],
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "50%",
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Moisture (%)",
            font: { size: 18, weight: "bold" },
            color: "#333",
          },
        },
      },
      plugins: [centerTextPlugin],
    });
  }, [data]);

  if (loading) return <p>Loading current moisture...</p>;
  if (!data) return <p>Error loading moisture data</p>;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "20px",
        margin: "auto",
      }}
    >
      <div style={{ width: "200px", height: "200px" }}>
        <canvas ref={canvasRef}></canvas>
      </div>

      <div style={{ textAlign: "left" }}>
        <div style={{ marginBottom: "4px" }}>Too Dry (81-100%)</div>
        <div style={{ marginBottom: "4px" }}>Drying Out (61-80%)</div>
        <div style={{ marginBottom: "4px" }}>Optimal (41-60%)</div>
        <div style={{ marginBottom: "4px" }}>Too Wet (0-40%)</div>
      </div>
    </div>
  );
}

export default CurrentMoisture;
