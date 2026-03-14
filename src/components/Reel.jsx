import React from "react";
import video1 from "../assets/Reel-Acunetix5.mp4";
import video2 from "../assets/Reel-Acunetix6.mp4";
import video3 from "../assets/Reel-Acunetix7.mp4";

function Reel() {
  return (
    <section
      className="relative min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, rgba(0,255,200,0.18) 0%, rgba(0,255,200,0.06) 70%, #000 80%)" }}
    >
      <div className="relative z-10  max-w-7xl mx-auto px-4">
        <h2
          className="font-black uppercase tracking-wider text-center whitespace-nowrap"
          style={{ fontFamily: "'VerminVibes', 'Orbitron', sans-serif", fontSize: 'clamp(1.4rem, 5.5vw, 4rem)' }}
        >
          <span className="text-white">Carrying our Legacy </span>
          
        </h2>

        <div className="flex overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:overflow-visible">
          {/* First Reel */}
          <a
          href="https://www.instagram.com/acunetix.dit/reel/DHblKP0qE4C/"
            
            target="_blank"
            rel="noopener noreferrer"
            className="group relative shrink-0 w-[78vw] max-w-85 sm:w-[60vw] md:w-full md:max-w-none mr-4 md:mr-0 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "9 / 16" }}>
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={video1}
                 type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </a>

          {/* Second Reel */}
          <a
            href="https://www.instagram.com/acunetix.dit/reel/DHeK-3ISMWk/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative shrink-0 w-[78vw] max-w-85 sm:w-[60vw] md:w-full md:max-w-none mr-4 md:mr-0 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "9 / 16" }}>
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={video2}
                 type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </a>

          {/* Third Reel */}
          <a
            
            href="https://www.instagram.com/acunetix.dit/reel/DHdYGQDKG0E/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative shrink-0 w-[78vw] max-w-85 sm:w-[60vw] md:w-full md:max-w-none mr-4 md:mr-0 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "9 / 16" }}>
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={video3}
                 type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Reel;
