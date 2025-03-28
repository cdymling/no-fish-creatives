const About = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover md:object-center object-[55%_center]"
        >
          <source src="/about-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-background/99" />
      </div>

      <section className="px-6 min-h-screen flex items-center">
        <div className="py-16">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">What we sell:</h2>
          <p className="text-lg max-w-2xl mb-8 text-white">
            Only creativity. Nothing more, nothing less. Pay for what you need and get advice without hidden agendas.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Who we're for:</h2>
          <p className="text-lg max-w-2xl mb-8 text-white">
            Marketers seeking a collaborative, ambitious, AI-positive, and cost-effective creative consultancy.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">How we can help:</h2>
          <div className="space-y-1.5 max-w-2xl">
            <p className="text-lg text-white">
              → Being a creative partner for an in-house agency or marketing department.
            </p>
            <p className="text-lg text-white">
              → Developing a concept, campaign, or just a single ad.
            </p>
            <p className="text-lg text-white">
              → Leading the creative process from idea to execution.
            </p>
            <p className="text-lg text-white">
              → If the task demands it, we're connected with experts in strategy, design, and production.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
