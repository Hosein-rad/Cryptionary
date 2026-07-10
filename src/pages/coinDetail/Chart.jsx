import { Line } from "react-chartjs-2";

const dummyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Price (USD)",
      data: [30000, 32000, 31000, 40000, 45000, 42000],
      borderColor: "rgb(54, 205, 150)",
      backgroundColor: "rgba(54, 205, 150, 0.1)",
      fill: true,
      tension: 0.3,
    },
    {
      label: "Price (IRR)",
      data: [40000, 35000, 30000, 10000, 35000, 48000],
      borderColor: "rgb(200, 100, 150)",
      backgroundColor: "rgba(200, 100, 150, 0.1)",
      fill: true,
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: true, position: "top" },
  },
};

function SimpleLineChart() {
  return <Line data={dummyData} options={options} />;
}

export default SimpleLineChart;
