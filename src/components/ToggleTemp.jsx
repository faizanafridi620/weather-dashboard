function ToggleTemp({ unit, setUnit }) {
  return (
    <div>
      <button
        onClick={() => setUnit("C")}
        className={`px-3 py-1 rounded cursor-pointer ${unit === "C" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit("F")}
        className={`px-3 py-1 rounded cursor-pointer ${unit === "F" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
      >
        °F
      </button>
    </div>
  );
}

export default ToggleTemp;
