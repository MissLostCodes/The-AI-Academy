import React from 'react'
import Image from 'next/image'
import { RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import FancyWrapper from '@/components/FancyWrapper'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'

function CourseCardItem({ course, refreshData }) {
  const router = useRouter();

  const handleRefresh = async () => {
    try {
      // Call the API to check course status
      const result = await axios.post('/api/study-type', {
        courseId: course.courseId,
        studyType: 'all'
      });

      // If the course is still generating, refresh the page
      if (course?.status === 'Generating') {
        router.refresh();
        toast('Refreshing course status...');
      } else {
        toast('Course is ready!');
      }
    } catch (error) {
      console.error('Error refreshing course:', error);
      toast.error('Failed to refresh course status');
    }
  };

  const formatTitle = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

  const topic = formatTitle(course?.topic || 'Untitled');
  const type = formatTitle(course?.courseType || 'Course');
  const difficulty = formatTitle(course?.difficultyLevel);

  return (
    <div className="p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 shadow-md">
      <div className="bg-black text-white rounded-lg p-4">
        <div className="flex justify-between items-center">
          <Image src={'/knowledge.png'} alt='course image' width={80} height={80} />
        </div>

        <div className="mt-3">
          <h2 className="font-semibold text-lg text-pink-300 line-clamp-1">
            {`${topic} : ${type}`}
          </h2>
          <div className="mt-1 inline-block px-3 py-1 rounded-full bg-gray-500/50">
            <h4 className="text-sm font-medium text-purple-300">
              {difficulty}
            </h4>
          </div>
        </div>

        <p className="text-[11px] line-clamp-2 text-gray-400 mt-2">
          {course?.courseLayout?.courseSummary || "No description provided."}
        </p>

        <div className="mt-3 w-full h-2 rounded-full bg-gray-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400"
            style={{ width: `${100}%` }}
          />
        </div>

        <div className="mt-3 flex justify-end">
          {course?.status === 'Generating' ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-gray-800"
              onClick={handleRefresh}
            >
              <RefreshCcw className="h-4 w-4 animate-spin" />
            </Button>
          ) : 
          <Link href={'/course/'+course?.courseId}>
            <FancyWrapper>
              <Button variant="fancy">View</Button>
            </FancyWrapper>
          </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default CourseCardItem
