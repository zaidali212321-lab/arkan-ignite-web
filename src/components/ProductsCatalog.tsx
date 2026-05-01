import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

import extinguisher from "@/assets/products/extinguisher.png";
import pumpSkid from "@/assets/products/pump-skid.png";
import pumpController from "@/assets/products/pump-controller.png";
import sprinkler from "@/assets/products/sprinkler.png";
import nozzle from "@/assets/products/nozzle.png";
import siamese from "@/assets/products/siamese.png";
import scba from "@/assets/products/scba-mask.png";
import turnstile from "@/assets/products/turnstile.png";
import fingerprint from "@/assets/products/fingerprint.png";

gsap.registerPlugin(ScrollTrigger);

type Item = { img: string; t: TranslationKey; d: TranslationKey };
type Category = { id: string; t: TranslationKey; d: TranslationKey; items: Item[] };

const categories: Category[] = [
  {
    id: "water",
    t: "cat_water_t",
    d: "cat_water_d",
    items: [
      { img: pumpSkid, t: "it_pumpskid_t", d: "it_pumpskid_d" },
      { img: pumpController, t: "it_pumpctrl_t", d: "it_pumpctrl_d" },
      { img: sprinkler, t: "it_sprinkler_t", d: "it_sprinkler_d" },
      { img: nozzle, t: "it_nozzle_t", d: "it_nozzle_d" },
      { img: siamese, t: "it_siamese_t", d: "it_siamese_d" },
    ],
  },
  {
    id: "detect",
    t: "cat_detect_t",
    d: "cat_detect_d",
    items: [
      { img: extinguisher, t: "it_extinguisher_t", d: "it_extinguisher_d" },
    ],
  },
  {
    id: "security",
    t: "cat_security_t",
    d: "cat_security_d",
    items: [
      { img: turnstile, t: "it_turnstile_t", d: "it_turnstile_d" },
      { img: fingerprint, t: "it_fingerprint_t", d: "it_fingerprint_d" },
    ],
  },
  {
    id: "ppe",
    t: "cat_ppe_t",
    d: "cat_ppe_d",
    items: [
      { img: scba, t: "it_scba_t", d: "it_scba_d" },
    ],
  },
];

export const ProductsCatalog = () => {
  const { t, dir } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      // Category headers
      gsap.utils.toArray<HTMLElement>("[data-cat-head]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Individual product cards — staggered reveal per category
      gsap.utils.toArray<HTMLElement>("[data-cat-grid]").forEach((grid) => {
        const cards = grid.querySelectorAll<HTMLElement>("[data-prod-card]");
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          scale: 0.92,
          rotateX: 12,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: grid, start: "top 80%" },
        });

        // Subtle parallax on the product image as it scrolls through viewport
        cards.forEach((card) => {
          const img = card.querySelector<HTMLElement>("[data-prod-img]");
          if (!img) return;
          gsap.to(img, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} dir={dir}>
      {categories.map((cat, ci) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`py-24 ${ci % 2 === 0 ? "bg-background" : "bg-secondary/40"}`}
        >
          <div className="container">
            <div data-cat-head className="max-w-2xl mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.3em] text-primary uppercase">
                0{ci + 1} · {t("products_kicker")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl mt-4">
                <span className="text-gradient">{t(cat.t)}</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">{t(cat.d)}</p>
              <div className="mt-6 h-[2px] w-24 bg-gradient-to-r from-primary to-transparent" />
            </div>

            <div
              data-cat-grid
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {cat.items.map((p) => (
                <article
                  key={p.t}
                  data-prod-card
                  className="group relative rounded-3xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
                  style={{ perspective: "1200px" }}
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/60">
                    <div className="absolute inset-0 bg-gradient-radial-red opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                    <img
                      data-prod-img
                      src={p.img}
                      alt={t(p.t)}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                      style={{ willChange: "transform" }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl mb-2">{t(p.t)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {t(p.d)}
                    </p>
                    <div className="h-px bg-border my-4" />
                    <Button asChild variant="ghost" size="sm" className="px-0 hover:bg-transparent">
                      <Link to="/contact" className="text-primary font-bold tracking-wider text-xs">
                        {t("p_inquire")} →
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
