import React from 'react'

function CourseIntroCard({ course }) {
  return (
    <div className="p-6 bg-black text-white mt-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="uppercase text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
          {course?.courseLayout?.topic || 'Loading...'}
        </h1>
        
        <div className="flex gap-4 mb-6">
          <span className="px-3 py-1 rounded-full bg-gray-800 text-sm">
            {course?.courseType || 'Course Type'}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-800 text-sm">
            {course?.courseLayout?.difficultyLevel || 'Difficulty Level'}
          </span>
        </div>

        <div className="prose prose-invert max-w-none">
          
          <p className="text-gray-300">
            {course?.courseLayout?.courseSummary || 'No summary available'}
          </p>
        </div>
        
        <div className="mt-3 w-full h-2 rounded-full bg-gray-700 overflow-hidden">
         <div
           className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400"
           style={{ width: `${100}%` }}
            />
        </div>
      </div>
    </div>
  )
}

export default CourseIntroCard
