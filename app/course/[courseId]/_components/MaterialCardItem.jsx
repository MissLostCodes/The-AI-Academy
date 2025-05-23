import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FancyWrapper from '@/components/FancyWrapper'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'sonner'
import { RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [isContentReady, setIsContentReady] = useState(false);
  const [gradientClass, setGradientClass] = useState('p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // For notes, always show as ready
    if (item.type === 'notes') {
      setIsContentReady(true);
      setGradientClass('p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400');
      return;
    }
    
    // Check if content exists and is ready
    const content = studyTypeContent?.[item.type];
    const ready = content?.some(item => item.status === 'Ready' && item.content);
    setIsContentReady(ready);
    setGradientClass(`p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 ${!ready ? 'grayscale' : ''}`);
  }, [studyTypeContent, item.type]);

  const GenerateContent = async (e) => {
    e.preventDefault(); // Prevent the Link from navigating
    e.stopPropagation(); // Stop event propagation

    if (!course?.courseId) {
      toast.error('Course ID is missing');
      return;
    }

    toast('Generating your content');
    setLoading(true);

    let chapters = '';
    course?.courseLayout?.chapters?.forEach((chapter) => {
      chapters = (chapter.chapter_title || chapter.chapterTitle) + ',' + chapters;
    });

    try {
      const result = await axios.post('/api/study-type-content', {
        courseId: course.courseId,
        type: item.type,
        chapters: chapters,
        courseType: course?.courseType,
        difficultyLevel: course?.difficultyLevel
      });

      console.log('Content generation result:', result);
      refreshData(true);
      toast('Your content is ready to view', {
        onAutoClose: () => {
          router.refresh();
        }
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Something went wrong while generating content');
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isContentReady && course?.courseId) {
      router.push(`/course/${course.courseId}/${item.type}`);
    }
  };

  return (
    <div onClick={(e) => {
      if (!isContentReady) {
        e.preventDefault();
        return;
      }
    }}>
      <div className={gradientClass}>
        {/* Centered Badge */}
        <div className="flex justify-center mt-2 mb-1">
          <h2 className="text-sm px-3 py-1 bg-green-500 text-white rounded-full">
            {item.type === 'notes' ? 'Ready' : (isContentReady ? 'Ready' : 'Generate')}
          </h2>
        </div>

        {/* Card Content */}
        <div className="bg-black text-white rounded-lg p-5 flex flex-col items-center hover:scale-105 transition-all duration-200">
          <div className="w-16 h-16 mb-4 relative">
            <Image
              src={item.icon}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-pink-300">{item.name}</h2>
          <p className="text-gray-400 text-sm text-center mb-4">{item.desc}</p>

          {/* Centered Button */}
          <div className="flex justify-center w-full">
            <FancyWrapper>
              <Button 
                variant="fancy" 
                className="px-6" 
                onClick={isContentReady ? handleViewClick : GenerateContent}
                disabled={loading}
              >
                {loading && <RefreshCcw className="animate-spin mr-2" />}
                {isContentReady ? 'View' : 'Generate'}
              </Button>
            </FancyWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaterialCardItem;
