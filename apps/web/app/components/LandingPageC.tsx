'use client';

import { useState, useEffect } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPageC({ onEnter }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-700 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Video Background with Negative/Invert Effect */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'invert(1) brightness(0.9) contrast(1.1)' }}
      >
        <source
          src="https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content Overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-black text-center px-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Logo / Title */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-9xl font-bold tracking-wider mb-4">
            <span className="text-black drop-shadow-[0_0_30px_rgba(0,0,0,0.3)]">GEOLENS</span>
          </h1>
          <div className="h-1 w-48 mx-auto bg-black rounded-full" />
        </div>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-4xl font-light mb-6 tracking-wide text-black">
          EUROPA
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed font-light text-black">
          Piattaforma avanzata di analisi geospaziale per la mappatura
          del rischio ambientale multi-hazard in Europa
        </p>

        <p className="text-base md:text-lg max-w-2xl mx-auto mb-12 text-black/70 font-light">
          Dati satellitari in tempo reale da NASA e Copernicus per l'analisi di
          rischio idrico, frane, sismi e risorse minerarie
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm md:text-base">
          <div className="flex items-center gap-2 border border-black/50 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm">
            <span className="w-2 h-2 bg-black rounded-full" />
            <span className="text-black">Dati NASA in tempo reale</span>
          </div>
          <div className="flex items-center gap-2 border border-black/50 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm">
            <span className="w-2 h-2 bg-black rounded-full" />
            <span className="text-black">Visualizzazione 2D/3D</span>
          </div>
          <div className="flex items-center gap-2 border border-black/50 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm">
            <span className="w-2 h-2 bg-black rounded-full" />
            <span className="text-black">Analisi AI integrata</span>
          </div>
        </div>

        {/* Enter Button */}
        <button
          onClick={handleEnter}
          className="group relative px-12 py-4 text-lg font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 bg-black text-white rounded-full hover:bg-white hover:text-black border-2 border-black"
        >
          <span className="flex items-center gap-3">
            Esplora la Mappa
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-black/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
