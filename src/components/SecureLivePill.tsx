import React, { useRef, useEffect } from 'react';

interface SecureLivePillProps {
  liveUsers: number;
  onOpenDev: () => void;
}

export const SecureLivePill: React.FC<SecureLivePillProps> = ({ liveUsers, onOpenDev }) => {
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const targetDuration = 10000; // Exact 10 seconds continuous press required

  const clearAllTimers = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Left click or direct touch only
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    clearAllTimers();

    // After exact 10,000 ms (10 seconds), open the Dev panel
    pressTimerRef.current = setTimeout(() => {
      clearAllTimers();
      onOpenDev();
    }, targetDuration);
  };

  const handlePointerUp = () => {
    clearAllTimers();
  };

  const handlePointerCancel = () => {
    clearAllTimers();
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerCancel}
      onPointerCancel={handlePointerCancel}
      onContextMenu={(e) => e.preventDefault()}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold select-none cursor-default transition-all bg-[#020b1b]/60 border-[rgba(50,150,255,0.2)] text-blue-200/80"
      style={{ touchAction: 'none' }}
    >
      {/* The Live Green Dot */}
      <span className="relative flex h-2 w-2 z-10 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400 shadow-[0_0_8px_#3df58b]" />
      </span>

      {/* Natural text label without any timer or countdown disclosure */}
      <span className="relative z-10 text-[11px] sm:text-xs tracking-wide">
        {liveUsers} LIVE
      </span>
    </div>
  );
};
