import balloons from '../assets/6.png';
import stork from '../assets/5.png';
import { useSceneTransition } from '../context/TransitionContext';

export default function PageTransitionOverlay() {
  const { transitioning } = useSceneTransition();
  if (!transitioning) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="absolute w-[250vmax] h-[250vmax] rounded-full shrink-0 bg-[radial-gradient(circle,oklch(92%_0.04_310)_0%,oklch(82%_0.08_310)_100%)] animate-[bs-wipe_1.6s_ease-in-out_both]" />
      <img
        src={balloons}
        alt=""
        className="absolute left-[12%] bottom-0 w-[130px] animate-[bs-rise_1.5s_ease-in_0.1s_both]"
      />
      <img
        src={balloons}
        alt=""
        className="absolute left-[44%] bottom-0 w-[90px] animate-[bs-rise_1.45s_ease-in_0.3s_both]"
      />
      <img
        src={balloons}
        alt=""
        className="absolute left-[74%] bottom-0 w-[150px] animate-[bs-rise_1.55s_ease-in_0.2s_both]"
      />
      <img
        src={stork}
        alt=""
        className="absolute w-[min(300px,60vw)] animate-[bs-fly-across_1.6s_ease-in-out_both]"
      />
      <div className="absolute top-[30%] left-[26%] w-[18px] h-[18px] bg-gold-300 animate-[bs-star-burst_1s_ease-out_0.35s_both]" />
      <div className="absolute top-[62%] left-[68%] w-[14px] h-[14px] bg-gold-300 animate-[bs-star-burst_1s_ease-out_0.55s_both]" />
      <div className="absolute top-[22%] left-[70%] w-[12px] h-[12px] bg-[oklch(75%_0.09_310)] animate-[bs-star-burst_1s_ease-out_0.7s_both]" />
      <div className="absolute top-[70%] left-[20%] w-[14px] h-[14px] bg-[oklch(75%_0.09_310)] animate-[bs-star-burst_1s_ease-out_0.45s_both]" />
    </div>
  );
}
