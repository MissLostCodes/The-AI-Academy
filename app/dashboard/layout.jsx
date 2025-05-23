"use client";

import { Divide } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import SideBar from './_components/SideBar';
import DashboardHeader from './_components/DashboardHeader';
import WelcomeBanner from './_components/WelcomeBanner';
import {CourseCountContext} from '../_context/CourseCountContext';

function DashboardLayout({children}){
    const [totalCourse , setTotalCourse]=useState(0);
    return (
        <CourseCountContext.Provider value={{totalCourse , setTotalCourse}}>
        <div className="min-h-screen">
            <DashboardHeader />
            <div className="flex">
                <SideBar />
                <main className="flex-1 ml-20">
                    {children}
                </main>
            </div>
        </div>
        </CourseCountContext.Provider>
    )
}

export default DashboardLayout;