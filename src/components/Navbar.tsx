import React, { useState } from 'react';
import { Download, Menu, X, Smartphone, Monitor } from 'lucide-react';
import { SecureLivePill } from './SecureLivePill';

interface NavbarProps {
  onOpenDev: () => void;
  onOpenDownload: (platform?: 'mobile' | 'pc') => void;
  liveUsers: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDev, onOpenDownload, liveUsers }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 transition-all rounded-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand (Standard navigation, no secret triggers) */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => scrollTo('home')}
            title="OmniChurch"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 via-blue-600 to-blue-700 flex items-center justify-center font-black text-white text-base tracking-wider shadow-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(8,124,255,0.6)] border border-white/20">
              OC
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white flex items-center">
                Omni<span className="text-[#35c9ff]">Church</span>
              </div>
              <div className="text-[10px] font-medium text-blue-200/50 tracking-wide hidden sm:block">
                Solisyon dijital pou legliz
              </div>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-blue-200/70">
            <button onClick={() => scrollTo('home')} className="hover:text-white transition-colors cursor-pointer">
              Akèy
            </button>
            <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors cursor-pointer">
              Fonksyon
            </button>
            <button onClick={() => scrollTo('gid-enstalasyon')} className="hover:text-white transition-colors cursor-pointer">
              Gid Enstalasyon
            </button>
            <button onClick={() => scrollTo('sekirite')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Sekirite
            </button>
            <button onClick={() => scrollTo('preview')} className="hover:text-white transition-colors cursor-pointer">
              Eksplore
            </button>
            <button onClick={() => scrollTo('download')} className="hover:text-white transition-colors cursor-pointer">
              Telechaje
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">
              Kontak
            </button>
          </nav>

          {/* Action Buttons with Ultra-Secure Live Indicator Pill, Version & Language Selector */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Stable Version Badge */}
            <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-950/70 border border-[#35c9ff]/40 text-[#35c9ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35c9ff] animate-ping" />
              v1.0.0 Stable
            </span>

            {/* Language Selector */}
            <div className="hidden xl:flex items-center gap-1 bg-black/40 px-2 py-1 rounded-xl border border-white/10 text-[11px] font-bold text-blue-200/70">
              <span className="text-[#35c9ff]">HT</span>
              <span className="text-white/20">|</span>
              <span className="hover:text-white cursor-pointer transition-colors" title="Français">FR</span>
              <span className="text-white/20">|</span>
              <span className="hover:text-white cursor-pointer transition-colors" title="English">EN</span>
              <span className="text-white/20">|</span>
              <span className="hover:text-white cursor-pointer transition-colors" title="Español">ES</span>
            </div>

            {/* Live Indicator Pill - Only authentic point of access via 10-second continuous hold */}
            <SecureLivePill liveUsers={liveUsers} onOpenDev={onOpenDev} />

            {/* Quick Download Button */}
            <button
              onClick={() => onOpenDownload('mobile')}
              className="btn-gradient px-4 py-2 rounded-xl text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Telechaje</span>
            </button>
          </div>

          {/* Mobile hamburger & mobile live pill */}
          <div className="flex items-center gap-2 md:hidden">
            <SecureLivePill liveUsers={liveUsers} onOpenDev={onOpenDev} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[rgba(10,28,59,0.6)] border border-white/10 text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1e4d8c]/40 space-y-3 bg-[#020712]/95 backdrop-blur-2xl">
            <div className="flex flex-col gap-2 font-semibold text-[#a6c1e3] px-2">
              <button
                onClick={() => scrollTo('home')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                Akèy
              </button>
              <button
                onClick={() => scrollTo('features')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                Fonksyon
              </button>
              <button
                onClick={() => scrollTo('gid-enstalasyon')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                Gid Enstalasyon
              </button>
              <button
                onClick={() => scrollTo('sekirite')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
              >
                Sekirite &amp; Teknoloji
              </button>
              <button
                onClick={() => scrollTo('preview')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                Eksplore
              </button>
              <button
                onClick={() => scrollTo('download')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                Telechaje
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                Kontak
              </button>
            </div>

            <div className="pt-3 border-t border-[#1e4d8c]/30 px-2">
              <button
                onClick={() => {
                  scrollTo('download');
                  setMobileMenuOpen(false);
                }}
                className="btn-gradient w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,124,255,0.4)] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Telechaje OmniChurch</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
