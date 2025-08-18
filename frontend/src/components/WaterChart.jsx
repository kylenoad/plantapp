import { useRef, useEffect, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

import { convertToPercent } from "../utils/convertToPercent";
import { getMonthlyAverages } from "../utils/getMonthlyAverages";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

function WaterChart() {
  const [period, setPeriod] = useState("week");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchReadingsRange() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://plantapp-q6a5.onrender.com/readings?period=${period}`
        );
        const fetchedData = await res.json();

        setData(fetchedData);
      } catch (err) {
        console.error("Error fetching status:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReadingsRange();
  }, [period]);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    let chartData;
    if (period === "year") {
      chartData = getMonthlyAverages(data);
    } else {
      chartData = data;
    }

    const ctx = canvasRef.current.getContext("2d");

    chartData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.map((d) => {
          const date = new Date(d.timestamp);

          if (period === "day") {
            const hour = date.getHours().toString().padStart(2, "0");
            return `${hour}:00`;
          } else if (period === "year") {
            return date.toLocaleDateString("en-GB", { month: "short" });
          } else {
            return date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            });
          }
        }),

        datasets: [
          {
            label: "Moisture Level (%)",
            data: chartData.map((d) => convertToPercent(d.moisture_level)),
            borderColor: "rgba(243, 44, 18, 0.8)",
            tension: 0.5,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Moisture Levels (${period})`,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [data, period]);

  return (
    <div>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <div>
          <canvas ref={canvasRef}></canvas>
        </div>
      )}

      <div className="period-buttons">
        <button onClick={() => setPeriod("day")}>Day</button>
        <button onClick={() => setPeriod("week")}>Week</button>
        <button onClick={() => setPeriod("month")}>Month</button>
        <button onClick={() => setPeriod("year")}>Year</button>
      </div>
    </div>
  );
}

export default WaterChart;
