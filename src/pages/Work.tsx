const Work = () => {
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
          <source src="/work-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-background/99" />
      </div>

      <div className="fixed top-6 left-6">
        <span className="font-clash text-white">no fish creatives</span>
      </div>

      <section className="px-6 py-12 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white text-balance">
          Our work:
        </h1>
        <div className="wave-bg h-1 w-24 mb-6" />
        <p className="text-lg md:text-xl mb-8 text-white text-balance max-w-2xl">
          Hold tight while we get this show on the road and get some cases to show for it. In the meantime, know that we're AI-positive, multi-awarded creatives with backgrounds at some of Sweden's top agencies, developing omni-channel concepts and campaigns for both Swedish and international brands.
        </p>
        <p className="text-lg text-white max-w-2xl">
          Current clients include Momondo, Compricer, and Happy Golfer. References available upon request.
        </p>
      </section>
    </div>
  );
};

export default Work;