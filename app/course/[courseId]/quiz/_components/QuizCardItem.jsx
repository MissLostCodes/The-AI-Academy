import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

function QuizCardItem({ quiz, userSelectedOption }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    userSelectedOption(option);
  };

  return quiz && (
    <div className="p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400">
      <div className="bg-black text-white rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-8 text-center text-pink-300">
          {quiz?.question}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quiz?.options?.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? "fancy" : "outline"}
              className={`w-full text-lg p-6 h-auto ${
                selectedOption === option 
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white' 
                  : 'hover:bg-gray-800'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizCardItem;
