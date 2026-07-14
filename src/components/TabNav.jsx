import { useLocation } from 'react-router-dom';
import { useSceneTransition } from '../context/TransitionContext';

export default function TabNav({ className = '' }) {
  const { pathname } = useLocation();
  const { go } = useSceneTransition();
  const isDetails = pathname === '/detalles';
  const isGifts = pathname === '/regalos';

  const base = 'px-[22px] py-[10px] rounded-full font-body text-sm cursor-pointer border-none transition-colors';
  const active = `${base} bg-lavender-500 text-white font-bold`;
  const inactive = `${base} bg-transparent text-ink-soft font-semibold`;

  return (
    <div
      className={`flex gap-2.5 bg-cream-50 p-1.5 rounded-full shadow-[0_4px_16px_oklch(30%_0.02_20/0.08)] ${className}`}
    >
      <button type="button" onClick={() => go('/detalles')} className={isDetails ? active : inactive}>
        Detalles
      </button>
      <button type="button" onClick={() => go('/regalos')} className={isGifts ? active : inactive}>
        Lista de Regalos
      </button>
    </div>
  );
}
