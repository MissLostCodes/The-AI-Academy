'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import StepProgress from '../_components/StepProgress';
import QuizCardItem from './_components/QuizCardItem';
import { Button } from '@/components/ui/button';
import FancyWrapper from '@/components/FancyWrapper';

function Quiz() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId;
  const [quizData, setQuizData] = useState(null);
  const [stepCount, setStepCount] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [correctAns, setIsCorrectAns] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      GetQuiz();
    }
  }, [courseId]);

  const GetQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching quiz for courseId:', courseId);

      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'quiz'
      });

      console.log('Quiz API Response:', result?.data);
      
      if (!result?.data?.quiz || result.data.quiz.length === 0) {
        setError('No quiz available for this course');
        return;
      }

      // Find the first quiz with Ready status, non-empty content, and matching courseId
      const readyQuiz = result.data.quiz.find(q => 
        q.status === 'Ready' && 
        q.content && 
        q.content.length > 0 && 
        q.courseId === courseId
      );
      
      if (!readyQuiz) {
        setError('No ready quiz available for this course');
        return;
      }

      console.log('Using quiz:', readyQuiz);
      console.log('Quiz content:', readyQuiz.content);
      
      // Parse the quiz content if it's a string
      let parsedContent;
      try {
        parsedContent = typeof readyQuiz.content === 'string' ? JSON.parse(readyQuiz.content) : readyQuiz.content;
        console.log('Parsed quiz content:', parsedContent);
      } catch (parseError) {
        console.error('Error parsing quiz content:', parseError);
        setError('Invalid quiz content format');
        return;
      }

      setQuizData(readyQuiz);
      setQuiz(parsedContent);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (userAnswer, currentQuestion) => {
    if (userAnswer === currentQuestion?.correctAnswer) {
      setIsCorrectAnswer(true);
      setIsCorrectAns(true);
    } else {
      setIsCorrectAnswer(false);
      setIsCorrectAns(false);
      setCorrectAnswer(currentQuestion?.correctAnswer);
    }
  };

  useEffect(() => {
    setIsCorrectAns(null);
    setCorrectAnswer(null);
  }, [stepCount]);

  const handleBackToCourse = () => {
    router.push(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Loading test...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-red-500">{error}</h2>
        </div>
      </div>
    );
  }

  if (!quiz.length) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">No tests available</h2>
        </div>
      </div>
    );
  }

  const isLastQuestion = stepCount === quiz.length - 1;
  console.log('Current quiz state:', { quiz, stepCount, isLastQuestion });

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            It's time for the Test!
          </h2>
          <FancyWrapper>
            <Button
              onClick={handleBackToCourse}
              variant="fancy"
            >
              Back to Course
            </Button>
          </FancyWrapper>
        </div>
        
        <StepProgress data={quiz} stepCount={stepCount} setStepCount={(v) => setStepCount(v)} />

        <div className="mt-8">
          {quiz.length > 0 && (
            <QuizCardItem
              quiz={quiz[stepCount]}
              userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
            />
          )}
        </div>

        {correctAns === false && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
            <h2 className="text-xl text-red-500">Incorrect! The correct answer is: {correctAnswer}</h2>
          </div>
        )}

        {correctAns === true && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500 rounded-lg">
            <h2 className="text-xl text-green-500">Correct! Well done!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
