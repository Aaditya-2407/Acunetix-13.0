import React, { forwardRef, useState, useRef, useCallback } from 'react';
import cardSvg from '../assets/card.svg';
import chessFloor from '../assets/chess-floor.avif';
import reel3 from '../assets/Reel-Acunetix3.mp4';
import reel4 from '../assets/Reel-Acunetix4.mp4';
import reel5 from '../assets/Reel-Acunetix5.mp4';
import reel6 from '../assets/Reel-Acunetix6.mp4';
import reel7 from '../assets/Reel-Acunetix7.mp4';

import c10clubs from '../assets/cards/10_of_clubs.svg';
import c10diamonds from '../assets/cards/10_of_diamonds.svg';
import c10hearts from '../assets/cards/10_of_hearts.svg';
import c2clubs from '../assets/cards/2_of_clubs.svg';
import c2diamonds from '../assets/cards/2_of_diamonds.svg';
import c2hearts from '../assets/cards/2_of_hearts.svg';
import c3hearts from '../assets/cards/3_of_hearts.svg';
import c5spades from '../assets/cards/5_of_spades.svg';
import cAceClubs from '../assets/cards/ace_of_clubs.svg';
import cJackDiamonds from '../assets/cards/jack_of_diamonds.svg';
import cKingHearts from '../assets/cards/king_of_hearts.svg';
import cQueenSpades from '../assets/cards/queen_of_spades.svg';

const allCards = [
  c10clubs, c10diamonds, c10hearts, c2clubs, c2diamonds, c2hearts,
  c3hearts, c5spades, cAceClubs, cJackDiamonds, cKingHearts, cQueenSpades,
];

const reelVideos = [
  { id: 1, src: reel3, label: 'Acunetix 3' },
  { id: 2, src: reel4, label: 'Acunetix 4' },
  { id: 3, src: reel5, label: 'Acunetix 5' },
  { id: 4, src: reel6, label: 'Acunetix 6' },
  { id: 5, src: reel7, label: 'Acunetix 7' },
];

const floatingBgCards = [
  { card: 0,  top: '5%',  left: '5%',  size: 50,  rX: -30, rY: 25,  rZ: -15, floatX: 15,  floatY: -20, dur: '9s',  delay: '0s' },
  { card: 3,  top: '10%', left: '78%', size: 40,  rX: 35,  rY: -20, rZ: 30,  floatX: -12, floatY: 16,  dur: '11s', delay: '1s' },
  { card: 6,  top: '35%', left: '88%', size: 38,  rX: -35, rY: 45,  rZ: -10, floatX: 14,  floatY: -12, dur: '10s', delay: '2.5s' },
  { card: 8,  top: '55%', left: '3%',  size: 48,  rX: 25,  rY: -40, rZ: 15,  floatX: -14, floatY: 18,  dur: '12s', delay: '0.8s' },
  { card: 10, top: '70%', left: '60%', size: 44,  rX: -40, rY: 20,  rZ: -35, floatX: 10,  floatY: -16, dur: '10s', delay: '3.5s' },
  { card: 11, top: '82%', left: '15%', size: 35,  rX: 15,  rY: -30, rZ: 25,  floatX: -10, floatY: 12,  dur: '11s', delay: '1.8s' },
  { card: 5,  top: '48%', left: '45%', size: 32,  rX: -20, rY: 35,  rZ: -25, floatX: 8,   floatY: -14, dur: '9s',  delay: '4s' },
];

const CARD_COUNT = reelVideos.length;
const ANGLE_STEP = 360 / CARD_COUNT;

