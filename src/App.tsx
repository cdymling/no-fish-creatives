
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Services from "./pages/Services";
import ProtectedVideos from "./pages/ProtectedVideos";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "./hooks/use-mobile";

// Huvudsidan med alla sektioner i scrollsequens
const MainPage = () => {
  const isMobile = useIsMobile();
  const [activeReason, setActiveReason] = useState(0);
  const aboutReasonContainerRef = useRef<HTMLDivElement>(null);
  const previousSectionRef = useRef<string | null>(null);
  const currentSectionRef = useRef<string | null>(null);

  // Track section changes for proper scrolling behavior
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        previousSectionRef.current = currentSectionRef.current;
        currentSectionRef.current = sectionId;
        
        // Reset to first reason when entering about-content from the title section
        if (sectionId === "about-content" && previousSectionRef.current === "about-title" && isMobile) {
          if (aboutReasonContainerRef.current) {
            aboutReasonContainerRef.current.scrollTop = 0;
            setActiveReason(0);
          }
        }
      }
    });
  };

  useEffect(() => {
    if (!isMobile) return;
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5
    });
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !aboutReasonContainerRef.current) return;

    const handleScroll = () => {
      const container = aboutReasonContainerRef.current;
      if (!container) return;
      
      const scrollPosition = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // Determine which reason is currently visible based on scroll position
      if (scrollPosition < containerHeight * 0.5) {
        setActiveReason(0);
      } else if (scrollPosition < containerHeight * 1.5) {
        setActiveReason(1);
      } else {
        setActiveReason(2);
      }
    };

    const container = aboutReasonContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // Handle navigation between About reasons and other sections
  useEffect(() => {
    if (!isMobile) return;
    
    const handleWheelInAboutContent = (e: WheelEvent) => {
      if (currentSectionRef.current !== 'about-content') return;
      
      const container = aboutReasonContainerRef.current;
      if (!container) return;
      
      const isAtTop = container.scrollTop === 0;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      
      // If at the top of the container and scrolling up, navigate to previous section
      if (isAtTop && e.deltaY < 0) {
        e.preventDefault();
        const aboutTitleSection = document.getElementById('about-title');
        aboutTitleSection?.scrollIntoView({ behavior: 'smooth' });
      }
      
      // If at the bottom of the container and scrolling down, navigate to next section
      if (isAtBottom && e.deltaY > 0) {
        e.preventDefault();
        const servicesSection = document.getElementById('services-title');
        servicesSection?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    document.addEventListener('wheel', handleWheelInAboutContent, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', handleWheelInAboutContent);
    };
  }, [isMobile, currentSectionRef.current]);

  const aboutReasons = [
    {
      number: "#1",
      text: "We let you work directly with senior creatives. The kind you'd normally find at a big, highly awarded creative agency. Just without all the layers of people, processes and up-selling that usually come with it."
    },
    {
      number: "#2",
      text: "We're smart about production. When it makes sense, we handle it ourselves, using AI or taking on tasks like directing and editing."
    },
    {
      number: "#3",
      text: "We collaborate with a network of specialists in strategy, design and production when your task demands it. That way, we minimize overlapping roles and processes and make sure you only pay for what you need, when you need it."
    }
  ];

  // Touch handling for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (currentSectionRef.current !== 'about-content') return;
      
      const container = aboutReasonContainerRef.current;
      if (!container) return;
      
      touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchStartY - touchEndY;
      
      const isAtTop = container.scrollTop === 0;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      
      // Threshold to determine if it was a significant swipe
      const threshold = 50;
      
      // If at the top of reasons container and swiping up, go to previous section
      if (isAtTop && touchDiff < -threshold) {
        const aboutTitleSection = document.getElementById('about-title');
        aboutTitleSection?.scrollIntoView({ behavior: 'smooth' });
      }
      
      // If at the bottom of reasons container and swiping down, go to next section
      if (isAtBottom && touchDiff > threshold) {
        const servicesSection = document.getElementById('services-title');
        servicesSection?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, currentSectionRef.current]);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      {/* Home section */}
      <section id="home" className="snap-start h-screen w-full">
        <Home />
      </section>
      
      {/* About sections */}
      <section id="about-title" className="snap-start h-screen w-full bg-black relative z-10">
        <div className="h-screen w-full flex items-start justify-start px-6 py-6">
          <div className="w-full">
            <h1 className="font-clash text-white text-[3.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[12rem] font-bold leading-[1.1] text-left">
              <span className="block">You don't</span>
              <span className="block">need a big</span>
              <span className="block">agency <span className="text-[#5CE1E6]">to do</span></span>
              <span className="text-[#5CE1E6]">big things.</span>
            </h1>
          </div>
        </div>
      </section>
      <section id="about-content" className="snap-start h-screen w-full bg-black">
        {isMobile ? (
          <div className="h-screen w-full flex flex-col bg-black">
            {/* Fixed header */}
            <div className="px-6 py-8 bg-black z-10 border-b border-gray-800">
              <h2 className="font-clash text-white text-4xl font-bold">
                Here's why:
              </h2>
            </div>
            
            {/* Scrollable reasons */}
            <div 
              ref={aboutReasonContainerRef}
              className="flex-1 overflow-y-auto snap-y snap-mandatory"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              {aboutReasons.map((reason, index) => (
                <div 
                  key={index} 
                  className="h-[calc(100vh-132px)] flex flex-col justify-center px-6 snap-start"
                >
                  <p className="font-clash text-white text-3xl leading-tight">
                    <span className="text-[#5CE1E6] font-bold">{reason.number}</span> {reason.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-screen w-full bg-black px-6 py-12 flex flex-col justify-start">
            <h2 className="font-clash text-white text-4xl md:text-5xl font-bold mb-8">
              Here's why:
            </h2>
            
            <div className="space-y-12 max-w-5xl">
              <div>
                <p className="font-clash text-white text-3xl md:text-4xl leading-tight">
                  <span className="text-[#5CE1E6] font-bold">#1</span> We let you work directly with senior creatives. The kind you'd normally find at a big, highly awarded creative agency. Just without all the layers of people, processes and up-selling that usually come with it.
                </p>
              </div>
              
              <div>
                <p className="font-clash text-white text-3xl md:text-4xl leading-tight">
                  <span className="text-[#5CE1E6] font-bold">#2</span> We're smart about production. When it makes sense, we handle it ourselves, using AI or taking on tasks like directing and editing.
                </p>
              </div>
              
              <div>
                <p className="font-clash text-white text-3xl md:text-4xl leading-tight">
                  <span className="text-[#5CE1E6] font-bold">#3</span> We collaborate with a network of specialists in strategy, design and production when your task demands it. That way, we minimize overlapping roles and processes and make sure you only pay for what you need, when you need it.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
      <section id="about-video" className="snap-start h-screen w-full">
        <div className="h-screen w-full relative overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/about-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      
      {/* Services sections */}
      <section id="services-title" className="snap-start h-screen w-full bg-black">
        <div className="h-screen w-full flex items-start justify-start px-6 py-6">
          <div className="w-full">
            <h1 className="font-clash text-white text-[3.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[12rem] font-bold leading-[1.1] text-left">
              <span className="block">How we</span>
              <span className="block">might be <span className="text-[#5CE1E6]">of</span></span>
              <span className="block text-[#5CE1E6]">service:</span>
            </h1>
          </div>
        </div>
      </section>
      <section id="services-content" className="snap-start h-screen w-full bg-black">
        <div className="h-screen w-full bg-black px-6 py-12 flex flex-col justify-start">
          <div className="space-y-8 max-w-5xl">
            <div>
              <p className="font-space text-white text-2xl md:text-3xl leading-tight">
                <span className="text-[#5CE1E6]">→</span> Acting as a flexible creative partner to marketing departments and in-house agencies.
              </p>
            </div>
            
            <div>
              <p className="font-space text-white text-2xl md:text-3xl leading-tight">
                <span className="text-[#5CE1E6]">→</span> Developing concepts, campaigns or just a single ad, and producing them when possible.
              </p>
            </div>
            
            <div>
              <p className="font-space text-white text-2xl md:text-3xl leading-tight">
                <span className="text-[#5CE1E6]">→</span> Leading creatively from initial idea to final delivery.
              </p>
            </div>
            
            <div>
              <p className="font-space text-white text-2xl md:text-3xl leading-tight">
                <span className="text-[#5CE1E6]">→</span> In a way you might have thought of that we haven't?
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="services-video" className="snap-start h-screen w-full">
        <div className="h-screen w-full relative overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/services-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      
      {/* Work sections */}
      <section id="work-title" className="snap-start h-screen w-full bg-black">
        <div className="h-screen w-full flex flex-col justify-start pt-12 px-6">
          <div className="w-full">
            <h1 className="font-clash text-white text-[3.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[12rem] font-bold leading-[1.1] text-left">
              <span className="block">Hold tight</span>
              <span className="block">while we get</span>
              <span className="block">this show <span className="text-[#5CE1E6]">on</span></span>
              <span className="block text-[#5CE1E6]">the road.</span>
            </h1>
          </div>
        </div>
      </section>
      <section id="work-content" className="snap-start h-screen w-full bg-black">
        <div className="h-screen w-full flex flex-col justify-start pt-12 px-6">
          <div className="max-w-3xl">
            <p className="font-space text-white text-xl md:text-2xl leading-tight mb-8 text-left">
              We and our current clients are soon ready to show what we've been working on. In the meantime, know that the work we'll be doing is backed by years of experience as award-winning creatives, developing ideas and campaigns for some of Sweden's biggest brands across all kinds of channels, formats and industries.
            </p>
            
            <p className="font-space text-white text-xl md:text-2xl leading-tight mb-10 text-left">
              Curious about us or what's possible with AI? Email us at hello@nofish.se.
            </p>
            
            <Work />
          </div>
        </div>
      </section>
      <section id="work-video" className="snap-start h-screen w-full">
        <div className="h-screen w-full relative overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/work-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/protected-videos" element={<ProtectedVideos />} />
      <Route path="/work" element={<Work />} />
    </Routes>
  </Layout>
);

export default App;
