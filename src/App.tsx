
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

const App = () => (
  <Layout>
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <section id="home" className="snap-start h-screen w-full">
        <Home />
      </section>
      <section id="about" className="snap-start h-screen w-full">
        <About />
      </section>
      <section id="work" className="snap-start h-screen w-full">
        <Work />
      </section>
      <section id="contact" className="snap-start h-screen w-full">
        <Contact />
      </section>
    </div>
  </Layout>
);

export default App;
