import React, { useEffect } from 'react'
import MaterialCardItem from './MaterialCardItem';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

function StudyMaterialSection({ courseId , course }) {
  const [studyTypeContent, setStudyTypeContent] = useState(null);
  const [error, setError] = useState(null);
  
  const MaterialList = [
    {
      name: 'Notes/Chapters',
      desc: 'Your customized learning content',
      icon: '/notes.png',
      path: '/notes',
      type: 'notes'
    },
    {
      name: 'Tests',
      desc: 'Test yourself !',
      icon: '/quiz.png',
      path: '/quiz',
      type: 'quiz'
    },
    {
      name: 'CheetSheet',
      desc: 'Revise in one go ! ',
      icon: '/sprinter.png',
      path: '/cheatsheet',
      type: 'cheatsheet'
    }
  ]

  useEffect(() => {
    if (courseId) {
      GetStudyMaterial();
    }
  }, [courseId]);

  const GetStudyMaterial = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'all'
      });
      console.log('Study material result:', result?.data);
      setStudyTypeContent(result.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching study material:', error);
      setError('Failed to load study material');
    }
  }

  return (
    <div className="p-6 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
          Your Ultimate Study Kit
        </h2>
        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MaterialList.map((item, index) => (
            <div key={index}>
              <MaterialCardItem 
                item={item}
                studyTypeContent={studyTypeContent} 
                course={course}
                refreshData={GetStudyMaterial}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudyMaterialSection
