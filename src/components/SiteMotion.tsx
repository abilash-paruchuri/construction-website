import { useEffect } from "react";

/** Section choreography keeps native scrolling and anchor navigation intact. */
export default function SiteMotion() {
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main > section")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("chapter-visible");
      });
    }, { threshold: 0.08 });
    sections.forEach((section, index) => {
      section.dataset.chapter = String(index + 1).padStart(2, "0");
      observer.observe(section);
    });
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      document.documentElement.style.setProperty("--hero-offset", preference.matches ? "0px" : `${Math.min(window.scrollY, window.innerHeight) * 0.18}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    preference.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      preference.removeEventListener("change", update);
      document.documentElement.style.removeProperty("--hero-offset");
    };
  }, []);
  return null;
}
