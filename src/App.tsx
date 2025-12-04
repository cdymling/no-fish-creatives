import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Services from "./pages/Services";
import ProtectedVideos from "./pages/ProtectedVideos";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import { useIsMobile } from "./hooks/use-mobile";
import { Reveal } from "./components/Reveal";
import { FloatingText } from "./components/FloatingText";
import { BubbleAnimation } from "./components/BubbleAnimation";
import { useSectionBlur } from "./hooks/use-section-blur";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./components/ui/carousel";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Combined client logos
const combinedClientsLogo = "/clients/combined-clients.png";

const MainPage = () => {
  const isMobile = useIsMobile();
  const { blur, darken } = useSectionBlur();
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFirstSlideClicked, setIsFirstSlideClicked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [isCampaignSectionVisible, setIsCampaignSectionVisible] = useState(false);
  const [isBadgeHidden, setIsBadgeHidden] = useState(false);
  const campaignTitleRef = useRef<HTMLElement>(null);
  const carouselSpacerRef = useRef<HTMLElement>(null);
  
  const campaignImages = [
    { src: "/campaigns/takeover_aftonbladet-2.png", alt: "Compricer Campaign" },
    { src: "/campaigns/tunnelbana_bilder-2.png", alt: "Tunnelbana Bilder Campaign" },
    { src: "/campaigns/tunnelbana_copy-2.png", alt: "Tunnelbana Copy Campaign" },
    { src: "/campaigns/mobil-2.png", alt: "Mobile Campaign" },
  ];
  
  // Direct video sources without state management
  const videoSrc = isMobile ? "/home-background-mobile.mp4" : "/home-background.mp4";

  useEffect(() => {
    // Function to handle video loading events
    const handleVideoEvent = (event: string) => {
      console.log(`Video ${event} event fired`);
      setVideoLoaded(true);
      setIsLoading(false);
    };

    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Safari specific fix: force reload the video
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isSafari) {
        console.log("Safari detected, applying special video handling");
        
        // Force load the video element
        videoElement.load();
        
        // Set a timeout to check if video is ready
        setTimeout(() => {
          if (videoElement.readyState >= 2) {
            handleVideoEvent('canplay (timeout)');
          } else {
            // If still not ready, try to reload
            videoElement.src = videoSrc;
            videoElement.load();
          }
        }, 1000);
      }
      
      // Add multiple event listeners to catch as soon as possible when video is ready
      videoElement.addEventListener('loadeddata', () => handleVideoEvent('loadeddata'));
      videoElement.addEventListener('canplay', () => handleVideoEvent('canplay'));
      videoElement.addEventListener('playing', () => handleVideoEvent('playing'));
      
      // In case video is already cached and ready
      if (videoElement.readyState >= 3) {
        handleVideoEvent('already loaded');
      }
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', () => handleVideoEvent('loadeddata'));
        videoElement.removeEventListener('canplay', () => handleVideoEvent('canplay'));
        videoElement.removeEventListener('playing', () => handleVideoEvent('playing'));
      }
    };
  }, [videoSrc]);

  // Safari detection
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const safariClass = isSafari ? 'safari-text-fix safari-text-size-fix' : '';
  
  const [carouselApi, setCarouselApi] = useState<any>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    
    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on('select', onSelect);
    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  // IntersectionObserver for campaign section badge animation - triggers when leaving campaign-title
  useEffect(() => {
    const element = campaignTitleRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show badge when campaign-title section starts leaving viewport (scrolling down)
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setIsCampaignSectionVisible(true);
        } else if (entry.isIntersecting) {
          setIsCampaignSectionVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // IntersectionObserver to hide badge when not on carousel section
  useEffect(() => {
    const carouselSection = document.getElementById('campaign-carousel');
    if (!carouselSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide badge when carousel section is less than 80% visible
        if (!entry.isIntersecting) {
          setIsBadgeHidden(true);
        } else {
          setIsBadgeHidden(false);
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(carouselSection);
    return () => observer.disconnect();
  }, []);

  const videoPosition = 'object-center';

  return <div id="main-scroll-container" className="snap-y snap-mandatory h-screen overflow-y-auto overscroll-none scroll-smooth">
      {/* Black background shown during loading */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />

      {/* Background Video - Fixed */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden bg-[hsl(var(--dark-blue))]">
        <video
          ref={videoRef}
          id="home-background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute min-w-full min-h-full object-cover ${videoPosition} transition-opacity duration-500 ${!videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          key={videoSrc}
        >
          <source 
            src={videoSrc}
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <section id="home" className="snap-start h-screen w-full">
        <Home />
      </section>
      
      <section id="about-title" className="snap-start h-screen w-full relative z-10 bg-section-blue">
        <BubbleAnimation />
        <div className={`h-screen w-full flex ${isMobile ? 'items-start pt-12' : 'items-center'} justify-start px-6 py-6`}>
          <div className={`w-full ${safariClass}`}>
            {isMobile ? <h1 className="font-clash text-white text-[3.5rem] sm:text-[3.75rem] font-bold leading-[1.05] text-left">
                <span className="block">Creative</span>
                <span className="block">work without</span>
                <Reveal direction="right" delay={0} repeat as="span" className="block text-[#df3d26]">the fishy layers</Reveal>
                <Reveal direction="right" delay={200} repeat as="span" className="block text-[#df3d26]">of an agency.</Reveal>
              </h1> : <h1 className={`font-clash text-white text-[7rem] lg:text-[9rem] xl:text-[10.5rem] font-bold leading-[0.95] text-left ${isSafari ? 'max-w-[95%]' : ''}`}>
                <span className="block">Creative work</span>
                <span className="block">without the</span>
                <Reveal direction="right" delay={0} repeat as="span" className="block text-[#df3d26]">fishy layers</Reveal>
                <Reveal direction="right" delay={200} repeat as="span" className="block text-[#df3d26]">of an agency.</Reveal>
              </h1>}
          </div>
        </div>
      </section>
      
      <section id="about-content" className="snap-start h-screen w-full relative bg-section-blue">
        <BubbleAnimation />
        <div className="h-screen w-full px-6 py-12 flex flex-col justify-start">
          <Reveal direction="right" delay={0} repeat>
            <h2 className="font-clash text-white text-4xl md:text-5xl font-bold mb-8">
              Here's how:
            </h2>
          </Reveal>
          
          <div className="space-y-3 md:space-y-12 max-w-5xl">
            <Reveal direction="right" delay={0} repeat>
              <p className="font-clash text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#df3d26] font-bold">#1</span> We let you work directly with senior creatives, the kind you'd normally find at a big, highly awarded agency. Just without the extra layers of people, processes and up-selling.
              </p>
            </Reveal>
            
            <Reveal direction="right" delay={0} repeat>
              <p className="font-clash text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#df3d26] font-bold">#2</span> We're smart about production. When it makes sense, we do it ourselves, using AI or taking on tasks like directing and editing.
              </p>
            </Reveal>
            
            <Reveal direction="right" delay={0} repeat>
              <p className="font-clash text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#df3d26] font-bold">#3</span> We team up with specialists in strategy, design, and production only when needed, avoiding overlapping roles and making sure you only pay for what you need, when you need it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Empty section showing background video */}
      <section id="about-video-spacer" className="snap-start h-screen w-full relative">
      </section>

      {/* Campaign Title Section */}
      <section id="campaign-title" ref={campaignTitleRef} className="snap-start h-screen w-full relative bg-section-blue">
        <BubbleAnimation />
        <div className={`h-screen w-full flex ${isMobile ? 'items-start pt-12' : 'items-center'} justify-start px-6 py-6`}>
          <div className={`w-full ${safariClass}`}>
            {isMobile ? <h1 className="font-clash text-white text-[3.5rem] sm:text-[3.75rem] font-bold leading-[1.05] text-left">
                <span className="block">Our latest case</span>
                <Reveal direction="right" delay={0} repeat as="span" className="block text-[#df3d26]">fresh of the</Reveal>
                <Reveal direction="right" delay={100} repeat as="span" className="block text-[#df3d26]">Hook:</Reveal>
              </h1> : <h1 className={`font-clash text-white text-[7rem] lg:text-[9rem] xl:text-[10.5rem] font-bold leading-[0.95] text-left ${isSafari ? 'max-w-[95%]' : ''}`}>
                <span className="block">Our latest case</span>
                <Reveal direction="right" delay={0} repeat as="span" className="block text-[#df3d26]">fresh of the</Reveal>
                <Reveal direction="right" delay={100} repeat as="span" className="block text-[#df3d26]">Hook:</Reveal>
              </h1>}
          </div>
        </div>
      </section>

      {/* Creative Concept badge - fixed position, visible across sections */}
      <img 
        src="/campaigns/creative-concept-badge.png"
        alt="Creative Concept"
        className="fixed left-[5%] top-1/2 w-[180px] md:w-[240px] lg:w-[340px] h-auto pointer-events-none z-30"
        style={{ 
          opacity: (currentSlide > 0 || isBadgeHidden || !isCampaignSectionVisible) ? 0 : 1,
          transform: 'translateY(-50%)',
          transition: (currentSlide > 0 || isBadgeHidden || !isCampaignSectionVisible) ? 'none' : 'opacity 300ms ease-out',
        }}
      />

      {/* Carousel Section */}
      {/* Fullscreen modal with navigation */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <img 
            src={campaignImages[fullscreenIndex].src} 
            alt={campaignImages[fullscreenIndex].alt} 
            className="max-h-full max-w-full object-contain"
          />
          {/* Left arrow */}
          {fullscreenIndex > 0 && (
            <button 
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setFullscreenIndex(fullscreenIndex - 1); }}
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {/* Right arrow */}
          {fullscreenIndex < campaignImages.length - 1 && (
            <button 
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setFullscreenIndex(fullscreenIndex + 1); }}
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          {/* Close button */}
          <button 
            className="absolute top-8 right-8 text-white text-4xl font-light hover:opacity-70 transition-opacity"
            onClick={() => setIsFullscreen(false)}
          >
            ×
          </button>
        </div>
      )}

      <section id="campaign-carousel" className="snap-start h-screen w-full relative bg-section-blue overflow-hidden">
        <div className="h-screen w-full relative">
          <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
            <Carousel 
              setApi={(api) => {
                setCarouselApi(api);
                if (api) {
                  api.on('scroll', () => {
                    const progress = api.scrollProgress();
                    setScrollProgress(progress);
                  });
                }
              }}
              opts={{
                align: "center",
                loop: false,
                dragFree: true,
                duration: 20,
                skipSnaps: false,
              }}
              className="w-full"
            >
              <CarouselContent className="ml-0">
                {/* First slide - mobil-2 with badge overlay */}
                <CarouselItem className="pl-0">
                  <div 
                    className="h-screen relative overflow-hidden cursor-pointer bg-[#5DA2BF]"
                    onClick={() => {
                      setIsFirstSlideClicked(true);
                      setTimeout(() => carouselApi?.scrollNext(), 500);
                    }}
                  >
                    <img 
                      src="/campaigns/mobil-2.png" 
                      alt="Mobile Campaign" 
                      className="w-full h-full transition-all duration-500"
                      style={{
                        objectFit: isFirstSlideClicked ? 'contain' : 'cover',
                        objectPosition: 'left center'
                      }}
                    />
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFirstSlideClicked(true);
                        setTimeout(() => carouselApi?.scrollNext(), 500);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/80 hover:text-white transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
                    </button>
                    
                    {currentSlide > 0 && (
                      <button 
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/80 hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          carouselApi?.scrollPrev();
                        }}
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-0">
                  <div 
                    className="h-screen bg-section-blue flex items-center justify-center cursor-pointer"
                    onClick={() => carouselApi?.scrollNext()}
                  >
                    <img 
                      src="/campaigns/tunnelbana_bilder-2.png" 
                      alt="Tunnelbana Bilder Campaign" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-0">
                  <div 
                    className="h-screen bg-section-blue flex items-center justify-center cursor-pointer"
                    onClick={() => carouselApi?.scrollNext()}
                  >
                    <img 
                      src="/campaigns/tunnelbana_copy-2.png" 
                      alt="Tunnelbana Copy Campaign" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-0">
                  <div 
                    className="h-screen bg-section-blue flex items-center justify-center cursor-pointer"
                    onClick={() => carouselApi?.scrollNext()}
                  >
                    <img 
                      src="/campaigns/takeover_aftonbladet-2.png" 
                      alt="Compricer Campaign" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>

          </div>
        </div>
      </section>

      {/* Empty section showing background video */}
      <section id="carousel-video-spacer" ref={carouselSpacerRef} className="snap-start h-screen w-full relative">
      </section>

      {/* Services Title Section */}
      <section id="services-title" className="snap-start h-screen w-full relative bg-section-blue">
        <BubbleAnimation />
        <div className={`h-screen w-full flex ${isMobile ? 'items-start pt-12' : 'items-center'} justify-start px-6 py-6`}>
          <div className={`w-full ${safariClass}`}>
            {isMobile ? (
              <h1 className="font-clash text-white text-[3.5rem] sm:text-[3.75rem] font-bold leading-[1.05] text-left">
                <span className="block">You don't</span>
                <span className="block">need a big</span>
                <Reveal direction="right" delay={0} repeat as="span" className="block text-[#df3d26]">agency to do</Reveal>
                <Reveal direction="right" delay={100} repeat as="span" className="block text-[#df3d26]">big things.</Reveal>
              </h1>
            ) : (
              <h1 className={`font-clash text-white text-[7rem] lg:text-[9rem] xl:text-[10.5rem] font-bold leading-[0.95] text-left ${isSafari ? 'max-w-[95%]' : ''}`}>
                <span className="block">You don't</span>
                <span className="block">need a big</span>
                <Reveal direction="right" delay={0} repeat as="span" className="block text-[#df3d26]">agency to do</Reveal>
                <Reveal direction="right" delay={100} repeat as="span" className="block text-[#df3d26]">big things.</Reveal>
              </h1>
            )}
          </div>
        </div>
      </section>

      <section id="services-content" className="snap-start h-screen w-full relative bg-section-blue">
        <BubbleAnimation />
        <div className="h-screen w-full px-6 py-12 flex flex-col justify-start">
          <div className="space-y-3 md:space-y-8 max-w-5xl">
          <Reveal direction="left" delay={0} repeat>
            <div>
              <p className="font-clash text-white text-4xl md:text-5xl font-bold mb-6 md:mb-8">
                A small, AI-positive senior team can get big things done for less. Things like:
              </p>
            </div>
          </Reveal>
            
            <Reveal direction="right" delay={0} repeat>
              <p className="font-space text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#df3d26]">→</span> Developing concepts, campaigns, or just a single ad, and producing them when possible.
              </p>
            </Reveal>
            
            <Reveal direction="right" delay={0} repeat>
              <p className="font-space text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#df3d26]">→</span> Leading creatively from initial idea to final delivery.
              </p>
            </Reveal>
            
            <Reveal direction="right" delay={0} repeat>
              <p className="font-space text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#df3d26]">→</span> Acting as a flexible creative partner to marketing departments and in-house agencies.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Empty section showing background video */}
      <section id="services-video-spacer" className="snap-start h-screen w-full relative">
      </section>

      <section id="services-video" className="snap-start h-screen w-full bg-section-blue">
        <div className="h-screen w-full relative overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
            <source src="/services-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      
      <section id="clients-title" className="snap-start h-screen w-full relative bg-section-blue">
        <BubbleAnimation />
        <div className={`h-screen w-full flex ${isMobile ? 'items-start pt-12' : 'items-center'} justify-start px-6 py-6`}>
          <div className={`w-full ${safariClass}`}>
            {isMobile ? <h1 className="font-clash text-white text-[3.5rem] sm:text-[3.75rem] font-bold leading-[1.05] text-left">
                <span className="block">These wise</span>
                <span className="block">clients have</span>
                <Reveal direction="right" delay={0} repeat as="span" className="block text-[#df3d26]">gone for a</Reveal>
                <Reveal direction="right" delay={100} repeat as="span" className="block text-[#df3d26]">dip with us:</Reveal>
              </h1> : <h1 className={`font-clash text-white text-[7rem] lg:text-[9rem] xl:text-[10.5rem] font-bold leading-[0.95] text-left ${isSafari ? 'max-w-[95%]' : ''}`}>
                <span className="block">These wise</span>
                <span className="block">clients have</span>
                <Reveal direction="right" delay={0} repeat as="span" className="block text-[#df3d26]">gone for a</Reveal>
                <Reveal direction="right" delay={100} repeat as="span" className="block text-[#df3d26]">dip with us:</Reveal>
              </h1>}
          </div>
        </div>
      </section>
      
      <section id="clients-content" className="snap-start h-[100svh] md:h-screen w-full relative bg-section-blue">
        <BubbleAnimation />
        <div className="h-[100svh] md:h-screen w-full px-6 flex flex-col justify-center items-center pt-0 md:pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-4xl items-center justify-items-center">
            <Reveal direction="left" delay={0} duration={600} repeat>
              <img src="/clients/compricer-logo.png" alt="Compricer" className="object-contain opacity-90 hover:opacity-100 transition-opacity max-w-full max-h-24 md:max-h-28 animate-float-depth-1 transform-gpu will-change-transform motion-reduce:animate-none" />
            </Reveal>
            <Reveal direction="fadeScale" delay={200} duration={500} repeat>
              <img src="/clients/bekind-logo.png" alt="BE/KIND" className="object-contain opacity-90 hover:opacity-100 transition-opacity max-w-full max-h-24 md:max-h-28 animate-float-depth-2 transform-gpu will-change-transform motion-reduce:animate-none" />
            </Reveal>
            <Reveal direction="fadeScale" delay={400} duration={500} repeat>
              <img src="/clients/eqt-logo.png" alt="EQT" className="object-contain opacity-90 hover:opacity-100 transition-opacity max-w-full max-h-16 md:max-h-20 animate-float-depth-3 transform-gpu will-change-transform motion-reduce:animate-none" />
            </Reveal>
            <Reveal direction="right" delay={600} duration={600} repeat>
              <img src="/clients/momondo-logo.png" alt="Momondo" className="object-contain opacity-90 hover:opacity-100 transition-opacity max-w-full max-h-20 md:max-h-24 animate-float-depth-4 transform-gpu will-change-transform motion-reduce:animate-none" />
            </Reveal>
          </div>
        </div>
      </section>
      <section id="contact-title" className="snap-start h-screen w-full relative bg-section-blue">
        <BubbleAnimation />
        <div className={`h-screen w-full flex ${isMobile ? 'items-start pt-12' : 'items-center'} justify-start px-6 py-6`}>
          <div className={`w-full ${safariClass}`}>
            {isMobile ? <h1 className="font-clash text-white text-[3.5rem] sm:text-[3.75rem] font-bold leading-[1.05] text-left">
                <span className="block">Also want</span>
                <span className="block">to work with</span>
                <Reveal direction="right" delay={0} repeat as="span" className="block text-[#df3d26]">highly awarded*</Reveal>
                <Reveal direction="right" delay={100} repeat as="span" className="block text-[#df3d26]">senior** creatives?</Reveal>
              </h1> : <h1 className={`font-clash text-white text-[7rem] lg:text-[9rem] xl:text-[10.5rem] font-bold leading-[0.95] text-left ${isSafari ? 'max-w-[95%]' : ''}`}>
                <span className="block">Also want</span>
                <span className="block">to work with</span>
                <Reveal direction="right" delay={0} repeat as="span" className="block text-[#df3d26]">awarded senior*</Reveal>
                <Reveal direction="right" delay={100} repeat as="span" className="block text-[#df3d26]">creatives?</Reveal>
              </h1>}
          </div>
        </div>
      </section>
      <section id="contact" className="snap-start h-screen w-full relative bg-section-blue">
        <BubbleAnimation />
        <div className="h-screen w-full px-6 py-12 flex flex-col justify-start">
          <div className="space-y-3 md:space-y-8 max-w-5xl">
            <div>
              <p className="font-space text-lg md:text-3xl leading-tight text-white">
                +46 70 492 00 08 · info@nofish.se
              </p>
            </div>
            
            <div className="font-space text-white/60 text-sm md:text-base leading-relaxed max-w-4xl">
              <p>*Have been recognized over 80 times at award shows such as Cannes Lions, Eurobest, Epica, The One Show, Clio, New York Festivals, Webbys, and Guldägget. Over 20 years of experience as a Creative Director/Copywriter and Art Director, working at agencies such as KING, Naked, and M&amp;C Saatchi, for clients including Clas Ohlson, ICA, Com Hem, Nike, Adidas, Cloetta, Taxi Stockholm, the Red Cross Sweden, and Aftonbladet.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="work-video" className="snap-start h-screen w-full bg-section-blue">
        <div className="h-screen w-full relative overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
            <source src="/work-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>;
};
const App = () => <Layout>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/index" element={<Index />} />
      <Route path="/protected-videos" element={<ProtectedVideos />} />
      <Route path="/work" element={<Work />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>;
export default App;