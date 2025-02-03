const Services = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover md:object-center object-[70%_center]"
        >
          <source src="/intro-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-background/99" />
      </div>

      <section className="px-6 py-20">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-white">Who we're for:</h2>
        <p className="text-lg md:text-xl max-w-2xl mb-12 text-white">
          Marketer seeking a collaborative, fast-paced, ai-positive,{' '}
          <br />and cost-effective creative consultancy.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mb-8 text-white">How you can use us:</h2>
        <div className="space-y-6 max-w-2xl">
          <p className="text-lg md:text-xl text-white font-space">
            - Partner with us to enhance your in-house agency or marketing team's creative capabilities.
          </p>
          <p className="text-lg md:text-xl text-white font-space">
            - Collaborate with our creative team to develop innovative concepts, campaigns, or individual advertisements.
          </p>
          <p className="text-lg md:text-xl text-white font-space">
            - Let us guide your projects from initial concept through to final production as your creative lead.
          </p>
          <p className="text-lg md:text-xl text-white font-space">
            - Access our network of specialized experts in strategy, design, and production when your project requires it.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Services;