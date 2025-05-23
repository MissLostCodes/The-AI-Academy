'use client'

import React, { useState } from 'react';
import SelectOption from './_components/SelectOption';
import { Button } from '@/components/ui/button';
import FancyWrapper from '@/components/FancyWrapper';
import TopicInput from './_components/TopicInput';
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { useUser } from "@clerk/nextjs";
import { toast } from 'sonner';

function Create() {
  const [step, setStep] = useState(0);
  const { user } = useUser();
  const[formData, setFormData] = useState({
    courseType: '',
    topic: '',
    difficultyLevel: ''
  })
  const [loading , setLoading] = useState(false);
// when course is being generated 
const router = useRouter();
 const handleUserInput = (fieldName , fieldValue ) => {
  setFormData(prev=>({...prev, [fieldName]: fieldValue}))
 }
 // save user input and generate ai course layout 
 const GenerateCourseOutline=async()=>{
  const courseId = uuidv4();
  setLoading(true);
  try {
    const result = await axios.post('/api/generate-course-outline' , {
      courseId : courseId ,
      ...formData,
      createdBy:user?.primaryEmailAddress?.emailAddress
    });
    setLoading(false);
    router.replace('/dashboard'); // redirect to dashboard page after generating
    // SHADCN TOAST SONAR  NOTIFICATION
    toast("AI is cooking the content , press refresh ");
    console.log(result.data.result.resp);
  } catch (error) {
    console.error('Error generating course outline:', error);
    setLoading(false);
    // Optionally show an error toast
    toast.error("Failed to generate course outline. Please try again.");
  }
 }
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='p-5 md:px-24 lg:px-36 pt-16'>
        <div className='text-center'>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            Start generating your personalized study material here 
          </h2>
          <p className='text-gray-400 text-sm mt-2 mb-8'>
               You can generate study material for your exams, subjects, chapters, and more.
          </p>
        </div>
        
        {step === 0 ? <SelectOption selectedStudyType={(value) => handleUserInput('courseType', value)} /> :
         <TopicInput setTopic={(value) => handleUserInput('topic', value)} 
         setDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)}/>}
        
        <div className='mt-8'>
          <div className='flex justify-between items-center gap-4'>
           {step!=0 ?  <FancyWrapper>
              <Button onClick={()=>setStep(step-1)} variant="fancy">Prev</Button>
            </FancyWrapper>: <div></div>}
            {step==0 ? <FancyWrapper>
              <Button onClick={()=>setStep(step+1)} variant="fancy">Next</Button>
            </FancyWrapper> :  <FancyWrapper>
              <Button variant="fancy" onClick={GenerateCourseOutline} disabled={loading}>
               {loading? <Loader className='animate-spin'/>:"Generate"} </Button>
            </FancyWrapper>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
