"use client"
import React from 'react'
import { useParams } from 'next/navigation' 
import DashboardHeader from '../../dashboard/_components/DashboardHeader';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterialSection from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList';

function Course() {
    const { courseId } = useParams();
    const [course, setCourse] = useState();
    
    useEffect(() => {
        GetCourse();
    }, []);

    const GetCourse = async () => {
        const result = await axios.get('/api/courses?courseId=' + courseId);
        console.log(result);//we get the course id 
        setCourse(result.data.result);
    }

    return (
        <div>
            
            <div className="space-y-8">
                <CourseIntroCard course={course} />
                <StudyMaterialSection courseId={courseId} course={course} />
                <ChapterList course={course} />
            </div>
        </div>
    )
}

export default Course
