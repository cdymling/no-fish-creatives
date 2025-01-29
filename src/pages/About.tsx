import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen px-6 py-20">
      <section className="mb-20">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-8 text-balance">
          Get access to seasoned creatives – without all the fishy layers of an ad agency.
        </h1>
        <div className="wave-bg h-1 w-24 mb-8" />
        <p className="text-lg md:text-xl max-w-2xl mb-12 text-balance">
          We only sell creativity. But if the task demands it, we're connected with experts in strategy, 
          design, and production. This way, you'll only pay for what you need – and get more unbiased advice.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">How you can use us:</h2>
        <div className="space-y-6 max-w-2xl">
          <p className="text-lg flex items-start gap-4">
            <ArrowRight className="mt-1 flex-shrink-0" />
            <span>As a creative partner for your in-house agency or marketing department.</span>
          </p>
          <p className="text-lg flex items-start gap-4">
            <ArrowRight className="mt-1 flex-shrink-0" />
            <span>As a creative team developing a concept, campaign, or just a single ad.</span>
          </p>
          <p className="text-lg flex items-start gap-4">
            <ArrowRight className="mt-1 flex-shrink-0" />
            <span>As a creative lead, taking the above from inception to final production.</span>
          </p>
        </div>
      </section>

      <section>
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

export default About;