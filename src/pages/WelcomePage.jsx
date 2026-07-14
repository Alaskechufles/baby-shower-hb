import { useState } from 'react';
import starsBg from '../assets/9.png';
import bunting from '../assets/8.png';
import balloons from '../assets/6.png';
import cloud from '../assets/4.png';
import stroller from '../assets/1.png';
import cake from '../assets/3.png';
import stork from '../assets/5.png';
import { useGuest } from '../context/GuestContext';
import { useSceneTransition } from '../context/TransitionContext';

export default function WelcomePage() {
  const { setGuestName } = useGuest();
  const { go } = useSceneTransition();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showNameError, setShowNameError] = useState(false);

  const submitName = (e) => {
    e.preventDefault();
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    if (!trimmedFirst || !trimmedLast) {
      setShowNameError(true);
      return;
    }
    setGuestName(`${trimmedFirst} ${trimmedLast}`);
    go('/detalles');
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 pointer-events-none">
        <img src={starsBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <img
          src={bunting}
          alt=""
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[min(110vw,920px)]"
        />
        <img
          src={balloons}
          alt=""
          className="absolute top-[16%] -left-[46px] w-[210px] animate-[bs-float_7s_ease-in-out_infinite]"
        />
        <img
          src={balloons}
          alt=""
          className="absolute top-[42%] -right-[60px] w-[240px] -scale-x-100 animate-[bs-float-slow_9s_ease-in-out_infinite] [animation-delay:1s]"
        />
        <img
          src={cloud}
          alt=""
          className="absolute top-[4%] right-[4%] w-[180px] opacity-75 animate-[bs-float-slow_10s_ease-in-out_infinite] [animation-delay:0.5s]"
        />
        <img
          src={cloud}
          alt=""
          className="absolute top-[26%] left-[16%] w-[130px] opacity-55 animate-[bs-cloud-drift_12s_ease-in-out_infinite] [animation-delay:2s]"
        />
        <img
          src={cloud}
          alt=""
          className="absolute bottom-[30%] right-[22%] w-[110px] opacity-50 animate-[bs-cloud-drift_14s_ease-in-out_infinite] [animation-delay:5s]"
        />
        <img
          src={stroller}
          alt=""
          className="absolute -bottom-[36px] left-[1%] w-[200px] animate-[bs-float-slow_8s_ease-in-out_infinite]"
        />
        <img
          src={cake}
          alt=""
          className="absolute -bottom-[30px] right-[2%] w-[180px] animate-[bs-float-slow_9s_ease-in-out_infinite] [animation-delay:2s]"
        />

        <div className="absolute top-[60%] right-[8%] w-4 h-4 bg-gold-300 rotate-45 animate-[bs-twinkle_3s_ease-in-out_infinite]" />
        <div className="absolute top-[22%] right-[28%] w-2.5 h-2.5 bg-gold-300 rotate-45 animate-[bs-twinkle_2.4s_ease-in-out_infinite] [animation-delay:0.6s]" />
        <div className="absolute bottom-[22%] left-[32%] w-3 h-3 bg-gold-300 rotate-45 animate-[bs-twinkle_2.8s_ease-in-out_infinite] [animation-delay:1.2s]" />
        <div className="absolute top-[44%] left-[22%] w-2 h-2 bg-gold-300 rotate-45 animate-[bs-twinkle_3.4s_ease-in-out_infinite] [animation-delay:0.3s]" />
        <div className="absolute top-[70%] right-[30%] w-3 h-3 bg-[oklch(85%_0.05_300)] rotate-45 animate-[bs-twinkle_2.6s_ease-in-out_infinite] [animation-delay:1.6s]" />

        <img
          src={balloons}
          alt=""
          className="absolute left-[15%] -bottom-[160px] w-[100px] opacity-70 animate-[bs-drift_16s_linear_infinite]"
        />
        <img
          src={balloons}
          alt=""
          className="absolute left-[55%] -bottom-[160px] w-[76px] opacity-60 animate-[bs-drift_20s_linear_infinite] [animation-delay:4s]"
        />
        <img
          src={balloons}
          alt=""
          className="absolute left-[82%] -bottom-[160px] w-[110px] opacity-70 animate-[bs-drift_18s_linear_infinite] [animation-delay:9s]"
        />
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center gap-7 px-6 py-8 text-center animate-[bs-fadein_0.8s_ease-out]">
        <img
          src={stork}
          alt="Cigüeña con bebé"
          className="w-[min(340px,72vw)] mt-[-30px] mb-[-70px] animate-[bs-float_6s_ease-in-out_infinite]"
        />
        <div className="font-display italic text-xl text-plum-600 tracking-wide animate-[bs-pop_0.9s_ease-out_0.2s_both]">
          Con mucho cariño, Diego &amp; Sigrid
        </div>
        <h1
          className="font-display font-bold text-[clamp(40px,8vw,68px)] leading-[1.05] m-0 bg-[length:200%_auto] bg-clip-text text-transparent bg-gradient-to-r from-plum-700 via-[oklch(58%_0.14_330)] to-[oklch(48%_0.1_290)] animate-[bs-pop_0.9s_ease-out_0.45s_both,bs-shimmer_6s_linear_1.4s_infinite]"
        >
          ¡Te invitamos al
          <br />
          Baby Shower de
          <br />
          nuestra bebé!
        </h1>
        <p className="text-lg text-ink-soft max-w-[420px] m-0 animate-[bs-pop_0.9s_ease-out_0.7s_both]">
          Estamos felices de contar contigo en este momento tan especial. Ingresa tu nombre para ver
          los detalles del evento.
        </p>

        <form
          onSubmit={submitName}
          className="flex flex-col gap-3.5 w-full max-w-[360px] mt-2 animate-[bs-pop_0.9s_ease-out_0.95s_both]"
        >
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setShowNameError(false);
            }}
            placeholder="Nombre"
            className="px-5 py-4 rounded-full border-2 border-lavender-300 font-body text-base text-center outline-none bg-cream-50 text-ink focus:border-lavender-500"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setShowNameError(false);
            }}
            placeholder="Apellido"
            className="px-5 py-4 rounded-full border-2 border-lavender-300 font-body text-base text-center outline-none bg-cream-50 text-ink focus:border-lavender-500"
          />
          {showNameError && (
            <div className="text-rose-600 text-sm -mt-1">
              Por favor escribe tu nombre y apellido para continuar
            </div>
          )}
          <button
            type="submit"
            className="px-5 py-4 rounded-full border-none bg-lavender-500 text-white font-body font-bold text-base cursor-pointer shadow-[0_8px_20px_oklch(58%_0.13_310/0.35)] transition-all duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_12px_26px_oklch(58%_0.13_310/0.45)] active:translate-y-0 active:scale-95"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
