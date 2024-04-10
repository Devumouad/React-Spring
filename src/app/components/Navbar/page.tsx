'use client'
import React from 'react'
 import SearchBar from '../Interfaces/SearchBar/page'
import  Link  from 'next/link'
SearchBar
function Navbar() {
  return (
    <div className='bg-gray-800'>
        <div className="h-[4rem] px-8 flex items-center justify-between ">
            <Link href="/" className='text-white font-bold'>User Managment System</Link>
            
        </div>
        
    </div>
  )
}

export default Navbar