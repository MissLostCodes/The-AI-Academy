import React from 'react'
//import { Textarea } from '@/components/ui/textarea'
import { Textarea } from '../../../@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/Select'
import { StethoscopeIcon } from 'lucide-react'

function TopicInput({ setTopic, setDifficultyLevel }) {
  return (
    <div className='text-center'>
      <h3 className="text-3xl font-bold mb-2 text-white text-transparent">
        Hey! What subject or topic do you want to study?
      </h3>

      <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 inline-block">
      <Textarea
  placeholder="Enter what you want to study here, you can also elaborate on it."
  className="bg-black text-white h-24 w-[567px] border-none focus:outline-none focus:ring-0"
   onChange={(event)=>setTopic(event.target.value)}/>
       
      </div>
      <h2 className='text-3xl text-white text-sm mt-2'>Select the difficulty level</h2>
      <div className="p-[2px] mt-3 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 inline-block">
      
        <Select onValueChange={(value)=>setDifficultyLevel(value)} className="bg-black text-white  w-[567px] border-none focus:outline-none focus:ring-0 w-">
          <SelectTrigger className='w-full bg-black text-white'><SelectValue placeholder="Level" /></SelectTrigger>
          <SelectContent className="bg-black text-white">
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        </div>
    </div>
  )
}

export default TopicInput
