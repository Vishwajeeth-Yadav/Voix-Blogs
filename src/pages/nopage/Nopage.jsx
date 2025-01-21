import React from 'react'
import { Link } from 'react-router-dom'

function Nopage() {
  return (
    <div className='flex flex-col items-center justify-center space-y-6  w-screen h-[100vh] bg-gray-300'>
        <div className='text-6xl '>404 Page Not Found</div>
        <Link to={'/'}><button className='bg-cyan-300 p-4 font-semibold rounded border-2  border-black hover:text-white hover:bg-blue-700 hover:scale-105 trasition duration-300 ease-in-out'>Back to HomePage</button></Link>
    </div>

  )
}

export default Nopage