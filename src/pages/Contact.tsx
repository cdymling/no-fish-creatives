
import { Mail } from 'lucide-react';

const Contact = () => {
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
          <source src="/contact-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-background/99" />
      </div>

      <section className="px-6 py-20">
        <div className="space-y-4">
          <a 
            href="mailto:hello@nofish.se" 
            className="flex items-center gap-2 text-white hover:text-primary transition-colors"
          >
            <Mail size={20} />
            hello@nofish.se
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
