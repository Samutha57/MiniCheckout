import React from 'react';
import { ShieldCheck, Cpu, Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative w-full border-b border-cyan-500/10 bg-[#060A14]/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-400/30 shadow-[0_0_15px_rgba(0,242,254,0.25)]">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 uppercase">
                NEO CHECKOUT
              </span>
              <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase">
                v2.6
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              Fynd Hiring Hackathon 2026 • Premium 3D Hardware Manifest
            </p>
          </div>
        </div>

        {/* System Badges */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>ZERO LATENCY</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-BIT ENCRYPTION</span>
          </div>
        </div>
      </div>
    </header>
  );
}
