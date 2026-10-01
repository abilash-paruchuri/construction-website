import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "./Logo";
import { Mandala, Ornament } from "./ui";
import PropertyPhoto from "./PropertyPhoto";

export const WELCOME_SESSION_KEY = "wishnu:welcome-seen:v1";

export function shouldShowWelcome() {
  if (typeof window === "undefined") return false;
  if (window.location.hash === "#welcome") return true;
  if (window.location.hash && window.location.hash !== "#home") return false;
  try {
    return window.sessionStorage.getItem(WELCOME_SESSION_KEY) !== "true";
  } catch {
    return true;
  }
}

export default function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [entering, setEntering] = useState(false);
  const crestRef = useRef<HTMLDivElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);
  const leavingRef = useRef(false);

  const enter = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setEntering(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timerRef.current = window.setTimeout(onEnter, reduced ? 0 : 700);
  }, [onEnter]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    enterButtonRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [enter]);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    if (crestRef.current) {
      crestRef.current.style.setProperty("--crest-x", `${-y * 4}deg`);
      crestRef.current.style.setProperty("--crest-y", `${x * 6}deg`);
    }
  };
  const reset = () => {
    crestRef.current?.style.setProperty("--crest-x", "0deg");
    crestRef.current?.style.setProperty("--crest-y", "0deg");
  };

  return (
    <main className="welcome-screen fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto bg-cream" data-entering={entering} onPointerMove={move} onPointerLeave={reset} aria-labelledby="welcome-title">
      <div className="welcome-atmosphere pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <PropertyPhoto propertyId="bliss-marion" className="welcome-hotel absolute inset-0" imageClassName="h-full w-full" loading="eager" />
        <div className="absolute inset-0 bg-teal-deep/75" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,48,59,.2),rgba(6,48,59,.3)_45%,rgba(6,48,59,.85))]" />
        <div className="absolute inset-5 border border-gold-light/25 sm:inset-8" />
        <span className="absolute top-5 left-5 h-10 w-10 border-t-2 border-l-2 border-gold-light/70 sm:top-8 sm:left-8" />
        <span className="absolute right-5 bottom-5 h-10 w-10 border-r-2 border-b-2 border-gold-light/70 sm:right-8 sm:bottom-8" />
        <Mandala stroke="#ecd079" className="welcome-mandala animate-spin-slow absolute top-1/2 left-1/2 h-[min(85vw,620px)] w-[min(85vw,620px)] opacity-[0.18]" />
      </div>
      <div className="welcome-curtain welcome-curtain-left" aria-hidden="true" />
      <div className="welcome-curtain welcome-curtain-right" aria-hidden="true" />
      <button type="button" onClick={enter} disabled={entering} className="welcome-skip absolute top-9 right-9 z-10 flex items-center gap-2 py-2 text-[10px] font-medium tracking-[0.15em] text-cream/75 uppercase transition-colors hover:text-gold-light sm:top-12 sm:right-12">Skip Welcome <ArrowRight size={13} /></button>

      <div className="welcome-stage relative flex min-h-[100svh] items-center justify-center px-7 py-24 text-center">
        <div className="welcome-content relative z-[2] w-full max-w-2xl">
          <p className="welcome-reveal font-serif-i text-2xl text-gold-light italic" style={{ animationDelay: "200ms" }}>Welcome to</p>
          <div ref={crestRef} className="welcome-crest mx-auto mt-2 w-fit" aria-hidden="true">
            <LogoMark className="welcome-reveal h-[clamp(100px,20vh,175px)] w-[clamp(100px,20vh,175px)] drop-shadow-[0_10px_24px_rgba(0,0,0,.2)]" />
          </div>
          <h1 id="welcome-title" className="welcome-reveal welcome-title font-display mt-2 text-[clamp(4.5rem,12vw,7.5rem)] leading-none font-black tracking-tight text-cream" style={{ animationDelay: "350ms" }}>Wish<span className="text-gold-light">N</span>u</h1>
          <p className="welcome-reveal font-display mt-4 text-[9px] font-semibold tracking-[0.28em] text-cream/90 uppercase sm:text-xs" style={{ animationDelay: "450ms" }}>Construction &amp; Development</p>
          <div className="welcome-reveal" style={{ animationDelay: "550ms" }}><Ornament light className="mx-auto mt-5" /></div>
          <p className="welcome-reveal font-serif-i mt-4 text-2xl leading-snug text-cream/90 italic sm:text-3xl" style={{ animationDelay: "650ms" }}>Where heritage meets hospitality.</p>
          <button ref={enterButtonRef} type="button" onClick={enter} disabled={entering} className="welcome-reveal welcome-enter btn-gold font-display mt-8 inline-flex items-center gap-7 rounded-full px-8 py-4 text-xs font-bold tracking-[0.15em] uppercase" style={{ animationDelay: "750ms" }}>Enter WishNu <ArrowRight size={17} /></button>
        </div>
      </div>
    </main>
  );
}