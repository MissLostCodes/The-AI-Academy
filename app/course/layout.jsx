import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'
function CourseViewLayout({children}) {
  return (
    <div>
        <DashboardHeader />
      <div className = "min-h-screen bg-black">
        {children}
      </div>
    </div>
  )
}

export default CourseViewLayout
