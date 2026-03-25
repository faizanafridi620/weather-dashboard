import { useEffect, useMemo, useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import getLocation from "../utils/getLocation";
import WeatherChart from "../components/WeatherChart";
import ToggleGraph from "../components/ToggleGraph";

function History() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [data, setData] = useState(null);
  const [chartType, setChartType] = useState("line");
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    const { lat, lon } = await getLocation();
    const res = await axios.get(
      "https://archive-api.open-meteo.com/v1/archive",
      {
        params: {
          latitude: lat,
          longitude: lon,
          start_date: start.toISOString().split("T")[0],
          end_date: end.toISOString().split("T")[0],
          daily:
            "apparent_temperature_mean,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant",
          timezone: "auto",
        },
      },
    );
    setData(res.data);

    setLoading(false);

    localStorage.setItem(
      "historyData",
      JSON.stringify({
        data: res.data,
        start,
        end,
      }),
    );
  };

  useEffect(() => {
    const cached = localStorage.getItem("historyData");
    if (cached) {
      const parsed = JSON.parse(cached);
      setData(parsed.data);
    }
  }, []);

  const dataTempMean = useMemo(() => {
    if (!data) return [];
    return data.daily.apparent_temperature_mean.map((t, i) => ({
      time: new Date(t).getTime() + ":00",
      value: data.daily.apparent_temperature_mean[i],
    }));
  }, [data]);

  const dataTempMax = useMemo(() => {
    if (!data) return [];
    return data.daily.apparent_temperature_max.map((t, i) => ({
      time: new Date(t).getTime() + ":00",
      value: data.daily.apparent_temperature_max[i],
    }));
  }, [data]);

  const dataTempMin = useMemo(() => {
    if (!data) return [];
    return data.daily.apparent_temperature_min.map((t, i) => ({
      time: new Date(t).getTime() + ":00",
      value: data.daily.apparent_temperature_min[i],
    }));
  }, [data]);

  const dataSunrise = useMemo(() => {
    if (!data) return [];
    return data.daily.sunrise.map((t) => ({
      time: new Date(t).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: new Date(t).getHours() + new Date(t).getMinutes() / 60,
    }));
  }, [data]);

  const dataSunset = useMemo(() => {
    if (!data) return [];
    return data.daily.sunset.map((t) => ({
      time: new Date(t).toLocaleTimeString(),
      value: new Date(t).getHours() + new Date(t).getMinutes() / 60,
    }));
  }, [data]);

  const dataPrecipitation = useMemo(() => {
    if (!data) return [];
    return data.daily.precipitation_sum.map((t, i) => ({
      time: new Date(t).getTime() + ":00",
      value: data.daily.precipitation_sum[i],
    }));
  }, [data]);

  const dataMaxwindSpeed = useMemo(() => {
    if (!data) return [];
    return data.daily.wind_speed_10m_max.map((t, i) => ({
      time: new Date(t).getTime() + ":00",
      value: data.daily.wind_speed_10m_max[i],
    }));
  }, [data]);

  const dataDominantWindDirection = useMemo(() => {
    if (!data) return [];
    return data.daily.wind_direction_10m_dominant.map((t, i) => ({
      time: new Date(t).getTime() + ":00",
      value: data.daily.wind_direction_10m_dominant[i],
    }));
  }, [data]);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-5xl text-center font-bold">Historical Charts</h1>
      <div className="flex gap-4 md:p-4 space-y-3 max-w-2xl mx-auto flex-col md:flex-row items-center justify-center">
        <Datepicker
          className="cursor-pointer hover:bg-gray-300 rounded-sm"
          selected={start}
          onChange={setStart}
        />
        <Datepicker
          className="cursor-pointer hover:bg-gray-300 rounded-sm"
          selected={end}
          onChange={setEnd}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded cursor-pointer hover:bg-blue-500"
          onClick={fetchHistory}
        >
          Fetch History
        </button>
      </div>
      {loading && (
        <div className="p-6 animate-pulse">Loading History Data...</div>
      )}
      {data && (
        <div className="space-y-2">
          <ToggleGraph chart={chartType} setChart={setChartType} />
          <WeatherChart
            title="Mean Temperature"
            chartType={chartType}
            data={dataTempMean}
          />
          <WeatherChart
            title="Max Temperature"
            chartType={chartType}
            data={dataTempMax}
          />
          <WeatherChart
            title="Min Temperature"
            chartType={chartType}
            data={dataTempMin}
          />
          <WeatherChart
            title="Sunrise"
            chartType={chartType}
            data={dataSunrise}
          />
          <WeatherChart
            title="Sunset"
            chartType={chartType}
            data={dataSunset}
          />
          <WeatherChart
            title="Precipitation"
            chartType={chartType}
            data={dataPrecipitation}
          />
          <WeatherChart
            title="Max Wind Speed"
            chartType={chartType}
            data={dataMaxwindSpeed}
          />
          <WeatherChart
            title="Dominant Wind Direction"
            chartType={chartType}
            data={dataDominantWindDirection}
          />
        </div>
      )}
    </div>
  );
}

export default History;
