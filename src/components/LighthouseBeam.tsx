import React from 'react';

export const LighthouseBeam: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Sweeping Lighthouse Light ("Fa ale vini") */}
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[950px] animate-fa-sweep"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(8, 124, 255, 0.08) 15deg, rgba(53, 201, 255, 0.26) 24deg, rgba(255, 255, 255, 0.45) 25deg, rgba(53, 201, 255, 0.26) 26deg, rgba(8, 124, 255, 0.08) 35deg, transparent 55deg)',
          filter: 'blur(18px)',
        }}
      />

      {/* Horizontal laser scan beam */}
      <div 
        className="absolute top-1/4 -left-full w-[250%] h-[3px] bg-gradient-to-r from-transparent via-[#35c9ff] to-transparent opacity-30 animate-laser-ray"
      />

      {/* Radiant Electric Blue Ambient Spheres */}
      <div 
        className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-[#0055ff]/25 blur-[120px]"
      />
      <div 
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-[#00a6ff]/20 blur-[140px]"
      />
      <div 
        className="absolute bottom-10 left-1/4 w-[450px] h-[450px] rounded-full bg-[#087cff]/15 blur-[110px]"
      />

      {/* Subtle Electric Grid Matrix */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #35c9ff 1px, transparent 1px), linear-gradient(to bottom, #35c9ff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
