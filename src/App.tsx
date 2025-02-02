import Layout from "./components/Layout";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

const App = () => (
  <Layout>
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <section id="home" className="snap-start h-screen overflow-y-scroll">
        <Home />
      </section>
      <section id="intro" className="snap-start h-screen overflow-y-scroll">
        <Intro />
      </section>
      <section id="about" className="snap-start h-screen overflow-y-scroll">
        <About />
      </section>
      <section id="work" className="snap-start h-screen overflow-y-scroll">
        <Work />
      </section>
      <section id="contact" className="snap-start h-screen overflow-y-scroll">
        <Contact />
      </section>
    </div>
  </Layout>
);

export default App;
