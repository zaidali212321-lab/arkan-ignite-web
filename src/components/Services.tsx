import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Wrench, Cog, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import salesImg from "@/assets/service-sales.jpg";
import engineeringImg from "@/assets/service-engineering.jpg";
import maintenanceImg from "@/assets/service-maintenance.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Briefcase, t: "s1_t", d: "s1_d", tags: ["tag_supply", "tag_warranty", "tag_price"], img: salesImg },
  { icon: Cog, t: "s2_t", d: "s2_d", tags: ["tag_design", "tag_studies", "tag_supervision"], img: engineeringImg },
  { icon: Wrench, t: "s3_t", d: "s3_d", tags: ["tag_24_7", "tag_periodic", "tag_team"], img: maintenanceImg },
] as const;

export const Services = ({ compact = false }: { compact?: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, dir, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const next = cards[i + 1];
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} dir={dir} className="py-28 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-primary uppercase">{t("services_kicker")}</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">
              {t("services_title_1")} <span className="text-gradient">{t("services_title_2")}</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">{t("services_desc")}</p>
        </div>

        {/* Sticky stacked cards */}
        <div className="relative">
          {services.map((s, i) => (
            <div
              key={s.t}
              className="stack-card sticky mb-12"
              style={{
                top: `calc(6rem + ${i * 2.25}rem)`,
                zIndex: 10 + i,
              }}
            >
              <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-3xl bg-card border border-border shadow-elegant min-h-[420px]">
                {/* Image */}
                <div
                  className={`relative h-64 md:h-auto ${lang === "ar" ? "md:order-2" : ""}`}
                >
                  <img
                    src={s.img}
                    alt={t(s.t)}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="text-7xl font-display text-primary/10 leading-none mb-2">0{i + 1}</div>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center mb-5 shadow-elegant">
                    <s.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display text-3xl mb-3">{t(s.t)}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">{t(s.d)}</p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {s.tags.map((tg) => (
                      <span
                        key={tg}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {t(tg as any)}
                      </span>
                    ))}
                  </div>
                  <div>
                    <Button variant="hero" size="lg" asChild className="rounded-full px-7 group">
                      <Link to="/contact">
                        {t("s_request")}
                        <Arrow
                          className={`h-4 w-4 transition-transform ${
                            lang === "ar" ? "mr-1 group-hover:-translate-x-1" : "ml-1 group-hover:translate-x-1"
                          }`}
                        />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {compact && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">{t("view_all")}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
