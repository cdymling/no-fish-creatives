import { Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen px-6 py-20">
      <h1 className="text-4xl md:text-6xl font-bold mb-12">Let's talk.</h1>
      <div className="space-y-6">
        <a 
          href="mailto:christoffer@nofish.se" 
          className="flex items-center gap-4 text-lg md:text-xl hover:text-primary transition-colors"
        >
          <Mail size={24} />
          christoffer@nofish.se
        </a>
        <a 
          href="tel:+1234567890" 
          className="flex items-center gap-4 text-lg md:text-xl hover:text-primary transition-colors"
        >
          <Phone size={24} />
          +1 (234) 567-890
        </a>
      </div>
    </div>
  );
};

export default Contact;