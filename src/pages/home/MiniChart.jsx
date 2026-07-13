import { useMemo } from "react";
import { Line } from "react-chartjs-2";

export default function MiniChart({ currentPrice, percentChange24h }) {
  const chartData = useMemo(() => {
    // Fallback if no change
    const pct = percentChange24h ?? 0;
    const pastPrice = currentPrice / (1 + pct / 100);
    const isUp = currentPrice >= pastPrice;

    const borderColor = isUp ? "rgb(54,205,150)" : "rgb(255,99,132)";
    const backgroundColor = isUp
      ? "rgba(54,205,150,0.1)"
      : "rgba(255,99,132,0.1)";

    return {
      labels: ["24h ago", "Now"],
      datasets: [
        {
          data: [pastPrice, currentPrice],
          borderColor,
          backgroundColor,
          fill: true,
          pointRadius: 0,
          borderWidth: 1.5,
          tension: 0.4,
        },
      ],
    };
  }, [currentPrice, percentChange24h]);

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
    <div className="w-4/5 h-10">
      <Line data={chartData} options={options} />
    </div>
  );
}
