
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ProtectedVideos from "./pages/ProtectedVideos";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
            <section id="home" className="snap-start h-screen w-full">
              <Home />
            </section>
            <section id="about" className="snap-start h-screen w-full">
              <About />
            </section>
            <section id="services" className="snap-start h-screen w-full">
              <Services />
            </section>
            <section id="work" className="snap-start h-screen w-full">
              <Work />
            </section>
            <section id="contact" className="snap-start h-screen w-full">
              <Contact />
            </section>
          </div>
        } />
        <Route path="/protected-videos" element={<ProtectedVideos />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </Layout>
  );
};

export default App;
