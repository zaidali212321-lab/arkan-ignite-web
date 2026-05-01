import { useEffect, useRef, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThreeErrorBoundary } from "@/components/three/ThreeErrorBoundary";
import { useLang } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";
import extinguisher from "@/assets/extinguisher.png";

const Hero3DScene = lazy(() =>
  import("@/components/three/Hero3DScene").then((m) => ({ default: m.Hero3DScene }))
);

gsap.registerPlugin(ScrollTrigger);

const chapters: { kicker: string; title: TranslationKey; desc: TranslationKey; specs: TranslationKey[] }[] = [
  { kicker: "01 / 03", title: "sc_p1_t", desc: "sc_p1_d", specs: ["sc_p1_s1", "sc_p1_s2", "sc_p1_s3"] },
  { kicker: "02 / 03", title: "sc_p2_t", desc: "sc_p2_d", specs: ["sc_p2_s1", "sc_p2_s2", "sc_p2_s3"] },
  { kicker: "03 / 03", title: "sc_p3_t", desc: "sc_p3_d", specs: ["sc_p3_s1", "sc_p3_s2", "sc_p3_s3"] },
];

export const Cinematic3DSection = () => {
  const { t, dir } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-chapter]");
      panels.forEach((panel) => {
        const lines = panel.querySelectorAll<HTMLElement>("[data-line]");
        gsap.from(lines, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: panel,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative bg-dark text-dark-foreground"
      style={{ height: `${chapters.length * 100}vh` }}
    >
      {/* Sticky 3D canvas — stays in the background while specs scroll. */}
      <div className="sticky top-0 h-screen w-full">
        <div ref={canvasHostRef} className="absolute inset-0">
          <ThreeErrorBoundary
            fallback={
              <div className="absolute inset-0 grid place-items-center">
                <img
                  src={extinguisher}
                  alt=""
                  className="h-2/3 w-auto object-contain drop-shadow-[0_30px_60px_rgba(220,38,38,0.5)]"
                />
              </div>
            }
          >
            <Suspense fallback={null}>
              <Hero3DScene targetRef={sectionRef} />
            </Suspense>
          </ThreeErrorBoundary>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/80 pointer-events-none" />
      </div>

      {/* Foreground chapters — each takes 100vh, fades in/out via stagger reveal */}
      <div className="absolute inset-0">
        {chapters.map((c, i) => (
          <div
            key={i}
            data-chapter
            className="h-screen w-full flex items-center"
            style={{ position: "absolute", top: `${i * 100}vh`, left: 0, right: 0 }}
          >
            <div className="container">
              <div className="max-w-md ms-auto bg-dark/40 backdrop-blur-xl border border-dark-border rounded-3xl p-8 shadow-elegant">
                <span data-line className="block text-xs font-bold tracking-[0.3em] text-primary-glow uppercase">
                  {c.kicker}
                </span>
                <h3 data-line className="font-display text-3xl md:text-4xl mt-3">
                  <span className="text-gradient">{t(c.title)}</span>
                </h3>
                <p data-line className="mt-4 text-dark-foreground/75 leading-relaxed">
                  {t(c.desc)}
                </p>
                <ul className="mt-6 space-y-3">
                  {c.specs.map((s) => (
                    <li
                      key={s}
                      data-line
                      className="flex items-center gap-3 text-sm text-dark-foreground/85"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-glow shrink-0" />
                      {t(s)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
