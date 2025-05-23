'use client'
import React, { useState, useContext } from 'react'
import { CourseContextName } from '@/app/_context/CourseCountContext'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CourseCountContext } from '@/app/_context/CourseCountContext'

import { Progress } from '@/components/ui/progress'
import { LayoutDashboard, Shield, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react'

function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const MenuList = [
        {
            name:'Dashboard',
            icon:LayoutDashboard,
            path:'/dashboard'
        },
        {
            name:'Upgrade',
            icon:Shield,
            path:'/upgrade'
        },
      /*  {
            name:'Profile',
            icon:UserCircle,
            path:'/dashboard/profile'
        }*/
    ]
    // progress bar waala yahan hai 
    const {totalCourse, setTotalCourse} = useContext(CourseCountContext);
    const path = usePathname();

    return (
        <div 
            className={`h-[calc(100vh-3rem)] p-2 transition-all duration-300 fixed top-12 ${isCollapsed ? 'w-20' : 'w-64'} bg-black`}
            style={{ boxShadow: "0px 2px 10px rgba(186, 85, 211, 0.5)" }}
        >
            <div className="flex justify-between items-center p-2">
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-slate-800 text-white"
                >
                    {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>
            </div>

            <div className='mt-2'>
                

                <div className='mt-4 space-y-2'>
                    {MenuList.map((menu, index) => (
                        <Link 
                            key={index}
                            href={menu.path}
                            className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-slate-800 text-white ${
                                path === menu.path ? 'bg-slate-800' : ''
                            }`}
                        >
                            <menu.icon className='w-5 h-5' />
                            {!isCollapsed && <span>{menu.name}</span>}
                        </Link>
                    ))}
                </div>
            </div>

            {!isCollapsed && (
                <div className="h-30 w-60 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 absolute bottom-9 border border-purple-500/20">
                    <h2 className='text-lg font-medium mb-3 text-white flex items-center gap-2'>
                        <Shield className="w-5 h-5 text-purple-400" />
                        Available Credits
                    </h2>
                    <Progress 
                        value={Math.min((totalCourse/5)*100, 100)} 
                        className="w-full h-2 bg-slate-700 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500"
                    />
                    <div className="flex justify-between items-center mt-3">
                        <h2 className='text-sm text-slate-300 font-medium'>
                            {Math.min(totalCourse, 5)} <span className="text-purple-400">/ 5</span> credits used
                        </h2>
                        <Link 
                            href='/upgrade' 
                            className='text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full transition-all duration-300'
                        >
                            Upgrade Plan
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SideBar;