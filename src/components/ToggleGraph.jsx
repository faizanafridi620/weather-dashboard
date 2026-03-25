import React from "react";

function ToggleGraph({ chart, setChart }) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setChart("line")}
        className={`px-4 py-1 rounded cursor-pointer ${chart === "line" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
      >
        Line
      </button>
      <button
        onClick={() => setChart("bar")}
        className={`px-4 py-1 rounded cursor-pointer ${chart === "bar" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
      >
        Bar
      </button>
    </div>
  );
}

export default ToggleGraph;
