'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function DashboardHeader() {
  return (
    <div
      className='flex justify-between items-center px-4 h-12 shadow-md transition-all duration-300 fixed top-0 left-0 right-0 z-10'
      style={{ 
        boxShadow: '0px 2px 4px rgba(186, 85, 211, 0.5)',
        backgroundColor: 'black'
      }}
    >
      {/* Left - Logo and Title */}
      <div className='flex items-center gap-2'>
        <Image src='/logo.svg' alt='logo' width={20} height={20} />
        <h1 className='text-lg font-semibold text-white'>TheAiAcademy</h1>
      </div>

      {/* Right - User Button */}
      <UserButton />
    </div>
  )
}

export default DashboardHeader

