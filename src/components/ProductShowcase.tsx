import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

import extinguisher from "@/assets/products/extinguisher.png";
import pumpSkid from "@/assets/products/pump-skid.png";
import scba from "@/assets/products/scba-mask.png";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  img: string;
  name: TranslationKey;
  bg: TranslationKey;
  title: TranslationKey;
  desc: TranslationKey;
  specs: [TranslationKey, TranslationKey, TranslationKey];
};

const slides: Slide[] = [
  { img: extinguisher, name: "sc_p1_name", bg: "sc_p1_bg", title: "sc_p1_t", desc: "sc_p1_d", specs: ["sc_p1_s1", "sc_p1_s2", "sc_p1_s3"] },
  { img: pumpSkid,    name: "sc_p2_name", bg: "sc_p2_bg", title: "sc_p2_t", desc: "sc_p2_d", specs: ["sc_p2_s1", "sc_p2_s2", "sc_p2_s3"] },
  { img: scba,        name: "sc_p3_name", bg: "sc_p3_bg", title: "sc_p3_t", desc: "sc_p3_d", specs: ["sc_p3_s1", "sc_p3_s2", "sc_p3_s3"] },
];

export const ProductShowcase = () => {
  const { t, dir } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const root = sectionRef.current;

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLElement>("[data-sc-img]");
      const panels = gsap.utils.toArray<HTMLElement>("[data-sc-panel]");
      const bgWords = gsap.utils.toArray<HTMLElement>("[data-sc-bg]");

      // Initial state
      gsap.set(images, { autoAlpha: 0, scale: 0.8 });
      gsap.set(images[0], { autoAlpha: 1, scale: 1 });
      gsap.set(panels, { autoAlpha: 0, y: 40 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(bgWords, { autoAlpha: 0 });
      gsap.set(bgWords[0], { autoAlpha: 0.08 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${(slides.length - 1) * window.innerHeight * 1.1}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < slides.length - 1; i++) {
        const label = `s${i}`;
        tl.addLabel(label);

        // Cross-fade product image
        tl.to(images[i],     { autoAlpha: 0, scale: 0.85, duration: 1, ease: "power2.inOut" }, label)
          .to(images[i + 1], { autoAlpha: 1, scale: 1,    duration: 1, ease: "power2.inOut" }, label)

          // Background word parallax + swap
          .to(bgWords[i],     { autoAlpha: 0, xPercent: -15, duration: 1, ease: "power2.out" }, label)
          .to(bgWords[i + 1], { autoAlpha: 0.08, xPercent: 0, duration: 1, ease: "power2.out" }, label)

          // Spec panels: outgoing slides up & fades, incoming staggers in
          .to(panels[i],     { autoAlpha: 0, y: -40, duration: 0.6, ease: "power2.in" }, label)
          .to(panels[i + 1], { autoAlpha: 1, y: 0,   duration: 0.8, ease: "power2.out" }, `${label}+=0.2`);
      }

      // Continuous parallax on the active background word (slow drift)
      bgWords.forEach((w) => {
        gsap.to(w, {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative bg-dark text-dark-foreground overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Ambient glow */}
      <div className="absolute -left-40 top-1/3 h-[600px] w-[600px] bg-gradient-radial-red blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="absolute inset-x-0 top-24 z-20 text-center px-6">
        <span className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase">
          {t("showcase_kicker")}
        </span>
        <h2 className="font-display text-3xl md:text-5xl mt-3">
          {t("showcase_title_1")} <span className="text-gradient">{t("showcase_title_2")}</span>
        </h2>
      </div>

      {/* Background parallax words */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none overflow-hidden">
        {slides.map((s, i) => (
          <span
            key={i}
            data-sc-bg
            className="absolute font-display font-black uppercase tracking-tighter text-white whitespace-nowrap select-none"
            style={{
              fontSize: "clamp(8rem, 22vw, 22rem)",
              lineHeight: 1,
              willChange: "transform, opacity",
            }}
          >
            {t(s.bg)}
          </span>
        ))}
      </div>

      {/* Sticky stage: image centered, content side-by-side on desktop, stacked on mobile */}
      <div className="relative z-10 h-full container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-32 pb-12">
        {/* Product image stack */}
        <div className="relative h-[45vh] lg:h-[70vh] order-1 lg:order-none">
          {slides.map((s, i) => (
            <img
              key={i}
              data-sc-img
              src={s.img}
              alt={t(s.name)}
              className="absolute inset-0 m-auto h-full w-full object-contain drop-shadow-[0_20px_60px_rgba(220,38,38,0.4)]"
              style={{ willChange: "transform, opacity" }}
            />
          ))}
        </div>

        {/* Spec panels stack */}
        <div className="relative min-h-[40vh] lg:min-h-[60vh] order-2 lg:order-none">
          {slides.map((s, i) => (
            <div
              key={i}
              data-sc-panel
              className="absolute inset-0 flex flex-col justify-center"
              style={{ willChange: "transform, opacity" }}
            >
              <span className="text-xs font-bold tracking-[0.3em] text-primary-glow uppercase">
                0{i + 1} / 0{slides.length}
              </span>
              <h3 className="font-display text-3xl md:text-4xl mt-3">
                <span className="text-gradient">{t(s.name)}</span>
              </h3>
              <p className="text-xl md:text-2xl mt-3 text-dark-foreground/90 font-display">
                {t(s.title)}
              </p>
              <p className="mt-4 text-dark-foreground/70 leading-relaxed max-w-md">
                {t(s.desc)}
              </p>
              <ul className="mt-6 space-y-2 max-w-md">
                {s.specs.map((sp, j) => (
                  <li
                    key={sp}
                    className="flex items-center gap-3 text-sm text-dark-foreground/85"
                    style={{ transitionDelay: `${j * 200}ms` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-glow shrink-0" />
                    {t(sp)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 inset-x-0 z-20 flex justify-center gap-2">
        {slides.map((_, i) => (
          <span key={i} className="h-1 w-10 rounded-full bg-white/20 overflow-hidden">
            <span data-sc-progress={i} className="block h-full w-0 bg-primary-glow" />
          </span>
        ))}
      </div>
    </section>
  );
};
