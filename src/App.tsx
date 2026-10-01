import { useCallback, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Team from "./components/Team";
import Services from "./components/Services";
import Projects from "./components/Projects";
import RenovationImpact from "./components/RenovationImpact";
import HotelInspiration from "./components/HotelInspiration";
import Expansion from "./components/Expansion";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WelcomeScreen, { shouldShowWelcome, WELCOME_SESSION_KEY } from "./components/WelcomeScreen";

export default function App() {
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(shouldShowWelcome);

  const enterWebsite = useCallback(() => {
    try {
      window.sessionStorage.setItem(WELCOME_SESSION_KEY, "true");
    } catch {
      // The entrance also works when browser storage is disabled.
    }
    if (window.location.hash === "#welcome") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#home`);
    }
    setShowWelcome(false);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("home-title")?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [showWelcome]);

  if (showWelcome) return <WelcomeScreen onEnter={enterWebsite} />;

  return (
    <div className="min-h-screen">
      <div
        className="fixed top-0 left-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-gold via-gold-light to-gold"
        style={{ transform: `scaleX(${progress})` }}
      />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Team />
        <Services />
        <Projects />
        <RenovationImpact />
        <HotelInspiration />
        <Process />
        <Expansion />
        <Contact />
      </main>
      <Footer onReplayWelcome={() => setShowWelcome(true)} />
      <a
        href="#home"
        aria-label="Back to top"
        className={`fixed right-5 bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-teal-brand text-gold-light shadow-xl transition-all duration-500 hover:-translate-y-1 hover:bg-gold hover:text-teal-deep ${
          progress > 0.08 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
        }`}
      >
        <ArrowUp size={20} />
      </a>
    </div>
  );
}
