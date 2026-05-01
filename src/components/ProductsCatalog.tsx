import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";
import { ProductDetailModal, type ProductDetail } from "@/components/ProductDetailModal";

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

type Item = {
  img: string;
  t: TranslationKey;
  d: TranslationKey;
  gallery?: string[];
  specs?: { standard?: string; certification?: string };
};
type Category = { id: string; t: TranslationKey; d: TranslationKey; items: Item[] };

const categories: Category[] = [
  {
    id: "water",
    t: "cat_water_t",
    d: "cat_water_d",
    items: [
      { img: pumpSkid, t: "it_pumpskid_t", d: "it_pumpskid_d", gallery: [pumpSkid, pumpController, sprinkler], specs: { standard: "NFPA 20", certification: "UL / FM" } },
      { img: pumpController, t: "it_pumpctrl_t", d: "it_pumpctrl_d", gallery: [pumpController, pumpSkid], specs: { standard: "NFPA 20", certification: "UL Listed" } },
      { img: sprinkler, t: "it_sprinkler_t", d: "it_sprinkler_d", gallery: [sprinkler, pumpSkid], specs: { standard: "NFPA 13", certification: "UL / FM" } },
      { img: nozzle, t: "it_nozzle_t", d: "it_nozzle_d", gallery: [nozzle, siamese], specs: { standard: "NFPA 1964", certification: "UL Listed" } },
      { img: siamese, t: "it_siamese_t", d: "it_siamese_d", gallery: [siamese, nozzle], specs: { standard: "NFPA 14", certification: "UL / FM" } },
    ],
  },
  {
    id: "detect",
    t: "cat_detect_t",
    d: "cat_detect_d",
    items: [
      { img: extinguisher, t: "it_extinguisher_t", d: "it_extinguisher_d", gallery: [extinguisher], specs: { standard: "EN 3-7", certification: "CE / SASO" } },
    ],
  },
  {
    id: "security",
    t: "cat_security_t",
    d: "cat_security_d",
    items: [
      { img: turnstile, t: "it_turnstile_t", d: "it_turnstile_d", gallery: [turnstile, fingerprint], specs: { standard: "IP54", certification: "CE" } },
      { img: fingerprint, t: "it_fingerprint_t", d: "it_fingerprint_d", gallery: [fingerprint, turnstile], specs: { standard: "ISO/IEC 19794", certification: "CE / FCC" } },
    ],
  },
  {
    id: "ppe",
    t: "cat_ppe_t",
    d: "cat_ppe_d",
    items: [
      { img: scba, t: "it_scba_t", d: "it_scba_d", gallery: [scba], specs: { standard: "EN 137", certification: "CE" } },
    ],
  },
];

export const ProductsCatalog = () => {
  const { t, dir } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ProductDetail | null>(null);
  const [open, setOpen] = useState(false);

  const openItem = (item: Item) => {
    setActive({
      t: item.t,
      d: item.d,
      images: item.gallery && item.gallery.length ? item.gallery : [item.img],
      specs: item.specs,
    });
    setOpen(true);
  };

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
                  onClick={() => openItem(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openItem(p);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="group relative cursor-pointer rounded-3xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
                    <span className="text-primary font-bold tracking-wider text-xs">
                      {t("learn_more")} →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
      <ProductDetailModal product={active} open={open} onOpenChange={setOpen} />
    </div>
  );
};
