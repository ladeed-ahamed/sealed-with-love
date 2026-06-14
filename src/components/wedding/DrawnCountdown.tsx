import { useState, useEffect } from "react";

export function DrawnCountdown({ targetDateIso }: { targetDateIso: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDateIso).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateIso]);

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2 md:gap-4 w-full justify-center">
      {timeUnits.map((unit, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="drawn-card w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white shadow-[2px_2px_0px_var(--ink)]">
            <span className="font-pixel text-4xl md:text-5xl text-blue-accent">{unit.value.toString().padStart(2, '0')}</span>
          </div>
          <span className="mt-2 font-dialogue text-xs md:text-sm font-bold tracking-widest">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
