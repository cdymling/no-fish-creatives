
import React from 'react';
import { FloatingText } from '../components/FloatingText';

const Home = () => {
  return (
    <div className="min-h-screen relative">
      {/* Logo and Tagline centered */}
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <FloatingText className="font-clash text-white text-[7.5rem] font-bold leading-none safari-text-fix animate-underwater-wave">
          <span className="inline-block animate-letter-wave-1">n</span>
          <span className="inline-block animate-letter-wave-2">o</span>
          <span className="inline-block animate-letter-wave-3 mr-4"> </span>
          <span className="inline-block animate-letter-wave-4">f</span>
           <span className="inline-block animate-letter-wave-5">i</span>
          <span className="inline-block animate-letter-wave-6">s</span>
          <span className="inline-block animate-letter-wave-1">h</span>
        </FloatingText>
      </div>
    </div>
  );
};

export default Home;
