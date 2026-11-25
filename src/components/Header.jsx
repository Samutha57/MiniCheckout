import React from 'react';

export default function Header() {
  return (
    <header className="relative w-full border-b border-cyan-500/10 bg-[#060A14]/60 backdrop-blur-md sticky top-0 z-40 flex-shrink-0 h-6 sm:h-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="w-2 h-2 rounded-full bg-cyan-400/40 shadow-[0_0_8px_rgba(0,242,254,0.4)]" />
        <div className="w-2 h-2 rounded-full bg-violet-400/40 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
      </div>
    </header>
  );
}
