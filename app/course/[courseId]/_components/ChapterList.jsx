import React from 'react'

function ChapterList({ course }) {
    const CHAPTERS = course?.courseLayout?.chapters || [];
    
    return (
        <div className="p-6 bg-black text-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    Chapters
                </h2>

                <div className="space-y-4">
                    {CHAPTERS.map((chapter, index) => (
                        <div 
                            key={index}
                            className="p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400"
                        >
                            <div className="bg-black text-white rounded-lg p-5 hover:scale-[1.02] transition-all duration-200">
                                <h2 className="text-xl font-semibold mb-2 text-pink-300">
                                    {chapter?.chapter_title || `Chapter ${index + 1}`}
                                </h2>
                               
                                {chapter?.topics && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {chapter.topics.map((topic, topicIndex) => (
                                            <span 
                                                key={topicIndex}
                                                className="px-3 py-1 rounded-full bg-gray-800 text-sm text-gray-300"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChapterList
