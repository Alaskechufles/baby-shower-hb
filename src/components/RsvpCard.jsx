import { useGuest } from '../context/GuestContext';
import { useRsvp } from '../hooks/useRsvp';

export default function RsvpCard() {
  const { guestName } = useGuest();
  const { attending, loading, saving, error, respond } = useRsvp(guestName);

  const baseBtn =
    'px-5 py-3 rounded-full font-bold text-sm cursor-pointer font-body transition-all duration-150 ease-out disabled:opacity-60 disabled:cursor-wait';
  const disabled = saving || loading;

  return (
    <div className="w-full max-w-[480px] bg-cream-50 rounded-3xl px-7 py-7 mt-6 text-center shadow-[0_10px_34px_oklch(30%_0.02_20/0.1)] animate-[bs-pop_0.8s_ease-out_0.45s_both]">
      <div className="font-display font-bold text-lg text-plum-700 mb-1">¿Nos acompañarás?</div>
      <p className="text-ink-mute text-sm mb-4">
        Cuéntanos si podrás asistir para organizarnos mejor.
      </p>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={() => respond(true)}
          className={`${baseBtn} ${
            attending === true
              ? 'bg-lavender-500 text-white shadow-[0_8px_20px_oklch(58%_0.13_310/0.35)]'
              : 'bg-lavender-100 text-plum-700 hover:bg-lavender-200'
          }`}
        >
          Sí, voy 🎉
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => respond(false)}
          className={`${baseBtn} ${
            attending === false
              ? 'bg-rose-600 text-white shadow-[0_8px_20px_oklch(55%_0.14_25/0.3)]'
              : 'bg-lavender-100 text-plum-700 hover:bg-lavender-200'
          }`}
        >
          No podré ir
        </button>
      </div>
      {attending !== null && (
        <div className="mt-4 text-sm text-ink-mute">
          {attending
            ? '¡Gracias por confirmar, te esperamos!'
            : 'Gracias por avisarnos, ¡te extrañaremos!'}
        </div>
      )}
      {error && <div className="mt-4 text-sm text-rose-600">No pudimos guardar tu respuesta, intenta de nuevo.</div>}
    </div>
  );
}
