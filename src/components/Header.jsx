import React from 'react';
import { Cpu } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative w-full border-b border-cyan-500/10 bg-[#060A14]/90 backdrop-blur-xl sticky top-0 z-40 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-13 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center space-x-2.5">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-400/30 shadow-[0_0_10px_rgba(0,242,254,0.2)]">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 uppercase">
                NEO CHECKOUT
              </span>
              <span className="text-[9px] font-mono tracking-widest px-1.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase">
                v2.6
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-none">
              Fynd Hiring Hackathon 2026
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
