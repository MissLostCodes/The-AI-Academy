import React, { useState } from 'react'

function SelectOption({ selectedStudyType }) {
  const [selectedOption, setSelectedOption] = useState('')
  const Options = [
    {
      name: "Semester Exam ",
      icon: '/semexam.png'
    },
    {
      name: "Competetive Exam ",
      icon: '/compexam.png'
    },
    {
      name: "Job Interview ",
      icon: '/interview.png'
    },
    {
      name: "Coding",
      icon: '/coding.png'
    },
    {
      name: "Other",
      icon: '/book.png'
    },
  ]

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4 text-center'>Select the type of study content you want to generate</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {Options.map((option, index) => (
          <div
            key={index}
            className={`bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer ${
              option.name === selectedOption ? 'border-2 border-purple-500' : ''
            }`}
            onClick={() => {
              setSelectedOption(option.name);
              selectedStudyType(option.name)
            }}
          >
            <img src={option.icon} alt={option.name} className="w-10 h-10 mb-4" />
            <h2 className="text-lg font-bold mb-2">{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectOption
