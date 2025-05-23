import { Button } from '@/components/ui/button'
import React from 'react'

function StepProgress({ stepCount, setStepCount, data }) {
  console.log('StepProgress received data:', data);
  
  // Ensure data is an array and has items
  const steps = Array.isArray(data) ? data : [];
  console.log('Processed steps:', steps);

  return (
    <div className="flex gap-5 items-center">
      {stepCount !== 0 && (
        <Button 
          variant="fancy" 
          size="sm" 
          onClick={() => setStepCount(stepCount - 1)}
        >
          Previous
        </Button>
      )}
      <div className="flex gap-2 w-full">
        {steps.map((item, index) => (
          <div 
            key={index} 
            className={`w-full h-2 rounded-full ${
              index < stepCount ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <Button 
        variant="fancy" 
        size="sm" 
        onClick={() => setStepCount(stepCount + 1)}
      >
        Next
      </Button>
    </div>
  )
}

export default StepProgress
