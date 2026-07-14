import heartsBg from '../assets/10.png';
import garland from '../assets/7.png';
import stroller from '../assets/1.png';
import balloons from '../assets/6.png';
import cloud from '../assets/4.png';
import bottle from '../assets/2.png';
import { useGuest } from '../context/GuestContext';
import { useSceneTransition } from '../context/TransitionContext';
import TabNav from '../components/TabNav';
import EventCountdown from '../components/EventCountdown';
import RsvpCard from '../components/RsvpCard';

export default function DetailsPage() {
  const { guestName } = useGuest();
  const { go } = useSceneTransition();

  return (
    <div className="relative min-h-screen flex flex-col items-center px-5 pt-[140px] pb-20 animate-[bs-fadein_0.6s_ease-out]">
      <div className="absolute inset-0 pointer-events-none">
        <img src={heartsBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <img
          src={garland}
          alt=""
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[42%] w-[min(110vw,880px)]"
        />
        <img
          src={stroller}
          alt=""
          className="absolute -bottom-[30px] left-[1%] w-[190px] animate-[bs-float-slow_8s_ease-in-out_infinite]"
        />
        <img
          src={balloons}
          alt=""
          className="absolute top-[32%] -right-[56px] w-[210px] animate-[bs-float_7s_ease-in-out_infinite]"
        />
        <img
          src={cloud}
          alt=""
          className="absolute top-[8%] left-[3%] w-[150px] opacity-70 animate-[bs-float-slow_10s_ease-in-out_infinite] [animation-delay:1s]"
        />
        <img
          src={cloud}
          alt=""
          className="absolute bottom-[18%] right-[6%] w-[130px] opacity-55 animate-[bs-cloud-drift_13s_ease-in-out_infinite] [animation-delay:2.5s]"
        />
      </div>

      <img src={bottle} alt="" className="h-[110px] mt-[70px] mb-1.5 animate-[bs-wiggle_3.5s_ease-in-out_infinite]" />
      <div className="font-display italic text-[17px] text-plum-600 mb-1.5 animate-[bs-pop_0.7s_ease-out_0.1s_both]">
        ¡Hola, {guestName}!
      </div>
      <h1 className="font-display font-bold text-[clamp(30px,6vw,44px)] m-0 mb-7 text-center text-plum-700 animate-[bs-pop_0.7s_ease-out_0.25s_both]">
        Estás invitado al Baby Shower de nuestra bebé
      </h1>

      <TabNav className="mb-8" />

      <EventCountdown />

      <div className="w-full max-w-[480px] bg-cream-50 rounded-3xl px-7 py-8 shadow-[0_10px_34px_oklch(30%_0.02_20/0.1)] flex flex-col gap-5 animate-[bs-pop_0.8s_ease-out_0.4s_both] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_18px_44px_oklch(30%_0.02_20/0.14)]">
        <div className="flex gap-4 items-center">
          <div className="w-[54px] h-[54px] rounded-full bg-lavender-200 flex items-center justify-center shrink-0 overflow-hidden">
            <img src={balloons} alt="" className="w-[46px] h-[46px] object-contain scale-[1.7]" />
          </div>
          <div>
            <div className="font-bold text-base">Sábado 25 de Julio, 2026</div>
            <div className="text-ink-mute text-[15px]">5:00 pm</div>
          </div>
        </div>
        <div className="h-px bg-divider" />
        <div className="flex gap-4 items-start">
          <div className="w-[54px] h-[54px] rounded-full bg-lavender-200 flex items-center justify-center shrink-0 overflow-hidden">
            <img src={stroller} alt="" className="w-[46px] h-[46px] object-contain scale-150" />
          </div>
          <div>
            <div className="font-bold text-base">
              Iglesia de Jesucristo de los Santos de los Últimos Días
            </div>
            <div className="text-ink-mute text-[15px] mb-2">Alto Selva Alegre, Arequipa</div>
            <a
              href="https://maps.app.goo.gl/afepYDfTadQSUCo6A"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-lavender-600 font-semibold text-sm no-underline hover:underline"
            >
              Abrir en Google Maps →
            </a>
          </div>
        </div>
      </div>

      <RsvpCard />

      <div className="w-full max-w-[480px] h-[220px] rounded-3xl overflow-hidden shadow-[0_10px_34px_oklch(30%_0.02_20/0.1)] mt-5 animate-[bs-pop_0.8s_ease-out_0.5s_both]">
        <iframe
          title="Ubicación del Baby Shower"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2148.2300825602106!2d-71.52821500573417!3d-16.38870812424687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a4c58a80305%3A0x6d79266c7a43de50!2sLa%20Iglesia%20de%20Jesucristo%20de%20los%20Santos%20de%20los%20%C3%9Altimos%20D%C3%ADas!5e0!3m2!1ses-419!2spe!4v1784049497808!5m2!1ses-419!2spe"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="w-full max-w-[480px] bg-lavender-100 rounded-3xl px-7 py-6 mt-6 text-center animate-[bs-pop_0.8s_ease-out_0.55s_both]">
        <p className="font-display italic text-[15px] text-ink-soft leading-relaxed m-0">
          Estamos muy felices de compartir este momento tan especial con las personas que más
          queremos. Gracias por acompañarnos en la dulce espera de nuestra bebé y por ser parte
          de esta nueva etapa de nuestras vidas. ¡Los esperamos con mucho cariño!
        </p>
        <div className="mt-3 font-display font-semibold text-plum-600">— Diego &amp; Sigrid</div>
      </div>

      <button
        type="button"
        onClick={() => go('/regalos')}
        className="mt-8 px-8 py-4 rounded-full border-none bg-lavender-500 text-white font-body font-bold text-base cursor-pointer shadow-[0_8px_20px_oklch(58%_0.13_310/0.3)] animate-[bs-pop_0.8s_ease-out_0.6s_both] transition-all duration-150 ease-out hover:-translate-y-[3px] hover:scale-[1.03] hover:shadow-[0_14px_30px_oklch(58%_0.13_310/0.45)] active:scale-95"
      >
        Ver Lista de Regalos
      </button>
    </div>
  );
}
