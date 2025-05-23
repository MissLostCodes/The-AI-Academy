'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FancyWrapper from '@/components/FancyWrapper'

function Cheatsheet() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId;
  const [cheatsheetData, setCheatsheetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      getCheatsheet();
    }
  }, [courseId]);

  const getCheatsheet = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching cheatsheet for courseId:', courseId);

      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'cheatsheet'
      });

      console.log('Cheatsheet API Response:', result?.data);
      
      if (!result?.data?.cheatsheet || result.data.cheatsheet.length === 0) {
        setError('No cheatsheet available for this course');
        return;
      }

      // Find the first cheatsheet with Ready status, non-empty content, and matching courseId
      const readyCheatsheet = result.data.cheatsheet.find(c => 
        c.status === 'Ready' && 
        c.content && 
        c.content.length > 0 && 
        c.courseId === courseId
      );
      
      if (!readyCheatsheet) {
        setError('No ready cheatsheet available for this course');
        return;
      }

      console.log('Using cheatsheet:', readyCheatsheet);
      setCheatsheetData(readyCheatsheet);
    } catch (error) {
      console.error('Error fetching cheatsheet:', error);
      setError('Failed to load cheatsheet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCourse = () => {
    router.push(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Loading cheatsheet...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-red-500">{error}</h2>
        </div>
      </div>
    );
  }

  if (!cheatsheetData) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">No cheatsheet available</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            Cheatsheet
          </h2>
          <FancyWrapper>
          <Button
            onClick={handleBackToCourse}
            variant="fancy" 
          >
            Back to Course
          </Button>
          </FancyWrapper>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <div 
            className="p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400"
          >
            <div className="bg-black rounded-lg p-8">
              <div 
                className="notes-content"
                dangerouslySetInnerHTML={{ 
                  __html: cheatsheetData.content 
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cheatsheet; 