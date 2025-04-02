
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen relative bg-[#FEC6A1]">
      <section className="px-6 min-h-screen flex items-center">
        <div className="py-8 max-w-3xl">
          <h2 className="text-lg md:text-xl font-bold mb-2 text-foreground">What we sell</h2>
          <p className="text-base mb-6 text-foreground">
            We make it easier to buy high level creative advertising.
          </p>

          <h2 className="text-lg md:text-xl font-bold mb-2 text-foreground">Here's how:</h2>
          <ol className="list-decimal pl-5 space-y-3 mb-6">
            <li className="text-base text-foreground">
              We stripped the team down to the essentials. You work directly with senior creatives. The kind you'd normally find at a big, highly awarded creative agency. Just without all the layers (and costs) that usually come with one.
            </li>
            <li className="text-base text-foreground">
              We've streamlined the production. In many cases, we handle it ourselves, using AI or take on directing and editing, where it makes sense.
            </li>
          </ol>

          <p className="text-base mb-6 text-foreground">
            This means you don't need a big agency to do big things. With a small, AI-positive, senior team, you can get more done than you'd think. Faster, smoother, and for less.
          </p>

          <h2 className="text-lg md:text-xl font-bold mb-2 text-foreground">How we help</h2>
          <div className="space-y-2 max-w-2xl">
            <p className="text-base text-foreground">
              → Acting as a flexible creative partner to marketing departments and in-house agencies.
            </p>
            <p className="text-base text-foreground">
              → Developing concepts, campaigns or just a single ad.
            </p>
            <p className="text-base text-foreground">
              → Leading creatively from initial idea to final delivery.
            </p>
            <p className="text-base text-foreground">
              → Producing in-house, using AI where it makes sense.
            </p>
            <p className="text-base text-foreground">
              → Taking on directing and editing for select film projects.
            </p>
            <p className="text-base text-foreground">
              → Connecting you with trusted specialists in strategy, design or production when needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
