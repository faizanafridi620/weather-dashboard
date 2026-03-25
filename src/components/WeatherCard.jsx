
function Weathercard({title, value, unit}) {
  return (
    <div className="p-4 bg-white shadow rounded-xl">
        <h2 className="text-gray-500">{title}</h2>
        <p className="text-2xl font-bold">{value} {unit}</p>
    </div>
  )
}

export default Weathercard