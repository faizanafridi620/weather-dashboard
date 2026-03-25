import axios from "axios";

export const fetchWeather = async (lat, lon) => {
  const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: lat,
      longitude: lon,
      hourly:
        "temperature_2m,relative_humidity_2m,precipitation,visibility,windspeed_10m",
      daily:
        "temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max,sunrise,sunset,wind_speed_10m_max,precipitation_probability_max",
      current_weather: true,
      timezone: "auto",
    },
  });
  return res.data;
};

export const fetchAQI = async (lat, lon) => {
  const res = await axios.get(
    "https://air-quality-api.open-meteo.com/v1/air-quality",
    {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: "pm10,pm2_5,carbon_dioxide",
        current: "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide",
        timezone: "auto",
      },
    },
  );
  return res.data;
};
