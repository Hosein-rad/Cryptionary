import { Chart as ChartComponent } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

// ------------------- CUSTOM CROSSHAIR ------------------- //
const customCrosshair = {
  id: "customCrosshair",
  afterDraw(chart) {
    const { ctx, chartArea, tooltip } = chart;
    if (!tooltip?.opacity) return;

    const point = tooltip.dataPoints?.[0]?.element;
    if (!point) return;

    const x = point.x;
    const y = point.y;

    ctx.save();
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = "rgba(255,100,100,0.9)";
    ctx.lineWidth = 1;

    // vertical line
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();

    // horizontal line
    ctx.beginPath();
    ctx.moveTo(chartArea.left, y);
    ctx.lineTo(chartArea.right, y);
    ctx.stroke();

    ctx.restore();
  },
};

// ------------------- CHART OPTIONS ------------------- //
const options1 = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  plugins: [
    {
      legend: {
        position: "top",
        labels: { color: "white", boxWidth: 12 },
      },
    },
  ],
  scales: {
    x: {
      type: "time",
      time: { unit: "hour" },
      offset: false,
      ticks: { color: "white" },
    },
    yPrice: {
      type: "linear",
      display: true,
      position: "left",
      title: { display: true, text: "Price (USD)", color: "white" },
      grid: { drawOnChartArea: false },
      ticks: { color: "white" },
    },
    yVolume: {
      type: "linear",
      display: true,
      position: "right",
      title: { display: true, text: "Volume", color: "white" },
      grid: { drawOnChartArea: true },
      ticks: { color: "white" },
    },
  },
};

const options2 = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  plugins: [
    {
      legend: {
        position: "top",
        labels: { color: "white", boxWidth: 12 },
      },
    },
  ],
  scales: {
    x: {
      type: "time",
      time: { unit: "hour" },
      offset: false,
      ticks: { color: "white" },
    },
    yMarketCap: {
      type: "linear",
      display: true,
      position: "left",
      title: { display: true, text: "Market Cap", color: "white" },
      grid: { drawOnChartArea: true },
      ticks: { color: "white" },
    },
  },
};

// ------------------- MULTI CHART COMPONENT ------------------- //
function MultiChart({ chartData }) {
  const priceData = chartData.prices.map(([t, v]) => ({ x: t, y: v }));
  const marketCapData = chartData.market_caps.map(([t, v]) => ({ x: t, y: v }));
  const volumeData = chartData.total_volumes.map(([t, v]) => ({ x: t, y: v }));

  const dataset1 = [
    {
      label: "Price (USD)",
      data: priceData,
      borderColor: "rgb(255, 255, 255)",
      borderWidth: 2,
      backgroundColor: "rgba(255, 100, 100, 0.5)",
      yAxisID: "yPrice",
      pointRadius: 0,
      spanGaps: false,
    },
    {
      label: "Volume (24h)",
      data: volumeData,
      type: "bar",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      yAxisID: "yVolume",
      spanGaps: true,
      barPercentage: 1,
      hoverBackgroundColor: "rgba(200, 50, 255, 0.5)",
    },
  ];

  const dataset2 = [
    {
      label: "Market Cap",
      data: marketCapData,
      borderColor: "rgb(0, 119, 255)",
      backgroundColor: "rgba(255, 100, 100, 0.5)",
      yAxisID: "yMarketCap",
      pointRadius: 0,
      spanGaps: false,
    },
  ];

  return (
    <div>
      {/* Fixed height container is crucial for the crosshair to be visible */}
      <div style={{ height: "400px", width: "100%" }}>
        <ChartComponent
          type="line"
          data={{ datasets: dataset1 }}
          options={options1}
          plugins={[customCrosshair]}
        />
      </div>
      <div style={{ height: "400px", width: "100%", marginTop: "1rem" }}>
        <ChartComponent
          type="line"
          data={{ datasets: dataset2 }}
          options={options2}
          plugins={[customCrosshair]}
        />
      </div>
    </div>
  );
}

export default MultiChart;
