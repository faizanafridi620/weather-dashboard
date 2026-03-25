import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
  BarChart,
  Bar,
} from "recharts";

function WeatherChart({ title, data, chartType = "line" }) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg">
      <h2 className="mb-3 font-semibold text-lg text-gray-700">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {chartType === "line" ? (
          <LineChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <Brush dataKey="time" height={20} />
            <Line type="monotone" dataKey="pm10" stroke="#ff7300" />
            <Line type="monotone" dataKey="pm2_5" stroke="#387908" />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ff7300" />
            <Brush dataKey="time" height={20} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherChart;
