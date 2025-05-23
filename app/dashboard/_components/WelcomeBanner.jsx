import React from 'react';

function WelcomeBanner() {
  return (
    <div className="flex flex-col items-center bg-black rounded-xl p-8">
     <h2 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
     Whatever You Want to Learn — Just Ask.
      </h2>
      <h3 className="text-white text-5xl">The AI Academy</h3>
      <p className="text-gray-400 text-sm mt-2">One AI. Infinite Skills. Learn Anything.</p>
    </div>
  );
}

export default WelcomeBanner;
