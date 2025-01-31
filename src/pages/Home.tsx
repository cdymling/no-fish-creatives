const Home = () => {
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
      </div>

      {/* Logo centered */}
      <div className="flex items-center justify-center h-screen">
        <span className="font-clash text-white text-3xl">no fish creatives</span>
      </div>
    </div>
  );
};

export default Home;