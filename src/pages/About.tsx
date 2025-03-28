
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen relative bg-[#FEC6A1]">
      <section className="px-6 min-h-screen flex items-center">
        <div className="py-16">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground">What we sell:</h2>
          <p className="text-lg max-w-2xl mb-8 text-foreground">
            Only creativity. Nothing more, nothing less. Pay for what you need and get advice without hidden agendas.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground">Who we're for:</h2>
          <p className="text-lg max-w-2xl mb-8 text-foreground">
            Marketers seeking a collaborative, ambitious, AI-positive, and cost-effective creative consultancy.
          </p>

          <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground">How we can help:</h2>
          <div className="space-y-1.5 max-w-2xl">
            <p className="text-lg text-foreground">
              → Being a creative partner for an in-house agency or marketing department.
            </p>
            <p className="text-lg text-foreground">
              → Developing a concept, campaign, or just a single ad.
            </p>
            <p className="text-lg text-foreground">
              → Leading the creative process from idea to execution.
            </p>
            <p className="text-lg text-foreground">
              → If the task demands it, we're connected with experts in strategy, design, and production.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
