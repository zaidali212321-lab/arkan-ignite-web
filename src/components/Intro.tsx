import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "@/assets/logo.png";

const SEEN_KEY = "arkan_intro_seen_v1";

export const Intro = () => {
  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SEEN_KEY) !== "1";
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SEEN_KEY, "1");
        document.body.style.overflow = "";
        setMounted(false);
      },
    });

    tl.set(rootRef.current, { autoAlpha: 1 })
      .from(logoRef.current, {
        scale: 0.4,
        rotateY: 180,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        transformPerspective: 1000,
      })
      .from(
        lineRef.current,
        { scaleX: 0, transformOrigin: "center", duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .from(
        [word1Ref.current, word2Ref.current],
        { y: 40, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 },
        "-=0.3"
      )
      .to({}, { duration: 0.4 })
      .to(logoRef.current, { scale: 1.15, duration: 0.4, ease: "power2.in" })
      .to(panelTopRef.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<")
      .to(panelBottomRef.current, { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, "<")
      .to(rootRef.current, { autoAlpha: 0, duration: 0.2 }, "-=0.1");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ visibility: "hidden" }}
    >
      <div
        ref={panelTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-dark"
        style={{ background: "linear-gradient(180deg, hsl(0 0% 6%), hsl(0 0% 10%))" }}
      />
      <div
        ref={panelBottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-dark"
        style={{ background: "linear-gradient(0deg, hsl(0 0% 6%), hsl(0 0% 10%))" }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-6">
          <img
            ref={logoRef}
            src={logo}
            alt="Arkan Alitqan Arabiya"
            className="h-28 w-auto drop-shadow-[0_10px_40px_rgba(220,38,38,0.6)]"
            style={{ willChange: "transform" }}
          />
          <div ref={lineRef} className="h-[2px] w-40 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="flex items-baseline gap-3 text-dark-foreground font-display text-2xl md:text-3xl tracking-wide">
            <span ref={word1Ref}>أركان الإتقان</span>
            <span ref={word2Ref} className="text-primary-glow">العربية</span>
          </div>
        </div>
      </div>
    </div>
  );
};
