import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex justify-between items-center px-6 py-4 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50'>
        <h1 className='text-xl font-bold text-blue-600'>Weather Dashboard</h1>
        <div className='flex gap-6 font-medium text-gray-700'>
            <Link to="/">Home</Link>
            <Link to="/history">History</Link>
        </div>
    </div>
  )
}

export default Navbar