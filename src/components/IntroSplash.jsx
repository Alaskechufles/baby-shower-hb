import { useEffect } from 'react';
import cloud from '../assets/4.png';
import stork from '../assets/5.png';

export default function IntroSplash({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 4400);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-[oklch(95%_0.025_310)] to-[oklch(90%_0.05_310)] pointer-events-none animate-[bs-intro-out_0.9s_ease_3.4s_both]">
      <img
        src={cloud}
        alt=""
        className="absolute top-[10%] left-[6%] w-[200px] opacity-85 animate-[bs-cloud-drift_9s_ease-in-out_infinite]"
      />
      <img
        src={cloud}
        alt=""
        className="absolute top-[22%] right-[8%] w-[150px] opacity-70 animate-[bs-cloud-drift_11s_ease-in-out_infinite] [animation-delay:1.5s]"
      />
      <img
        src={cloud}
        alt=""
        className="absolute bottom-[12%] left-[14%] w-[130px] opacity-60 animate-[bs-cloud-drift_10s_ease-in-out_infinite] [animation-delay:3s]"
      />
      <img
        src={cloud}
        alt=""
        className="absolute bottom-[8%] right-[12%] w-[180px] opacity-80 animate-[bs-cloud-drift_12s_ease-in-out_infinite] [animation-delay:0.8s]"
      />
      <img
        src={stork}
        alt=""
        className="w-[min(380px,78vw)] animate-[bs-fly_2.4s_cubic-bezier(0.22,1,0.36,1)_both]"
      />
      <div className="font-display italic text-[clamp(26px,6vw,42px)] text-plum-600 -mt-[30px] animate-[bs-pop_1.1s_ease-out_1.8s_both]">
        Nuestra bebé está en camino…
      </div>
    </div>
  );
}
