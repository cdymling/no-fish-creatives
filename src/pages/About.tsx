
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen relative bg-[#FEC6A1]">
      <section className="px-6 min-h-screen flex items-center">
        <div className="py-8">
          <h2 className="text-lg md:text-xl font-bold mb-1 text-foreground">What we sell:</h2>
          <p className="text-base max-w-2xl mb-6 text-foreground">
            The senior-level creativity you'd find at an agency, without paying for all the extras that come with it.
          </p>

          <h2 className="text-lg md:text-xl font-bold mb-1 text-foreground">How we help:</h2>
          <div className="space-y-1 max-w-2xl">
            <p className="text-base text-foreground">
              → Acting as a flexible creative partner for marketing departments and in-house agencies.
            </p>
            <p className="text-base text-foreground">
              → Developing concepts, campaigns, or just a single ad.
            </p>
            <p className="text-base text-foreground">
              → Leading creatively from initial idea to final delivery.
            </p>
            <p className="text-base text-foreground">
              → Connecting you with trusted specialists in strategy, design, or production when the project needs it.
            </p>
          </div>

          <h2 className="text-lg md:text-xl font-bold mb-1 text-foreground mt-6">Why choose us:</h2>
          <p className="text-base max-w-2xl mb-6 text-foreground">
            You don't need a big agency to do big things. With a small, experienced team, you can accomplish more than you might think, faster, simpler, and more cost-effectively.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
