import { ArrowRight, Mail, Phone } from 'lucide-react';

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
          className="absolute min-w-full min-h-full object-cover md:object-center object-[70%_center]"
        >
          <source src="/home-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-background/99" />
      </div>

      {/* Content */}
      <section className="px-6 py-20 md:py-32 text-white">
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mb-8 text-balance">
          Seasoned creatives. Free from the fishy layers of an agency.
        </h1>
        <div className="wave-bg h-1 w-24 mb-8" />
        <p className="text-lg md:text-xl max-w-2xl mb-12 text-balance">
          We only sell creativity. Nothing more, nothing less. You pay for what you need and get advice without hidden agendas.
        </p>
      </section>

      <section className="px-6 py-20 wave-bg">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-white">Who we're for:</h2>
        <p className="text-lg max-w-2xl mb-12 text-white">
          Marketer seeking a collaborative, fast-paced, ai-positive, and cost-effective creative consultancy.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mb-8 text-white">How you can use us:</h2>
        <div className="space-y-6 max-w-2xl">
          <p className="text-lg text-white font-space">
            - Partner with us to enhance your in-house agency or marketing team's creative capabilities.
          </p>
          <p className="text-lg text-white font-space">
            - Collaborate with our creative team to develop innovative concepts, campaigns, or individual advertisements.
          </p>
          <p className="text-lg text-white font-space">
            - Let us guide your projects from initial concept through to final production as your creative lead.
          </p>
          <p className="text-lg text-white font-space">
            - Access our network of specialized experts in strategy, design, and production when your project requires it.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 text-white">
        <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mb-8 text-balance">
          Our work:
        </h2>
        <div className="wave-bg h-1 w-24 mb-8" />
        <p className="text-lg md:text-xl max-w-2xl mb-12 text-balance">
          Hold tight while we get this show on the road and get some cases to show for it. In the meantime, know that we're AI-positive, multi-awarded creatives with backgrounds at some of Sweden's top agencies, developing omni-channel concepts and campaigns for both Swedish and international brands.
        </p>
        <p className="text-lg max-w-2xl mb-2">
          Current clients include Momondo, Compricer, and Happy Golfer. References available upon request.
        </p>
      </section>

      <section className="px-6 py-12 text-white">
        <div className="space-y-4">
          <a 
            href="mailto:christoffer@nofish.se" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Mail size={20} />
            christoffer@nofish.se
          </a>
          <a 
            href="tel:+46704920008" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Phone size={20} />
            +46 70 492 00 08
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;