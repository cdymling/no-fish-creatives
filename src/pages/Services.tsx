const Services = () => {
  return (
    <div className="relative h-full w-full">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/services-background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-white text-lg">Discover what we can do for you</p>
        </div>
      </div>
    </div>
  );
};

export default Services;