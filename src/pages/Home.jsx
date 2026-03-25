import { fetchWeather, fetchAQI } from "../services/weatherApi";
import Weathercard from "../components/WeatherCard";
import getLocation from "../utils/getLocation";
import { useEffect, useMemo, useState } from "react";
import WeatherChart from "../components/WeatherChart";
import ToggleTemp from "../components/ToggleTemp";

function Home() {
  const [data, setData] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [tempUnit, setTempUnit] = useState("C");

  const convertTemp = (temp, unit) => {
    return unit === "C" ? temp : (temp * 9) / 5 + 32;
  };

  useEffect(() => {
    const getWeather = async () => {
      try {
        const cached = localStorage.getItem("weatherData");

        if (cached) {
          const parsed = JSON.parse(cached);
          setData(parsed.data);
          setAqi(parsed.aqi);
        }

        const { lat, lon } = await getLocation();

        const [res, resAqi] = await Promise.all([
          fetchWeather(lat, lon),
          fetchAQI(lat, lon),
        ]);
        setData(res);
        setAqi(resAqi);

        localStorage.setItem(
          "weatherData",
          JSON.stringify({
            data: res,
            aqi: resAqi,
          }),
        );
      } catch (error) {
        return <h1>{error.message}</h1>;
      }
    };
    getWeather();
  }, []);

  const dataTemp = useMemo(() => {
    if (!data) return [];
    return data.hourly.time.map((t, i) => ({
      time: new Date(t).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: convertTemp(data.hourly.temperature_2m[i], tempUnit),
    }));
  }, [data, tempUnit]);

  const dataHumidity = useMemo(() => {
    if (!data) return [];

    return data.hourly.time.map((t, i) => ({
      time: new Date(t).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: data.hourly.relative_humidity_2m[i],
    }));
  }, [data]);

  const dataPrecipitation = useMemo(() => {
    if (!data) return [];

    return data.hourly.time.map((t, i) => ({
      time: new Date(t).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: data.hourly.precipitation[i],
    }));
  }, [data]);

  const dataVisibility = useMemo(() => {
    if (!data) return [];

    return data.hourly.time.map((t, i) => ({
      time: new Date(t).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: data.hourly.visibility[i],
    }));
  }, [data]);

  const dataWindSpeed = useMemo(() => {
    if (!data) return [];

    return data.hourly.time.map((t, i) => ({
      time: new Date(t).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: data.hourly.windspeed_10m[i],
    }));
  }, [data]);

  const dataAqi = useMemo(() => {
    if (!data) return [];

    return data.hourly.time.map((t, i) => ({
      time: new Date(t).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      pm10: aqi.hourly.pm10[i],
      pm2_5: aqi.hourly.pm2_5[i],
    }));
  }, [data, aqi]);

  if (!data) return <div className="p-6 animate-pulse">Loading Weather...</div>;

  return (
    <>
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
        <h1 className="text-5xl text-center font-bold">Current Weather</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Weathercard
            title="Current Temperature"
            value={`${data.current_weather.temperature}`}
            unit={`${data.current_weather_units.temperature}`}
          />
          <Weathercard
            title="Minimum Temperature"
            value={`${data.daily.temperature_2m_min[0]}`}
            unit={`${data.daily_units.temperature_2m_min}`}
          />
          <Weathercard
            title="Maximum Temperature"
            value={`${data.daily.temperature_2m_max[0]}`}
            unit={`${data.daily_units.temperature_2m_max}`}
          />
          <Weathercard
            title="Precipitation"
            value={`${data.hourly.precipitation[0]}`}
            unit={`${data.hourly_units.precipitation}`}
          />
          <Weathercard
            title="Relative Humidity"
            value={`${data.hourly.relative_humidity_2m[0]}`}
            unit={`${data.hourly_units.relative_humidity_2m}`}
          />
          <Weathercard
            title="UV Index"
            value={`${data.daily.uv_index_max[0]}`}
            unit={`${data.daily_units.uv_index_max}`}
          />
          <Weathercard
            title="Sunrise"
            value={`${new Date(data.daily.sunrise[0]).getHours()} : ${new Date(data.daily.sunrise[0]).getMinutes()}`}
            unit={`${data.daily_units.sunrise}`}
          />
          <Weathercard
            title="Sunset"
            value={`${new Date(data.daily.sunset[0]).getHours()} : ${new Date(data.daily.sunset[0]).getMinutes()}`}
            unit={`${data.daily_units.sunset}`}
          />
          <Weathercard
            title="Maximum Wind Speed"
            value={`${data.daily.wind_speed_10m_max[0]}`}
            unit={`${data.daily_units.wind_speed_10m_max}`}
          />
          <Weathercard
            title="Precipitation Probability Max"
            value={`${data.daily.precipitation_probability_max[0]}`}
            unit={`${data.daily_units.precipitation_probability_max}`}
          />
        </div>
        {aqi && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Weathercard
              title="PM10"
              value={`${aqi.current.pm10}`}
              unit={`${aqi.current_units.pm10}`}
            />
            <Weathercard
              title="PM2.5"
              value={`${aqi.current.pm2_5}`}
              unit={`${aqi.current_units.pm2_5}`}
            />
            <Weathercard
              title="Carbon Monooxide (CO)"
              value={`${aqi.current.carbon_monoxide}`}
              unit={`${aqi.current_units.carbon_monoxide}`}
            />
            <Weathercard
              title="Carbon Dioxide (CO2)"
              value={`${aqi.hourly.carbon_dioxide[0]}`}
              unit={`${aqi.hourly_units.carbon_dioxide}`}
            />
            <Weathercard
              title="Nitrogen Dioxide (NO2)"
              value={`${aqi.current.nitrogen_dioxide}`}
              unit={`${aqi.current_units.nitrogen_dioxide}`}
            />
            <Weathercard
              title="Sulphur Dioxide (SO2)"
              value={`${aqi.current.sulphur_dioxide}`}
              unit={`${aqi.current_units.sulphur_dioxide}`}
            />
          </div>
        )}
        <div className="space-y-2">
          <h2 className="text-5xl text-center font-bold">Hourly ForeCast</h2>
          <div className="flex justify-between items-center">
            <ToggleTemp unit={tempUnit} setUnit={setTempUnit} />
          </div>
          <WeatherChart title="Temperature" data={dataTemp} />
          <WeatherChart title="Relative Humidity" data={dataHumidity} />
          <WeatherChart title="Precipitation" data={dataPrecipitation} />
          <WeatherChart title="Visibility" data={dataVisibility} />
          <WeatherChart title="Wind Speed" data={dataWindSpeed} />
          <WeatherChart
            title="Air Quality Index(PM10 and PM2.5)"
            data={dataAqi}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
