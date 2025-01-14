import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between bg-slate-100 p-4">
      <div className="logo">
        <span className='font-bold text-ml mx-6'>iTask</span>
      </div>
        <ul className="flex gap-8 mx-9 ">
            <li className='cursor-pointer hover:font-bold transition-all'>Home </li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
