import { useState, useEffect } from 'react';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover"
        >
          <source src="/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-background/99" />
      </div>

      <div className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
        <div className="p-6">
          <span className="text-xl font-bold text-white font-space">no fish creatives</span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center -translate-y-[15%]">
        <h1 className="text-5xl md:text-7xl font-bold text-white font-space">
          no fish creatives
        </h1>
      </div>
    </div>
  );
};

export default Home;