import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import FancyWrapper from '@/components/FancyWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Dashboard() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='px-6 pt-16'>
        <WelcomeBanner />
      </div>

      
      <div className="flex justify-center my-4">
        <Link href='/create'>
          <FancyWrapper>
            <Button variant="fancy">
              + Create New
            </Button>
          </FancyWrapper>
        </Link>
      </div>

      <div>
        <CourseList />
      </div>
    </div>
  )
}

export default Dashboard
