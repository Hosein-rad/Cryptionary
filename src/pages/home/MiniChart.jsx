// components/MiniChart.jsx
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

const CHART_HEIGHT = 30;
const CHART_WIDTH = "80%";

export default function MiniChart({ currentPrice, percentChanges }) {
  const chartData = useMemo(() => {
    // Intervals from oldest (24h ago) to most recent (15m ago)
    const intervals = [
      { pct: percentChanges?.percent_change_24h ?? 0 },
      { pct: percentChanges?.percent_change_12h ?? 0 },
      { pct: percentChanges?.percent_change_6h ?? 0 },
      { pct: percentChanges?.percent_change_1h ?? 0 },
      { pct: percentChanges?.percent_change_30m ?? 0 },
      { pct: percentChanges?.percent_change_15m ?? 0 },
    ];

    // Reconstruct approximate prices at each past time
    const pastPrices = intervals.map(
      ({ pct }) => currentPrice / (1 + pct / 100)
    );
    // Data points: 24h ago … 15m ago, and current price
    const dataPoints = [...pastPrices, currentPrice];

    // Determine trend from 24h ago to now
    const isUp = currentPrice >= pastPrices[0];
    const borderColor = isUp ? "rgb(54,205,150)" : "rgb(255,99,132)";
    const backgroundColor = isUp
      ? "rgba(54,205,150,0.1)"
      : "rgba(255,99,132,0.1)";

    return {
      labels: Array(dataPoints.length).fill(""),
      datasets: [
        {
          data: dataPoints,
          borderColor,
          backgroundColor,
          fill: true,
          pointRadius: 0,
          borderWidth: 1.5,
          tension: 0.4,
        },
      ],
    };
  }, [currentPrice, percentChanges]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
