'use client'
import React from 'react'
import Navbar from '../components/Navbar/page'
import AddUser from '../components/Data/AddUser/page'

function InitialInterface() {

  

  return (
    <div>
      <Navbar />
      <main className={`flex min-h-screen  bg-white flex-col items-center justify-between p-24 `}>
        <AddUser />
      </main>
    </div>
  )
}

export default InitialInterface