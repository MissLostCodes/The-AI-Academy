"use client"
import React, { useState, useEffect, useContext } from 'react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import CourseCardItem from './CourseCardItem';
import FancyWrapper from '@/components/FancyWrapper'
import { Button } from '@/components/ui/button'
import { CourseCountContext } from '@/app/_context/CourseCountContext';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const {totalCourse , setTotalCourse}=useContext(CourseCountContext);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/courses', {
        createdBy: user?.primaryEmailAddress?.emailAddress
      });
      setCourses(result.data.result);
      setTotalCourse(result.data.result?.length);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchCourses();
    }
  }, [user?.primaryEmailAddress?.emailAddress]);

  const refreshData = (shouldRefresh) => {
    if (shouldRefresh) {
      fetchCourses();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-6">
        <div className="animate-pulse">
          <div className="h-48 w-[400px] bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-10'>
       <div className="flex items-center justify-center w-full my-6 gap-4">
    <h2 className="text-2xl font-bold text-white whitespace-nowrap">Your Learnings</h2>
    <FancyWrapper>
      <Button variant="fancy" onClick={() => fetchCourses()}>Refresh</Button>
    </FancyWrapper>
  </div>

      <div className='flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl'>
          {courses?.map((course, index) => (
            <CourseCardItem 
              key={index} 
              course={course} 
              refreshData={refreshData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseList;
