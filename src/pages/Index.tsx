import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Video */}
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
        {/* Overlay to ensure text readability - opacity set to 99 */}
        <div className="absolute inset-0 bg-background/99" />
      </div>

      {/* Content */}
      <section className="px-6 py-20 md:py-32 text-white">
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mb-8 text-balance">
          Access to seasoned creatives, without the fishy layers of an agency.
        </h1>
        <div className="wave-bg h-1 w-24 mb-8" />
        <p className="text-lg md:text-xl max-w-2xl mb-12 text-balance">
          We only sell creativity. Nothing more, nothing less. You pay for what you need and get advice without hidden agendas.
        </p>
      </section>

      <section className="px-6 py-20 bg-accent/95">
        <h2 className="text-xl md:text-2xl font-bold mb-8">Who we're for:</h2>
        <p className="text-lg max-w-2xl mb-12">
          Marketers who believe in creative communications and are open to a different agency setup.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mb-8">How you can use us:</h2>
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
          <p className="text-lg flex items-start gap-4">
            <ArrowRight className="mt-1 flex-shrink-0" />
            <span>If the task demands it, we're connected with experts in strategy, design, and production.</span>
          </p>
        </div>
      </section>

      <section className="px-6 py-20 text-white">
        <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mb-8 text-balance">
          We're multi-awarded creatives with backgrounds at some of Sweden's top agencies.
        </h2>
        <div className="wave-bg h-1 w-24 mb-8" />
        <p className="text-lg md:text-xl max-w-2xl mb-12 text-balance">
          We've developed omni-channel concepts and campaigns for both Swedish and international brands.
        </p>
        <h3 className="text-xl md:text-2xl font-bold mb-8">Current clients include:</h3>
        <p className="text-lg max-w-2xl mb-12">
          Momondo, Compricer and Happy Golfer.
        </p>
        <p className="text-lg italic">
          References available upon request.
        </p>
      </section>
    </div>
  );
};

export default Index;