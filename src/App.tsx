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

const MainPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth">
      <section id="home" className="snap-start h-screen w-full">
        <Home />
      </section>
      
      <section id="about-title" className="snap-start h-screen w-full bg-black relative z-10">
        <div className={`h-screen w-full flex ${isMobile ? 'items-start pt-12' : 'items-center'} justify-start px-6 py-6`}>
          <div className="w-full heading-container">
            {isMobile ? (
              <h1 className="font-clash text-white text-[3.75rem] font-bold leading-[1.1] text-left safari-heading">
                <span className="block">Creative</span>
                <span className="block">work.</span>
                <span className="block">Freed from</span>
                <span className="block">the <span className="text-[#5CE1E6]">fishy</span></span>
                <span className="block text-[#5CE1E6]">layers of</span>
                <span className="block text-[#5CE1E6]">an agency.</span>
              </h1>
            ) : (
              <h1 className="font-clash text-white text-[7rem] lg:text-[8rem] xl:text-[10rem] font-bold leading-[0.95] text-left safari-heading">
                <span className="block">Creative work.</span>
                <span className="block">Freed from the</span>
                <span className="block text-[#5CE1E6]">fishy layers</span>
                <span className="block text-[#5CE1E6]">of an agency.</span>
              </h1>
            )}
          </div>
        </div>
      </section>
      
      <section id="about-content" className="snap-start h-screen w-full bg-black">
        <div className="h-screen w-full bg-black px-6 py-12 flex flex-col justify-start">
          <h2 className="font-clash text-white text-4xl md:text-5xl font-bold mb-8">
            Here's how:
          </h2>
          
          <div className="space-y-3 md:space-y-12 max-w-5xl">
            <div>
              <p className="font-clash text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#5CE1E6] font-bold">#1</span> We let you work directly with senior creatives, the kind you'd normally find at a big, highly awarded agency. Just without the extra layers of people, processes and up-selling.
              </p>
            </div>
            
            <div>
              <p className="font-clash text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#5CE1E6] font-bold">#2</span> We're smart about production. When it makes sense, we do it ourselves, using AI or taking on tasks like directing and editing.
              </p>
            </div>
            
            <div>
              <p className="font-clash text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#5CE1E6] font-bold">#3</span> We team up with specialists in strategy, design, and production only when needed, avoiding overlapping roles and making sure you only pay for what you need, when you need it.
              </p>
            </div>
          </div>
        </div>
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
      
      <section id="services-title" className="snap-start h-screen w-full bg-black">
        <div className={`h-screen w-full flex ${isMobile ? 'items-start pt-12' : 'items-center'} justify-start px-6 py-6`}>
          <div className="w-full heading-container">
            {isMobile ? (
              <h1 className="font-clash text-white text-[3.75rem] font-bold leading-[1.1] text-left safari-heading">
                <span className="block">You don't</span>
                <span className="block">need a</span>
                <span className="block">big agency</span>
                <span className="block text-[#5CE1E6]">to do</span>
                <span className="block text-[#5CE1E6]">big things.</span>
              </h1>
            ) : (
              <h1 className="font-clash text-white text-[7rem] lg:text-[8rem] xl:text-[10rem] font-bold leading-[0.95] text-left safari-heading">
                <span className="block">You don't need</span>
                <span className="block">a big agency</span>
                <span className="block text-[#5CE1E6]">to do</span>
                <span className="block text-[#5CE1E6]">big things.</span>
              </h1>
            )}
          </div>
        </div>
      </section>
      <section id="services-content" className="snap-start h-screen w-full bg-black">
        <div className="h-screen w-full bg-black px-6 py-12 flex flex-col justify-start">
          <div className="space-y-3 md:space-y-8 max-w-5xl">
            <div>
              <p className="font-clash text-white text-4xl md:text-5xl font-bold mb-6 md:mb-8">
                A small, AI-positive senior team can get big things done for less. Things like:
              </p>
            </div>
            
            <div>
              <p className="font-space text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#5CE1E6]">→</span> Developing concepts, campaigns, or just a single ad, and producing them when possible.
              </p>
            </div>
            
            <div>
              <p className="font-space text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#5CE1E6]">→</span> Leading creatively from initial idea to final delivery.
              </p>
            </div>
            
            <div>
              <p className="font-space text-lg md:text-3xl leading-tight text-white">
                <span className="text-[#5CE1E6]">→</span> Acting as a flexible creative partner to marketing departments and in-house agencies.
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
      
      <section id="work-title" className="snap-start h-screen w-full bg-black">
        <div className={`h-screen w-full flex ${isMobile ? 'items-start pt-12' : 'items-center'} justify-start px-6 py-6`}>
          <div className="w-full heading-container">
            {isMobile ? (
              <h1 className="font-clash text-white text-[3.75rem] font-bold leading-[1.1] text-left safari-heading">
                <span className="block">Hold tight</span>
                <span className="block">while we</span>
                <span className="block">get this</span>
                <span className="block text-[#5CE1E6]">show on</span>
                <span className="block text-[#5CE1E6]">the road.</span>
              </h1>
            ) : (
              <h1 className="font-clash text-white text-[7rem] lg:text-[8rem] xl:text-[10rem] font-bold leading-[0.95] text-left safari-heading">
                <span className="block">Hold tight</span>
                <span className="block">while we get</span>
                <span className="block text-[#5CE1E6]">this show</span>
                <span className="block text-[#5CE1E6]">on the road.</span>
              </h1>
            )}
          </div>
        </div>
      </section>
      <section id="work-content" className="snap-start h-screen w-full bg-black">
        <div className="h-screen w-full flex flex-col justify-start pt-12 px-6">
          <div className="max-w-3xl">
            <h2 className="font-clash text-white text-4xl md:text-5xl font-bold mb-8">
              Well, this is embarrassing.
            </h2>
            
            <p className="font-space text-lg md:text-2xl leading-tight mb-4 md:mb-8 text-left text-white">
              There's nothing to see here just yet. But fear not, we'll soon be sharing our first work created with this setup.
            </p>
            
            <p className="font-space text-lg md:text-2xl leading-tight mb-4 md:mb-8 text-left text-white">
              Until then, it might be good to know that the work we've previously done is award-winning stuff for some of Sweden's biggest brands, across all kinds of channels, formats and industries.
            </p>
            
            <p className="font-space text-lg md:text-2xl leading-tight mb-6 md:mb-10 text-left text-white">
              Curious about us or what's possible with AI?
              Email us at hello@nofish.se.
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
      <Route path="/index" element={<Index />} />
      <Route path="/protected-videos" element={<ProtectedVideos />} />
      <Route path="/work" element={<Work />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
);

export default App;
