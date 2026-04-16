import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js"
import zoomPlugin from "chartjs-plugin-zoom"
import {Line, Bar} from "react-chartjs-2"
import { useRef } from "react";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  zoomPlugin
)

function WeatherChart({ title, data, chartType = "line" }) {
  const chartRef = useRef();
  const isMultiLine = data && data[0]?.pm10 !== undefined;

  const chartData = {
    labels: data.map((d) => d.time),
    datasets: isMultiLine ? [
      {
        label: "PM10",
        data: data.map((d) => d.pm10),
        borderWidth: 2,
        borderColor: "#ff7300",
      },
      {
        label: "PM2.5",
        data: data.map((d) => d.pm2_5),
        borderWidth: 2,
        borderColor: "#387908",
      }
    ] : [
      {
        label: title,
        data: data.map((d) => d.value),
        borderWidth: 2,
        borderColor: "#8884d8",
        backgroundColor: "#6366f1"
      }
    ]
  }

  const options ={
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x"
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
        }
      }
    }
  }
  return (
    <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg">
      <h2 className="mb-3 font-semibold text-lg text-gray-700">{title}</h2>
      <button 
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
      onClick={() => chartRef.current.resetZoom()}
      >
        Reset
      </button>
        {chartType === "line" ? (

          <Line ref={chartRef} data={chartData} options={options} />
        ) : (

          <Bar ref={chartRef} data={chartData} options={options} />
        )}
    </div>
  );
}

export default WeatherChart;
