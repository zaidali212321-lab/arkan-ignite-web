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
  const { t, dir } = useLang();
  const loop = [...projects, ...projects];

  return (
    <section id="reference-projects" dir={dir} className="py-24 bg-secondary/40 overflow-hidden">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.3em] text-primary uppercase">
            {t("ref_kicker")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            {t("ref_title_1")} <span className="text-gradient">{t("ref_title_2")}</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">{t("ref_desc")}</p>
          <div className="mt-6 mx-auto h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-secondary/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-secondary/80 to-transparent z-10 pointer-events-none" />

        <div
          className="flex w-max gap-6 md:gap-8 marquee-slow group-hover:[animation-play-state:paused]"
          dir="ltr"
        >
          {loop.map((p, i) => (
            <figure
              key={i}
              className="group/card relative shrink-0 w-[280px] md:w-[360px] h-[200px] md:h-[260px] rounded-2xl overflow-hidden bg-white border border-border shadow-card hover:shadow-elegant transition-all hover:[animation-play-state:paused]"
            >
              <img
                src={p.img}
                alt={t(p.t)}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                <figcaption className="font-display text-white text-sm md:text-base uppercase tracking-wider text-center">
                  {t(p.t)}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
