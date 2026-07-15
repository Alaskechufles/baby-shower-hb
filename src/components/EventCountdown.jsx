import { useEffect, useState } from 'react';
import { EVENT_DATE } from '../lib/eventInfo';

const EVENT_TIMESTAMP = EVENT_DATE.getTime();

function getParts(msRemaining) {
  const totalSeconds = Math.max(0, Math.floor(msRemaining / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function EventCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const msRemaining = EVENT_TIMESTAMP - now;

  if (msRemaining <= 0) {
    return (
      <div className="w-full max-w-[480px] mt-1 mb-6 text-center font-display italic text-lg text-plum-600 animate-[bs-pop_0.8s_ease-out_0.35s_both]">
        ¡Hoy es el gran día! 🎉
      </div>
    );
  }

  const { days, hours, minutes, seconds } = getParts(msRemaining);
  const units = [
    { value: days, label: days === 1 ? 'día' : 'días' },
    { value: hours, label: 'horas' },
    { value: minutes, label: 'min' },
    { value: seconds, label: 'seg' },
  ];

  return (
    <div className="w-full max-w-[480px] mt-1 mb-6 animate-[bs-pop_0.8s_ease-out_0.35s_both]">
      <div className="text-center text-sm font-semibold text-plum-600 mb-3">
        ¡Ya casi llega el gran día!
      </div>
      <div className="flex justify-center gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="flex flex-col items-center justify-center w-[68px] h-[68px] bg-cream-50 rounded-2xl shadow-[0_6px_20px_oklch(30%_0.02_20/0.08)]"
          >
            <div className="font-display font-bold text-2xl text-lavender-500 tabular-nums">
              {u.value}
            </div>
            <div className="text-[11px] text-ink-mute">{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
