
const Intro = () => {
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

      <section className="px-6 absolute bottom-12 md:bottom-16">
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mb-4 text-white text-balance">
          Creative advertising. Freed from the fishy layers of an agency.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-white text-balance">
          We only sell creativity. Nothing more, nothing less. You pay for what you need and get advice without hidden agendas.
        </p>
        <div className="wave-bg h-1 w-24 mt-8" />
      </section>
    </div>
  );
};

export default Intro;
