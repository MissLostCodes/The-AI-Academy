"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FancyWrapper from '@/components/FancyWrapper'

function ViewNotes() {
  const params = useParams();
  const courseId = params?.courseId;
  const router = useRouter();

  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      GetNotes();
    }
  }, [courseId]);

  const GetNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching notes for courseId:', courseId);
      
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'notes'
      });
      
      console.log('Notes API Response:', result?.data);
      
      if (!result?.data?.notes) {
        console.warn('No notes found in response:', result?.data);
        setError('No notes available for this course');
        return;
      }

      setNotes(result.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError('Failed to load notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Loading notes...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-red-500">{error}</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">No notes available</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className='flex gap-5 items-center mb-8'>
          {stepCount !== 0 && (
            <Button 
              variant="outline" 
              onClick={() => setStepCount(stepCount - 1)}
            >
              Previous
            </Button>
          )}
          <div className="flex-1 flex gap-2">
            {notes?.map((item, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full ${
                  index < stepCount ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          {stepCount < notes.length - 1 && (
            <Button 
              variant="outline" 
              onClick={() => setStepCount(stepCount + 1)}
            >
              Next
            </Button>
          )}
        </div>

        <div className="prose prose-invert max-w-none">
          <div
            className="notes-content"
            dangerouslySetInnerHTML={{
              __html: notes[stepCount]?.notes || ''
            }}
          />
        </div>

        {notes?.length === stepCount + 1 && (
          <div className='mt-8 flex items-center gap-10 flex-col'>
            <h2 className="text-2xl font-bold">End of Notes</h2>
            <FancyWrapper>
            <Button onClick={() => router.back()} variant="fancy">Back to Course</Button>
            </FancyWrapper>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewNotes;
