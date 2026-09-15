import React, { useState } from 'react';
import { ShieldCheck, QrCode, Sparkles, CheckCircle2, Award, Church, RotateCw } from 'lucide-react';

export const VirtualMembershipCard: React.FC = () => {
  // isAutoFlipping controls whether the automatic continuous spin is active
  // If user clicks or hovers, they can pause or manually flip
  const [manualFlipped, setManualFlipped] = useState<boolean | null>(null);

  const toggleManualFlip = () => {
    setManualFlipped((prev) => (prev === null ? true : !prev));
  };

  return (
    <div
      className="relative select-none pointer-events-auto group"
      style={{ perspective: '1200px' }}
      onClick={toggleManualFlip}
      title="Kat Manm Vityèl OmniChurch - Pase sourit oswa klike pou wè rekto ak vèso"
    >
      {/* Subtle Aura Glow behind card */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#087cff]/30 via-[#35c9ff]/20 to-blue-600/30 rounded-3xl blur-xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* 3D Rotating Container */}
      <div
        className={`w-[250px] sm:w-[275px] h-[155px] sm:h-[168px] relative rounded-2xl cursor-pointer transition-all duration-700 ease-out preserve-3d shadow-[0_15px_35px_rgba(0,0,0,0.55),0_0_20px_rgba(53,201,255,0.2)] hover:shadow-[0_20px_45px_rgba(8,124,255,0.45),0_0_30px_rgba(53,201,255,0.35)] ${
          manualFlipped === null ? 'animate-card-float-spin' : ''
        }`}
        style={
          manualFlipped !== null
            ? {
                transformStyle: 'preserve-3d',
                transform: manualFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }
            : { transformStyle: 'preserve-3d' }
        }
      >
        {/* ==================== REKTO (FRONT) ==================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden border border-[#35c9ff]/40 backdrop-blur-xl bg-gradient-to-br from-[#0a2353]/95 via-[#061633]/95 to-[#020919]/95 text-white shadow-inner"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle glossy holographic reflex */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none transform rotate-12" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

          {/* Top Bar: Church Logo, Name & Microchip */}
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#087cff] to-[#35c9ff] flex items-center justify-center shadow-[0_0_12px_rgba(53,201,255,0.6)] border border-white/20">
                <Church className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[10px] sm:text-[11px] font-black tracking-wide text-white leading-tight uppercase">
                  Tabènak de Gras
                </div>
                <div className="text-[8px] text-[#35c9ff] font-bold tracking-wider uppercase">
                  Kat Manm Vityèl
                </div>
              </div>
            </div>

            {/* Smart Electronic Chip */}
            <div className="w-6 h-4.5 sm:w-7 sm:h-5 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-0.5 shadow border border-amber-300/60 flex items-center justify-center shrink-0">
              <div className="w-full h-full border border-amber-900/30 rounded-[3px] flex flex-col justify-around py-0.5">
                <div className="w-full h-[1px] bg-amber-900/40" />
                <div className="w-full h-[1px] bg-amber-900/40" />
              </div>
            </div>
          </div>

          {/* Center: Member Profile & ID */}
          <div className="flex items-center gap-2.5 relative z-10 my-auto">
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-[0_0_10px_rgba(53,201,255,0.4)]">
                <div className="w-full h-full rounded-[10px] bg-[#07193b] flex items-center justify-center font-bold text-xs text-white">
                  JC
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#061633] rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[11px] sm:text-xs font-black text-white truncate flex items-center gap-1">
                <span>Jackson Charles</span>
                <Sparkles className="w-2.5 h-2.5 text-[#35c9ff] shrink-0" />
              </div>
              <div className="text-[9px] text-blue-200/80 font-medium truncate">
                Koral &amp; Medya
              </div>
              <div className="text-[9px] text-[#35c9ff] font-mono font-bold tracking-wider">
                ID: #OC-2026-0842
              </div>
            </div>
          </div>

          {/* Bottom Bar: Status Badge & OmniChurch logo */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10 relative z-10 text-[9px]">
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Manm Aktif</span>
            </div>
            <div className="flex items-center gap-1 text-white/70 font-extrabold tracking-widest text-[8px] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35c9ff] animate-ping" />
              <span>OmniChurch Pro</span>
            </div>
          </div>

          {/* Subtle flip indicator */}
          <div className="absolute bottom-1 right-2 text-[7px] text-blue-200/50 uppercase tracking-wider font-semibold pointer-events-none flex items-center gap-0.5">
            <RotateCw className="w-2 h-2" />
            <span>Rekto</span>
          </div>
        </div>

        {/* ==================== VÈSO (BACK) ==================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-3 flex flex-col justify-between overflow-hidden border border-[#35c9ff]/40 backdrop-blur-xl bg-gradient-to-bl from-[#05132d]/98 via-[#040e22]/98 to-[#020713]/98 text-white shadow-inner"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Top Magnetic Security Stripe */}
          <div className="-mx-3 -mt-3 h-5 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border-b border-white/10 flex items-center px-3">
            <span className="text-[6.5px] font-mono text-neutral-400 tracking-widest truncate">
              OMNICHURCH NFC / RFID ENCRYPTED SECURE CARD
            </span>
          </div>

          {/* Back Content: QR Code & Verification Info */}
          <div className="flex items-center gap-2.5 my-auto px-0.5">
            {/* Real Stylized QR Code Container */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.2)]">
              <QrCode className="w-full h-full text-slate-900" />
            </div>

            <div className="flex-1 space-y-1 text-left min-w-0">
              <div className="text-[9px] font-bold text-white flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#35c9ff] shrink-0" />
                <span className="truncate">Eskane pou Prezans &amp; Dim</span>
              </div>
              <div className="text-[8px] text-blue-200/70 leading-tight line-clamp-2">
                Valab pou tout aktivite legliz la, kongrè, ak kès sekou fidèl yo.
              </div>
              <div className="text-[8px] font-mono text-cyan-300">
                Valid: Desanm 2028
              </div>
            </div>
          </div>

          {/* Back Footer: Pastor's Signature & Security Seal */}
          <div className="flex items-center justify-between border-t border-white/10 pt-1 text-[8px] text-blue-200/60">
            <div className="flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="font-semibold text-white/90">Siyati Pastè:</span>
              <span className="italic text-[#35c9ff] font-serif text-[9px]">P. R. Louis</span>
            </div>
            <span className="text-[7px] font-mono text-blue-200/40 uppercase">v2.4 Pro</span>
          </div>

          {/* Subtle flip indicator */}
          <div className="absolute bottom-1 right-2 text-[7px] text-blue-200/50 uppercase tracking-wider font-semibold pointer-events-none flex items-center gap-0.5">
            <RotateCw className="w-2 h-2" />
            <span>Vèso</span>
          </div>
        </div>
      </div>
    </div>
  );
};
