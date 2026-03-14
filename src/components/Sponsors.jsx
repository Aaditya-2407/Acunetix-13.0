import React, { forwardRef } from 'react';
import TiltedCard from './TiltedCard';
import LightRays from './LightRays';

const sponsors = [
  {
    image: 'https://placehold.co/300x300/1a1a1a/00ffc8?text=Sponsor+1',
    name: 'Sponsor 1',
  },
  {
    image: 'https://placehold.co/300x300/1a1a1a/00ffc8?text=Sponsor+2',
    name: 'Sponsor 2',
  },
  {
    image: 'https://placehold.co/300x300/1a1a1a/00ffc8?text=Sponsor+3',
    name: 'Sponsor 3',
  },
];

const Sponsors = forwardRef((props, ref) => {
  return (
    <section ref={ref} id="sponsors" className="min-h-screen relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* LightRays background */}
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffc8"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2
          className="font-black uppercase tracking-wider text-center mb-16"
          style={{ fontFamily: "'VerminVibes', 'Orbitron', sans-serif", fontSize: 'clamp(2rem, 6vw, 4rem)' }}
        >
          <span className="text-white">Our Sponsors</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 lg:gap-10 place-items-center">
          {sponsors.map((sponsor, i) => (
            <TiltedCard
              key={i}
              imageSrc={sponsor.image}
              altText={sponsor.name}
              captionText={sponsor.name}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip
              displayOverlayContent
              overlayContent={
                <p className="text-white text-lg font-bold px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm mt-[250px]">
                  {sponsor.name}
                </p>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';
export default Sponsors;
