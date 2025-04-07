
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Services from "./pages/Services";
import ProtectedVideos from "./pages/ProtectedVideos";

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={
        <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
          {/* Home section */}
          <section id="home" className="snap-start h-screen w-full">
            <Home />
          </section>
          
          {/* About sections - now split into two consecutive snap sections */}
          <section id="about-title" className="snap-start h-screen w-full overflow-hidden">
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
          <section id="about-content" className="snap-start h-screen w-full overflow-hidden">
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
          </section>
          
          {/* Services sections - now split into two consecutive snap sections */}
          <section id="services-title" className="snap-start h-screen w-full overflow-hidden">
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
          <section id="services-content" className="snap-start h-screen w-full overflow-hidden">
            <div className="h-screen w-full bg-black px-6 py-12 flex flex-col justify-start">
              <div className="space-y-8 max-w-5xl">
                <div>
                  <p className="font-space text-white text-2xl md:text-3xl leading-tight">
                    → Acting as a flexible creative partner to marketing departments and in-house agencies.
                  </p>
                </div>
                
                <div>
                  <p className="font-space text-white text-2xl md:text-3xl leading-tight">
                    → Developing concepts, campaigns or just a single ad, and producing them when possible.
                  </p>
                </div>
                
                <div>
                  <p className="font-space text-white text-2xl md:text-3xl leading-tight">
                    → Leading creatively from initial idea to final delivery.
                  </p>
                </div>
                
                <div>
                  <p className="font-space text-white text-2xl md:text-3xl leading-tight">
                    → In a way you might have thought of that we haven't?
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Work sections - now split into two consecutive snap sections */}
          <section id="work-title" className="snap-start h-screen w-full">
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
          <section id="work-content" className="snap-start h-screen w-full">
            <div className="h-screen w-full flex flex-col justify-start pt-12 px-6">
              <div className="max-w-3xl">
                <p className="font-space text-white text-xl md:text-2xl leading-tight mb-8 text-left">
                  We and our current clients are soon ready to show what we've been working on. In the meantime, know that the work we'll be doing is backed by years of experience as award-winning creatives, developing ideas and campaigns for some of Sweden's biggest brands across all kinds of channels, formats and industries.
                </p>
                
                <p className="font-space text-white text-xl md:text-2xl leading-tight mb-10 text-left">
                  Curious about us or what's possible with AI? Email us at hello@nofish.se.
                </p>
                
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 max-w-md">
                  <div className="flex-1">
                    <input 
                      type="password" 
                      placeholder="Enter password"
                      className="w-full bg-white/20 text-white placeholder:text-white/50 border-none focus:ring-white/30 px-3 py-2 rounded"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-[#5CE1E6] text-black hover:bg-[#5CE1E6]/80 transition-colors px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      } />
      <Route path="/protected-videos" element={<ProtectedVideos />} />
      <Route path="/work" element={<Work />} />
    </Routes>
  </Layout>
);

export default App;
