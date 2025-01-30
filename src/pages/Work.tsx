const Work = () => {
  return (
    <div className="min-h-screen">
      <section className="px-6 py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-8 text-balance">
          We're multi-awarded creatives with backgrounds at some of Sweden's top agencies.
        </h1>
        <div className="wave-bg h-1 w-24 mb-8" />
        <p className="text-lg md:text-xl max-w-2xl mb-12 text-balance">
          We've developed omni-channel concepts and campaigns for both Swedish and international brands.
        </p>
      </section>

      <section className="px-6 py-20 bg-accent">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Current clients include:</h2>
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

export default Work;