const Reel = forwardRef((props, ref) => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const videoRefs = useRef({});

  const handleCardTap = useCallback((id) => {
    setIsPaused(true);
    if (activeCard === id) {
      // Second tap — pause & deselect
      const vid = videoRefs.current[id];
      if (vid) { vid.pause(); vid.currentTime = 0; }
      setActiveCard(null);
      setIsPaused(false);
    } else {
      // Pause any previously playing video
      if (activeCard != null) {
        const prev = videoRefs.current[activeCard];
        if (prev) { prev.pause(); prev.currentTime = 0; }
      }
      // Play the tapped card's video
      setActiveCard(id);
      const vid = videoRefs.current[id];
      if (vid) {
        vid.load();
        vid.play().catch(() => {});
      }
    }
  }, [activeCard]);

  const handleCardLeave = useCallback(() => {
    if (activeCard == null) setIsPaused(false);
  }, [activeCard]);

  // Click on background (not on a card) → stop video & resume rotation
  const handleSectionClick = useCallback((e) => {
    if (e.target.closest('[data-card]')) return;
    if (activeCard != null) {
      const vid = videoRefs.current[activeCard];
      if (vid) { vid.pause(); vid.currentTime = 0; }
      setActiveCard(null);
    }
    setIsPaused(false);
  }, [activeCard]);

  return (
    <section
      ref={ref}
      id="reel"
      className="relative min-h-screen flex flex-col items-center py-16 sm:py-20 px-4 overflow-hidden"
      style={{ background: '#000' }}
      onClick={handleSectionClick}
    >
      {/* Chess floor at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] z-1 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${chessFloor})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
        }}
      />

      <div className="absolute inset-0 bg-black/40 z-1 pointer-events-none" />

      {/* Floating BG cards (smaller sizes) */}
      {floatingBgCards.map((fc, i) => {
        const baseTransform = `perspective(600px) rotateX(${fc.rX}deg) rotateY(${fc.rY}deg) rotate(${fc.rZ}deg)`;
        return (
          <img
            key={i}
            src={allCards[fc.card]}
            alt=""
            className="absolute pointer-events-none opacity-60 z-1"
            style={{
              top: fc.top,
              left: fc.left,
              width: `${fc.size}px`,
              animation: `floatRandom ${fc.dur} ease-in-out infinite`,
              animationDelay: fc.delay,
              filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.7))',
              '--float-start': `${baseTransform} translate3d(0px, 0px, 0px)`,
              '--float-mid1': `${baseTransform} translate3d(${fc.floatX}px, ${fc.floatY}px, ${fc.floatX * 0.5}px)`,
              '--float-mid2': `${baseTransform} translate3d(${-fc.floatX * 0.6}px, ${-fc.floatY * 0.8}px, ${-fc.floatX * 0.3}px)`,
              '--float-mid3': `${baseTransform} translate3d(${fc.floatX * 0.4}px, ${fc.floatY * 0.5}px, ${fc.floatX * 0.2}px)`,
            }}
          />
        );
      })}

      {/* Title — neon green subtle */}
      <h2
        className="z-3 mb-6 sm:mb-10 text-center uppercase font-extralight tracking-[0.2em]"
        style={{
          fontFamily: "'VerminVibes', 'Impact', 'Arial Black', sans-serif",
          fontSize: 'clamp(2.2rem, 9vw, 6rem)',
          color: 'rgba(57, 255, 20, 0.75)',
          textShadow: '0 0 10px rgba(57,255,20,0.3), 0 0 30px rgba(57,255,20,0.15)',
        }}
      >
        Carrying Our Legacy
      </h2>

      {/* 3D Carousel */}
      <div
        className="relative z-3 w-full flex-1 flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative"
          style={{
            width: '1px',
            height: '1px',
            transformStyle: 'preserve-3d',
            animation: `spin3d ${CARD_COUNT * 5}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
            transition: 'animation-play-state 0.8s ease',
          }}
        >
          {reelVideos.map((reel, i) => {
            const angle = i * ANGLE_STEP;
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 200 : 340;
            const isActive = activeCard === reel.id;

            return (
              <div
                key={reel.id}
                className="absolute flex items-center justify-center"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="relative cursor-pointer"
                  style={{
                    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    filter: isActive
                      ? 'drop-shadow(0 0 24px rgba(57,255,20,0.5)) drop-shadow(0 0 48px rgba(57,255,20,0.25))'
                      : 'drop-shadow(0 8px 24px rgba(0,0,0,0.8))',
                  }}
                  data-card
                  onClick={(e) => { e.stopPropagation(); handleCardTap(reel.id); }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="relative w-36 h-54 sm:w-44 sm:h-66 md:w-52 md:h-78 lg:w-60 lg:h-90">
                    <img
                      src={cardSvg}
                      alt={`Card ${reel.id}`}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-[12%] sm:inset-[13%] overflow-hidden rounded-sm">
                      <video
                        ref={(el) => { if (el) videoRefs.current[reel.id] = el; }}
                        src={reel.src}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                      {/* Play icon overlay — hidden when active */}
                      {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <svg className="w-10 h-10 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-[14%] left-[12%] right-[12%] text-center">
                      <span
                        className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: 'rgba(57,255,20,0.7)', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                      >
                        {reel.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-45 sm:h-55 lg:h-65" />
    </section>
  );
});

Reel.displayName = 'Reel';
export default Reel;
