import { useEffect } from 'react';
import starsBg from '../assets/9.png';
import bunting from '../assets/8.png';
import cloud from '../assets/4.png';
import cake from '../assets/3.png';
import { useGuest } from '../context/GuestContext';
import { useGifts } from '../hooks/useGifts';
import TabNav from '../components/TabNav';
import GiftCard from '../components/GiftCard';
import SwitchGuestButton from '../components/SwitchGuestButton';

export default function GiftsPage() {
  const { guestName } = useGuest();
  const { giftsDisplay, myGifts, loading, error, clearError, claimGift, unclaimGift } =
    useGifts(guestName);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(clearError, 4000);
    return () => clearTimeout(t);
  }, [error, clearError]);

  return (
    <div className="relative min-h-screen flex flex-col items-center px-5 pt-[140px] pb-20 animate-[bs-fadein_0.6s_ease-out]">
      <div className="absolute inset-0 pointer-events-none">
        <img src={starsBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <img
          src={bunting}
          alt=""
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[min(110vw,920px)]"
        />
        <img
          src={cloud}
          alt=""
          className="absolute top-[10%] left-[4%] w-[150px] opacity-60 animate-[bs-cloud-drift_11s_ease-in-out_infinite]"
        />
        <img
          src={cloud}
          alt=""
          className="absolute top-[20%] right-[5%] w-[120px] opacity-50 animate-[bs-cloud-drift_13s_ease-in-out_infinite] [animation-delay:3s]"
        />
      </div>

      <img src={cake} alt="" className="h-[110px] mt-[70px] mb-1.5 animate-[bs-wiggle_3.5s_ease-in-out_infinite]" />
      <div className="font-display italic text-[17px] text-plum-600 mb-1.5 animate-[bs-pop_0.7s_ease-out_0.1s_both]">
        ¡Hola, {guestName}!
      </div>
      <div className="mb-4">
        <SwitchGuestButton />
      </div>
      <h1 className="font-display font-bold text-[clamp(30px,6vw,44px)] m-0 mb-5 text-center text-plum-700 animate-[bs-pop_0.7s_ease-out_0.25s_both]">
        Lista de Regalos
      </h1>

      <TabNav className="mb-6" />

      <div className="w-full max-w-[520px] bg-lavender-100 rounded-3xl px-6 py-5 mb-6 text-center animate-[bs-pop_0.6s_ease-out_0.15s_both]">
        <p className="font-display italic text-[15px] text-ink-soft leading-relaxed m-0">
          Tu compañía es, sin duda, el regalo más valioso para nosotros. Pero si deseas
          apoyarnos con alguno de estos detalles, lo recibiremos con mucho cariño y
          agradecimiento.
        </p>
      </div>

      <p className="max-w-[520px] text-center text-ink-mute text-[15px] mb-7">
        Marca los regalos que quieras traer. Cuando un regalo llega a su cantidad esperada se marca
        como completado y ya no se puede apartar.
      </p>

      {myGifts.length > 0 && (
        <div className="w-full max-w-[900px] bg-lavender-100 rounded-[20px] px-6 py-5 mb-8 shadow-[0_4px_16px_oklch(30%_0.02_20/0.06)] animate-[bs-pop_0.5s_ease-out_both]">
          <div className="font-bold text-[15px] mb-2.5">Tus regalos apartados</div>
          <div className="flex flex-col gap-2">
            {myGifts.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-cream-50 rounded-xl px-3.5 py-2.5"
              >
                <div className="text-sm">
                  <strong>{item.name}</strong> · x{item.myQty}
                </div>
                <button
                  type="button"
                  onClick={() => unclaimGift(item.claimId)}
                  className="border-none bg-transparent text-rose-600 text-[13px] font-semibold cursor-pointer font-body hover:underline"
                >
                  Desmarcar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="w-full max-w-[900px] mb-6 rounded-xl bg-[oklch(93%_0.06_25)] text-rose-600 text-sm px-4 py-3 text-center">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-ink-mute text-sm">Cargando lista de regalos…</div>
      ) : (
        <div className="w-full max-w-[1080px] grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}>
          {giftsDisplay.map((gift, index) => (
            <GiftCard key={gift.id} gift={gift} index={index} onClaim={claimGift} />
          ))}
        </div>
      )}
    </div>
  );
}
