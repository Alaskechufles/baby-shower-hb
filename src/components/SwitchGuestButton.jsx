import { useGuest } from '../context/GuestContext';
import { useSceneTransition } from '../context/TransitionContext';

export default function SwitchGuestButton() {
  const { clearGuestName } = useGuest();
  const { go } = useSceneTransition();

  return (
    <button
      type="button"
      onClick={() => go('/', { onNavigate: clearGuestName })}
      className="border-none bg-transparent text-ink-mute text-xs font-body cursor-pointer underline decoration-dotted hover:text-plum-600"
    >
      ¿No eres tú? Ingresa como otra persona
    </button>
  );
}
