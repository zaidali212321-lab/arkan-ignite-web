import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

import p01 from "@/assets/projects/p01.jpg";
import p02 from "@/assets/projects/p02.jpg";
import p03 from "@/assets/projects/p03.jpg";
import p04 from "@/assets/projects/p04.jpg";
import p05 from "@/assets/projects/p05.jpg";
import p06 from "@/assets/projects/p06.jpg";
import p07 from "@/assets/projects/p07.jpg";
import p08 from "@/assets/projects/p08.jpg";
import p09 from "@/assets/projects/p09.jpg";
import p10 from "@/assets/projects/p10.jpg";

gsap.registerPlugin(ScrollTrigger);

type Project = { img: string; t: TranslationKey };

const projects: Project[] = [
  { img: p01, t: "ref_p01" },
  { img: p02, t: "ref_p02" },
  { img: p03, t: "ref_p03" },
  { img: p04, t: "ref_p04" },
  { img: p05, t: "ref_p05" },
  { img: p06, t: "ref_p06" },
  { img: p07, t: "ref_p07" },
  { img: p08, t: "ref_p08" },
  { img: p09, t: "ref_p09" },
  { img: p10, t: "ref_p10" },
];

export const ReferenceProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, dir } = useLang();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".ref-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const next = cards[i + 1];
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 85%",
            end: "top 25%",
            scrub: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reference-projects"
      ref={sectionRef}
      dir={dir}
      className="py-28 bg-secondary/40"
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.3em] text-primary uppercase">
            {t("ref_kicker")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            {t("ref_title_1")} <span className="text-gradient">{t("ref_title_2")}</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">{t("ref_desc")}</p>
          <div className="mt-6 mx-auto h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {projects.map((p, i) => (
            <div
              key={p.t}
              className="ref-card sticky mb-10"
              style={{
                top: `calc(6rem + ${i * 1.75}rem)`,
                zIndex: 10 + i,
              }}
            >
              <article className="overflow-hidden rounded-3xl bg-white border border-border shadow-elegant">
                <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-secondary">
                  <img
                    src={p.img}
                    alt={t(p.t)}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-[11px] font-bold tracking-wider text-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="px-6 py-5 md:py-6 flex items-center justify-center">
                  <h3 className="font-display text-xl md:text-2xl uppercase tracking-wider text-primary text-center">
                    {t(p.t)}
                  </h3>
                </div>
              </article>
            </div>
          ))}

          {/* Closing card */}
          <div
            className="ref-card sticky mb-10"
            style={{
              top: `calc(6rem + ${projects.length * 1.75}rem)`,
              zIndex: 10 + projects.length,
            }}
          >
            <article className="overflow-hidden rounded-3xl bg-gradient-primary text-white shadow-elegant p-10 md:p-16 text-center">
              <Sparkles className="h-10 w-10 mx-auto mb-5 opacity-90" />
              <h3 className="font-display text-3xl md:text-4xl mb-3">
                +25 {t("ref_more_title")}
              </h3>
              <p className="max-w-xl mx-auto text-white/90 text-lg leading-relaxed">
                {t("ref_more_desc")}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
