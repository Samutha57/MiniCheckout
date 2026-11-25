import React from 'react';

export default function Header() {
  return (
    <header className="relative w-full border-b border-cyan-500/10 bg-[#060A14]/90 backdrop-blur-xl sticky top-0 z-40 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 sm:h-14 flex items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white text-center">
          Shopping Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Simple</span>
        </h1>
      </div>
    </header>
  );
}
