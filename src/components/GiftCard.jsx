import { useState } from 'react';

export default function GiftCard({ gift, index, onClaim }) {
  const [claiming, setClaiming] = useState(false);
  const delay = Math.min(index * 0.05, 1);

  const handleClaim = async () => {
    setClaiming(true);
    await onClaim(gift.id);
    setClaiming(false);
  };

  return (
    <div
      className={`bg-cream-50 rounded-[18px] p-[18px] shadow-[0_6px_20px_oklch(30%_0.02_20/0.08)] flex flex-col transition-all duration-300 ease-out animate-[bs-pop_0.6s_ease-out_both] ${
        gift.isComplete ? 'opacity-60' : 'opacity-100 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_16px_36px_oklch(30%_0.02_20/0.14)]'
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* <div className="w-full h-[110px] rounded-xl bg-[repeating-linear-gradient(135deg,oklch(90%_0.03_15),oklch(90%_0.03_15)_10px,oklch(94%_0.02_15)_10px,oklch(94%_0.02_15)_20px)] flex items-center justify-center mb-3.5">
        <span className="font-mono text-[11px] text-ink/60">foto opcional</span>
      </div> */}
      <div className="font-bold text-[15px] mb-1">{gift.name}</div>
      <div className="text-ink-mute text-[13px] mb-3 min-h-[34px]">{gift.description}</div>

      <div className="h-1.5 rounded-full bg-divider overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            gift.isComplete ? 'bg-complete-bar' : 'bg-coral-300'
          } ${gift.pct > 0 && !gift.isComplete ? 'animate-[bs-bar-glow_2s_ease-in-out_infinite]' : ''}`}
          style={{ width: `${gift.pct}%` }}
        />
      </div>
      <div className="text-xs text-ink-mute mb-3">
        {gift.claimed} de {gift.needed} apartado{gift.pluralSuffix}
      </div>

      {gift.isComplete ? (
        <div className="flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-complete-bg text-complete-text font-bold text-[13px] animate-[bs-pop_0.5s_ease-out_both]">
          ✓ Completado
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClaim}
          disabled={claiming}
          className="w-full py-[11px] rounded-full border-none bg-coral-300 text-coral-700 font-bold text-[13px] cursor-pointer font-body transition-all duration-150 ease-out hover:bg-coral-400 hover:scale-[1.04] hover:shadow-[0_6px_16px_oklch(70%_0.11_15/0.4)] active:scale-95 disabled:opacity-60 disabled:cursor-wait"
        >
          {claiming ? 'Guardando…' : 'Yo lo llevo'}
        </button>
      )}
    </div>
  );
}
