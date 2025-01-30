import { Link } from 'react-router-dom';

const Work = () => {
  return (
    <div className="min-h-screen px-6 py-20">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Our Work</h1>
        <div className="wave-bg h-1 w-24 mb-8" />
        
        <p className="text-lg md:text-xl mb-12">
          We're multi-awarded creatives with backgrounds at some of Sweden's top agencies. 
          We've developed omni-channel concepts and campaigns for both Swedish and international brands.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-6">Current clients include:</h2>
        <p className="text-lg mb-12">Momondo and Compricer.</p>

        <p className="text-lg italic mb-12">References available upon request.</p>

        <Link 
          to="/contact"
          className="inline-block text-2xl md:text-3xl font-bold hover:text-primary transition-colors"
        >
          Let's Talk
          <div className="wave-bg h-1 w-full mt-2" />
        </Link>
      </section>
    </div>
  );
};

export default Work;