import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/i18n/LanguageContext";
import imgHelmet from "@/assets/about-helmet.jpg";
import imgPipes from "@/assets/about-pipes.jpg";
import imgRefinery from "@/assets/about-refinery.jpg";

gsap.registerPlugin(ScrollTrigger);

const counters = [
  { end: 15, suffix: "+", labelKey: "about_c1" as const },
  { end: 40, suffix: "+", labelKey: "about_c2" as const },
  { end: 100, suffix: "%", labelKey: "about_c3" as const },
];

export const About = ({ compact = false }: { compact?: boolean }) => {
  const { t, dir } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const points = ["about_point1", "about_point2", "about_point3", "about_point4"] as const;

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".counter-num").forEach((el) => {
        const target = Number(el.dataset.target || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} dir={dir} className="relative py-28 bg-background overflow-hidden">
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        {/* 3-image grid */}
        <div className="relative grid grid-cols-12 grid-rows-6 gap-3 h-[560px]">
          <div className="col-span-7 row-span-4 rounded-2xl overflow-hidden shadow-card">
            <img src={imgHelmet} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-5 row-span-3 rounded-2xl overflow-hidden shadow-card">
            <img src={imgRefinery} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-5 row-span-3 rounded-2xl overflow-hidden shadow-card">
            <img src={imgPipes} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-7 row-span-2 rounded-2xl bg-gradient-warm text-white p-6 flex items-center justify-between shadow-elegant">
            <div>
              <div className="font-display text-4xl">+15</div>
              <div className="text-xs opacity-90 mt-1">{t("about_stat_label")}</div>
            </div>
            <div className="text-end">
              <div className="text-xs opacity-90">{t("about_certified")}</div>
              <div className="font-display">ISO 9001</div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-7">
          <span className="inline-block text-xs font-bold tracking-[0.3em] text-[hsl(var(--primary-glow))] uppercase">{t("about_kicker")}</span>
          <h2 className="font-latin font-extrabold text-4xl md:text-5xl leading-tight tracking-tight">
            {t("about_title_1")}{" "}
            <span className="text-[hsl(var(--primary-glow))]">{t("about_title_2")}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{t("about_desc")}</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--primary-glow))] flex-shrink-0" />
                {t(p)}
              </li>
            ))}
          </ul>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/services">{t("about_cta")}</Link>
            </Button>
            {compact && (
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">{t("learn_more")}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Animated counters row */}
      <div className="container mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {counters.map((c) => (
          <div
            key={c.labelKey}
            className="rounded-2xl border border-border bg-card p-8 text-center shadow-card hover:shadow-elegant transition-shadow"
          >
            <div className="font-latin font-extrabold text-5xl md:text-6xl bg-gradient-warm bg-clip-text text-transparent">
              <span className="counter-num" data-target={c.end}>0</span>
              <span>{c.suffix}</span>
            </div>
            <div className="mt-3 text-sm font-semibold text-muted-foreground tracking-wide uppercase">
              {t(c.labelKey)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
