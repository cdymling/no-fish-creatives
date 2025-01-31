const Home = () => {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover scale-[1.5] md:scale-100 md:object-center object-[70%_center]"
        >
          <source src="/home-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-background/99" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white font-clash">
          no fish creatives
        </h1>
      </div>

      <div className="fixed top-6 left-6">
        <span className="font-clash text-white">no fish creatives</span>
      </div>
    </div>
  );
};

export default Home;