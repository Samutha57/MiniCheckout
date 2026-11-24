import React from 'react';
import { Cpu } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative w-full border-b border-cyan-500/10 bg-[#060A14]/90 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,242,254,0.2)]">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 uppercase">
                NEO CHECKOUT
              </span>
              <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase">
                v2.6
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Fynd Hiring Hackathon 2026
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
