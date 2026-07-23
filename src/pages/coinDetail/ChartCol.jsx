import { Chart as ChartComponent } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 2,
});
const formatter2 = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 5,
});

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
    ctx.strokeStyle = "rgb(255,150,150)";
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
  plugins: {
    legend: {
      display: true,
      labels: {
        boxWidth: 0,
        boxHeight: 0,
        padding: 10,
        color: "white",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
  },
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
      title: { display: false },
      grid: { drawOnChartArea: false },
      ticks: { color: "white", callback: (value) => formatter2.format(value) },
    },
  },
};

const options2 = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  plugins: {
    legend: {
      display: true,
      labels: {
        boxWidth: 0,
        boxHeight: 0,
        padding: 10,
        color: "white",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
  },
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
      title: { display: false },
      grid: { drawOnChartArea: true },
      ticks: { color: "white", callback: (value) => formatter.format(value) },
    },
  },
};

const options3 = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: "index", intersect: false },
  plugins: {
    legend: {
      display: true,
      labels: {
        boxWidth: 0,
        boxHeight: 0,
        padding: 10,
        color: "white",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
    plotBackground: {
      beforeDraw(chart) {
        const { ctx, chartArea } = chart;
        ctx.save();
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.fillRect(
          chartArea.left,
          chartArea.top,
          chartArea.width,
          chartArea.height
        );
        ctx.restore();
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: { unit: "hour" },
      offset: false,
      ticks: { color: "white" },
    },
    yVolume: {
      type: "linear",
      display: true,
      position: "left",
      title: { display: false },
      grid: { drawOnChartArea: true },
      ticks: { color: "white", callback: (value) => formatter.format(value) },
    },
  },
};

// ------------------- MULTI CHART COMPONENT ------------------- //
function ChartCol({ chartData }) {
  const priceData = chartData.prices.map(([t, v]) => ({ x: t, y: v }));
  const marketCapData = chartData.market_caps.map(([t, v]) => ({
    x: t,
    y: v,
  }));
  const volumeData = chartData.total_volumes.map(([t, v]) => ({ x: t, y: v }));

  const dataset1 = [
    {
      label: "Price (USD)",
      data: priceData,
      borderColor: "rgb(50, 0, 255)",
      borderWidth: 2,
      backgroundColor: "rgba(255, 100, 100, 0.5)",
      yAxisID: "yPrice",
      pointRadius: 0,
      spanGaps: false,
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

  const dataset3 = [
    {
      label: "Volume (24h)",
      data: volumeData,
      type: "bar",
      backgroundColor: "white",
      borderColor: "white",
      yAxisID: "yVolume",
      spanGaps: true,
      barPercentage: 1,
    },
  ];

  return (
    <div className="w-full mt-10">
      {/* Fixed height container is crucial for the crosshair to be visible */}
      <div className="h-100 w-full cursor-crosshair backdrop-brightness-75 hover:backdrop-brightness-25 p-2 rounded-2xl duration-300">
        <ChartComponent
          type="line"
          data={{ datasets: dataset1 }}
          options={options1}
          plugins={[customCrosshair]}
        />
      </div>
      <div className="h-100 w-full mt-5 cursor-crosshair backdrop-brightness-75 hover:backdrop-brightness-25 p-2 rounded-2xl duration-300">
        <ChartComponent
          type="line"
          data={{ datasets: dataset2 }}
          options={options2}
          plugins={[customCrosshair]}
        />
      </div>
      <div className="h-100 w-full mt-5 cursor-crosshair backdrop-brightness-75 hover:backdrop-brightness-25 p-2 rounded-2xl duration-300">
        <ChartComponent
          type="line"
          data={{ datasets: dataset3 }}
          options={options3}
          plugins={[customCrosshair]}
        />
      </div>
    </div>
  );
}

export default ChartCol;
