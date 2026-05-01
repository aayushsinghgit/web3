import { useState, useEffect } from 'react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 50,
    minutes: 23,
    seconds: 38
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[--border] shadow-[0_0_100px_rgba(108,99,255,0.08)]" />
      
      {/* Progress Ring (Animated SVG) */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle 
          cx="50%" cy="50%" r="48%" 
          fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.05"
        />
        <circle 
          cx="50%" cy="50%" r="48%" 
          fill="none" stroke="var(--brand)" strokeWidth="2" 
          strokeDasharray="100 100" strokeDashoffset="25"
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>

      <div className="relative z-10 text-center scale-90 md:scale-100">
        <p className="text-[--text-muted] text-[8px] font-black uppercase tracking-[0.4em] mb-6">ICO Token Sale Start</p>
        <div className="flex gap-2 md:gap-4 items-center justify-center">
          {[
            { val: timeLeft.days, label: 'DAYS' },
            { val: timeLeft.hours, label: 'HOURS' },
            { val: timeLeft.minutes, label: 'MIN' },
            { val: timeLeft.seconds, label: 'SEC' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex items-center">
                <span className="text-[--text-primary] text-3xl md:text-5xl font-black tracking-tighter tabular-nums">
                  {format(item.val)}
                </span>
                {i < 3 && <span className="text-[--text-muted]/20 text-xl md:text-2xl font-light mx-0.5 md:mx-1">:</span>}
              </div>
              <span className="text-[--text-muted]/40 text-[7px] font-black tracking-widest mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
