# 🌦 Weather Dashboard (ReactJS)

A responsive and high-performance weather dashboard built using ReactJS that provides **real-time and historical weather insights** using the Open-Meteo API.

---

## 📌 Project Overview

This application fetches the user’s **live location via browser GPS** and displays:

* 🌤 Current weather conditions
* 📊 Hourly weather data with interactive charts
* 📈 Historical weather trends (up to 2 years)

The app is optimized for **performance, responsiveness, and user experience**.

---

## ⚙️ Tech Stack

* ⚛️ React (Vite)
* 🎨 Tailwind CSS
* 📊 Recharts (Charts & Graphs)
* 📅 React Datepicker
* 🌐 Axios (API calls)
* ☁️ Open-Meteo API

---

## ✨ Features

### 📍 Location-Based Weather

* Automatically detects user location using browser GPS
* Displays localized weather data instantly

---

### 🌡 Current Weather (Page 1)

* Temperature (Min, Max, Current)
* Precipitation
* Relative Humidity
* UV Index
* Sunrise & Sunset
* Wind Speed
* Precipitation Probability

---

### 🌫 Air Quality Data

* PM10 & PM2.5
* CO, CO2, NO2, SO2

---

### 📊 Hourly Forecast

* Temperature (°C ↔ °F toggle)
* Relative Humidity
* Precipitation
* Visibility
* Wind Speed
* Air Quality (PM10 & PM2.5 combined graph)

---

### 📈 Historical Data (Page 2)

* Select custom date range (max 2 years)
* Displays:

  * Mean, Max, Min Temperature
  * Sunrise & Sunset (IST)
  * Precipitation trends
  * Wind Speed & Direction

---

### 📉 Interactive Charts

* Line & Bar chart toggle
* Zoom functionality (Brush)
* Horizontal scrolling
* Multi-line charts for comparison

---

## ⚡ Performance Optimizations

* 🚀 Parallel API calls using `Promise.all`
* 💾 Data caching using `localStorage`
* 🧠 Memoization using `useMemo`

---

## 📱 Responsive Design

* Fully mobile-friendly UI
* Adaptive chart rendering
* Optimized layouts for all screen sizes

---

## 🧩 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── WeatherCard.jsx
│   ├── WeatherChart.jsx
│   ├── ToggleTemp.jsx
│   ├── ToggleGraph.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── History.jsx
│
├── services/
│   ├── weatherApi.js
│
├── utils/
│   ├── getLocation.js
│
├── App.jsx
├── main.jsx
```

---

## 🛠 Installation & Setup

# Clone the repository
```bash
git clone https://github.com/your-username/weather-dashboard.git
```

# Navigate into project
```bash
cd weather-dashboard
```

# Install dependencies
```bash
npm install
```

# Start development server
```bash
npm run dev
```

---


## ⚠️ Important Notes

* Allow **location access** for correct weather data
* Internet connection required for API calls

---
