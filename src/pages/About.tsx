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

      <div className="fixed top-6 left-6">
        <span className="font-clash text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">no fish creatives</span>
      </div>

      <section className="px-6 min-h-screen flex items-center">
        <div className="py-16">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">Who we're for:</h2>
          <p className="text-lg max-w-2xl mb-8 text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">
            Marketer seeking a collaborative, fast-paced, AI-positive, and cost-effective creative consultancy.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">How you can use us:</h2>
          <div className="space-y-1.5 max-w-2xl">
            <p className="text-lg text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">
              → As a creative partner for your in-house agency or marketing department.
            </p>
            <p className="text-lg text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">
              → As a creative team developing a concept, campaign, or just a single ad.
            </p>
            <p className="text-lg text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">
              → As a creative lead, taking the above from inception to final production.
            </p>
            <p className="text-lg text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">
              → If the task demands it, we're connected with experts in strategy, design, and production.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;