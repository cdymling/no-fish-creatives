
import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Video */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover md:object-center object-[70%_center]"
        >
          <source src="/home-background.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Logo and Tagline centered */}
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <span className="font-clash text-white text-4xl font-bold mb-4">no fish creatives</span>
        <p className="font-space text-white text-xl max-w-md text-balance">
          Seasoned creatives. Free from the fishy layers of an agency.
        </p>
      </div>
    </div>
  );
};

export default Home;
